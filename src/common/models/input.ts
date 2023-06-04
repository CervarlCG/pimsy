import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum ObjectIdType {
  ID,
  Handle,
}
registerEnumType(ObjectIdType, { name: 'ObjectIdType' });

@InputType()
export class FindByInput {
  @Field({ description: 'ID or handle of the object to find' })
  id: string;

  @Field((type) => ObjectIdType, { description: 'ID type to use' })
  idType: ObjectIdType;
}
