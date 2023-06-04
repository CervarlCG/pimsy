import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  pageInfo: PageInfo;
}

@ObjectType({ description: 'product' })
export class PageInfo {
  @Field({ nullable: true })
  startCursor: string;

  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: false })
  hasNextPage: boolean;

  @Field({ nullable: false })
  hasPreviousPage: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field((type) => String)
    cursor: string;

    @Field((type) => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((type) => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field((type) => PageInfo)
    pageInfo: PageInfo;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
