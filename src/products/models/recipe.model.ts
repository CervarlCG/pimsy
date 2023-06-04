import { ID, Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'product' })
export class Product {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  description: string;
}
