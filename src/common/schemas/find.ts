import * as Joi from 'joi';
import { handlePattern, idPattern } from '../constants/regex';
import { FindByInput, ObjectIdType } from '../models/input';

const handleMessage =
  "Handle only can contain characters a-z A-Z 0-9 ; , : @ & = + $ - _ . ! ~ * ' ( ) [ ]";

export const idSchema = Joi.number().greater(0);
export const handleSchema = Joi.string()
  .pattern(handlePattern)
  .message(handleMessage);
export const findBySchema = Joi.object().custom(
  (value: FindByInput, helpers: Joi.CustomHelpers) => {
    if (value.idType === ObjectIdType.ID) {
      const id = parseInt(value.id);
      if (idPattern.test(value.id) && id > 0) return { ...value, id };
      return helpers.error('Id must be a number');
    } else if (value.idType === ObjectIdType.Handle) {
      if (handlePattern.test(value.id)) return value;
      return helpers.error(handleMessage);
    }
    return helpers.error('ID type not allowed');
  },
);
