import { Injectable } from '@nestjs/common';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { PaginationInput } from 'src/pagination/models/pagination-input.model';
import { IEdgeType, PageInfo } from './models/pagination.model';

@Injectable()
export class PaginationService {
  /**
   * Paginate a repository and return the results and page metadata, pagination take id as the query index
   * @param repository The entity repository
   * @param page The page input
   * @returns A paginated result
   */
  async paginate<T>(
    repository: Repository<any>,
    page: PaginationInput,
  ): Promise<{ edges: IEdgeType<T>[]; pageInfo: PageInfo }> {
    if (!page.first && !page.last) return;

    const { edges, hasNextPage, hasPreviousPage, forward } =
      await this.queryEdges<T>(repository, page);

    return {
      edges: edges as IEdgeType<T>[],
      pageInfo: {
        ...this.getPageCursors(edges, forward),
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  /**
   * Query the edges of the page and check if the result has previous and next pages
   * @param repository The entity repository
   * @param page The page input
   * @returns Return the edges and the verification of previous/next pages
   */
  private async queryEdges<T>(
    repository: Repository<any>,
    page: PaginationInput,
  ) {
    const forward = !!page.first;
    const startIndex = this.decodeCursor(forward ? page.after : page.before);
    const limit = page.first || page.last || 10;
    const order = forward ? 'DESC' : 'ASC';
    const operator = forward ? LessThanOrEqual : MoreThanOrEqual;

    const edges = (await repository.find({
      where: { id: operator(startIndex) },
      take: limit + 2,
      order: { id: order },
    })) as T[];

    if (!edges.length)
      return { edges, hasPreviousPage: false, hasNextPage: false };

    const hasPreviousPage = (edges[0] as any).id === startIndex;
    const hasNextPage =
      edges.length >= (hasPreviousPage ? limit + 2 : limit + 1);

    return {
      forward,
      hasPreviousPage: forward ? hasPreviousPage : hasNextPage,
      hasNextPage: forward ? hasNextPage : hasPreviousPage,
      edges: edges
        .slice(hasPreviousPage ? 1 : 0, limit + (hasPreviousPage ? 1 : 0))
        .map((edge: any) => ({
          node: edge as T,
          cursor: this.encodeCursor(edge.id),
        })),
    };
  }

  /**
   * Decode a cursor string
   * @param cursor The cursor encoded
   * @returns The cursor decoded
   */
  private decodeCursor(cursor: string) {
    return parseInt(Buffer.from(cursor, 'base64').toString('ascii'));
  }

  /**
   * Encode a id into a cursor string
   * @param id The object id
   * @returns The cursor encoded
   */
  private encodeCursor(id: number) {
    return Buffer.from(id.toString(), 'ascii').toString('base64');
  }

  /**
   * Get the start/end cursors
   * @param results The edge results
   * @param forward page directorion is forward
   * @returns The start/end cursors
   */
  private getPageCursors(edges: any[], forward?: boolean) {
    if (!edges.length) return { startCursor: null, endCursor: null };
    const startCursor = edges[0].cursor;
    const endCursor = edges[edges.length - 1].cursor;
    return {
      startCursor: forward ? startCursor : endCursor,
      endCursor: forward ? endCursor : startCursor,
    };
  }
}
