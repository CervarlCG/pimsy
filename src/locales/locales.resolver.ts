import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Locale, PaginatedLocales } from './models/locale.model';
import { LocalesService } from './locales.service';
import { CreateLocaleInput } from './models/locale-input.model';
import { JoiValidationPipe } from 'src/pipes/joi-validation';
import { createLocaleSchema } from './schemas/locale.schema';
import { FindByInput, ObjectIdType } from 'src/common/models/input';
import { findBySchema } from 'src/common/schemas/find';
import { PaginationInput } from 'src/pagination/models/pagination-input.model';

@Resolver((of) => Locale)
export class LocalesResolver {
  constructor(private localesService: LocalesService) {}

  @Query((returns) => Locale, { nullable: true })
  async locale(
    @Args('by', new JoiValidationPipe(findBySchema)) findBy: FindByInput,
  ): Promise<Locale> {
    if (findBy.idType === ObjectIdType.ID)
      return this.localesService.getById(parseInt(findBy.id));
    else if (findBy.idType === ObjectIdType.Handle)
      return this.localesService.getByHandle(findBy.id);
    return null;
  }

  @Query((returns) => PaginatedLocales)
  async locales(@Args('page') page: PaginationInput) {
    return this.localesService.list(page);
  }

  @Mutation((returns) => Locale)
  async createLocale(
    @Args('localeData', new JoiValidationPipe(createLocaleSchema))
    localeData: CreateLocaleInput,
  ): Promise<Locale> {
    return await this.localesService.create(localeData);
  }
}
