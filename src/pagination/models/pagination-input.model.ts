import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  first: number;

  @Field({ nullable: true })
  last: number;

  @Field({ nullable: true })
  before: string;

  @Field({ nullable: true })
  after: string;
}
