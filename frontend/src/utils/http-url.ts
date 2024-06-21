import * as t from 'io-ts';

import { ioTsValidator } from './io';

const httpUrlProtocols = new Set(['http:', 'https:']);

export const httpUrl = new t.Type<URL, string, unknown>(
  'HTTP(S) URL',
  (value): value is URL => value instanceof URL && httpUrlProtocols.has(value.protocol),
  ioTsValidator(parseHttpUrl),
  url => url.toString()
);

function parseHttpUrl(value: unknown): URL | false {
  if (typeof value !== 'string') {
    return false;
  }

  let url = undefined;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  return httpUrlProtocols.has(url.protocol) ? url : false;
}
