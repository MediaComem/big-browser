import * as t from 'io-ts';

export function ioTsValidator<T>(parser: (value: unknown) => T | false): t.Validate<unknown, T> {
  return (value: unknown, context: t.Context) => {
    const parsed = parser(value);
    return parsed === false ? t.failure(value, context) : t.success(parsed);
  };
}
