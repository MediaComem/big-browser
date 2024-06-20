import { createClient } from 'redis';

import { databasePrefix, databaseUrl } from './config.js';

const client = createClient({ url: databaseUrl });

const connected = client
  .on('error', err => {
    // eslint-disable-next-line no-console
    console.warn(err);
  })
  .connect();

export const db = {
  url: databaseUrl,

  connect(): Promise<unknown> {
    return connected;
  },

  zAdd: client.zAdd.bind(client),
  zRangeByScore: client.zRangeByScore.bind(client),
  zRangeByScoreWithScores: client.zRangeByScoreWithScores.bind(client),
  zRem: client.zRem.bind(client)
};

export function key(...parts: string[]): string {
  const prefix = getPrefix();
  return prefix ? [prefix, ...parts].join(':') : parts.join(':');
}

function getPrefix(): string | undefined {
  return databasePrefix.trim().length === 0 ? undefined : databasePrefix.trim();
}
