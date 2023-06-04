import * as Joi from 'joi';
import { localePattern } from 'src/common/constants/regex';

export const createLocaleSchema = Joi.object({
  name: Joi.string().max(50).required(),
  handle: Joi.string()
    .pattern(localePattern)
    .message(
      'Handle must start with language code (2 characters) and optionally be followed by underscore and the country code (2 characters)',
    ),
});
