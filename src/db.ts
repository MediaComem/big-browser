import { createClient } from 'redis';
import { promisify } from 'util';

import { databaseUrl, databasePrefix } from './config';

const client = createClient(databaseUrl);

const connected = new Promise((resolve, reject) => {
  client.on('error', reject);
  client.on('ready', resolve);
});

export const db = {
  async connect() {
    return connected;
  },

  zadd: promisify(client.zadd).bind(client),
  zrangebyscore: promisify(client.zrangebyscore).bind(client),
  zrem: promisify(client.zrem).bind(client)
};

export function key(...parts: string[]) {
  const prefix = getPrefix();
  return prefix ? [ prefix, ...parts ].join(':') : parts.join(':');
}

function getPrefix() {
  return databasePrefix.trim().length ? databasePrefix.trim() : undefined;
}
