import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateLocaleInput {
  @Field()
  name: string;

  @Field()
  handle: string;
}

@InputType()
export class UpdateLocaleInput extends PartialType(CreateLocaleInput) {}
