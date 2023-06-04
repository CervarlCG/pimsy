import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value_: any, metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(value_);

    if (error) throw new BadRequestException(error.message || 'Invalid input');

    return value;
  }
}
