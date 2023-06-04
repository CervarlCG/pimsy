import { ID, Field, ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/pagination/models/pagination.model';

@ObjectType({ description: 'Language locale' })
export class Locale {
  @Field((type) => ID)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  handle: string;
}

@ObjectType()
export class PaginatedLocales extends Paginated(Locale) {}
