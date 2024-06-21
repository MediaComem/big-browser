import * as t from 'io-ts';
import { DateTime } from 'luxon';

import { ioTsValidator } from './io';

export const iso8601DateTime = new t.Type<DateTime<true>, string, unknown>(
  'HTTP(S) URL',
  (value): value is DateTime<true> => DateTime.isDateTime(value) && value.isValid,
  ioTsValidator(parseIso8601DateTime),
  url => url.toString()
);

function parseIso8601DateTime(value: unknown): DateTime<true> | false {
  if (typeof value !== 'string') {
    return false;
  }

  const parsed = DateTime.fromISO(value);
  return parsed.isValid ? parsed : false;
}
