import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { iso8601DateTime } from '../utils/iso-8601-date-time';

export const userAgent = t.readonly(
  t.type({
    ua: t.string,
    browser: t.readonly(
      t.partial({
        name: t.union([t.string, t.undefined]),
        version: t.union([t.string, t.undefined]),
        major: t.union([t.string, t.undefined])
      })
    ),
    cpu: t.readonly(
      t.partial({
        architecture: t.union([t.string, t.undefined])
      })
    ),
    device: t.readonly(
      t.partial({
        model: t.union([t.string, t.undefined]),
        type: t.union([t.string, t.undefined]),
        vendor: t.union([t.string, t.undefined])
      })
    ),
    engine: t.readonly(
      t.partial({
        name: t.union([t.string, t.undefined]),
        version: t.union([t.string, t.undefined])
      })
    ),
    os: t.readonly(
      t.partial({
        name: t.union([t.string, t.undefined]),
        version: t.union([t.string, t.undefined])
      })
    ),
    createdAt: iso8601DateTime
  })
);

export type UserAgent = t.TypeOf<typeof userAgent>;

export const useUserAgentStore = defineStore('ua', () => {
  const currentUserAgent = ref<UserAgent | undefined>(undefined);
  const previousUserAgents = ref<readonly UserAgent[]>([]);

  return {
    currentUserAgent,
    previousUserAgents,
    detectCurrentUserAgent: async () => {
      currentUserAgent.value = await detectCurrentUserAgent();
    },
    loadPreviousUserAgents: async () => {
      previousUserAgents.value = await loadPreviousUserAgents();
    }
  };
});

async function detectCurrentUserAgent(): Promise<UserAgent | undefined> {
  const res = await fetch('/api/ua', { method: 'POST' });
  const ua = userAgent.decode(await res.json());
  return isLeft(ua) ? undefined : ua.right;
}

async function loadPreviousUserAgents(): Promise<readonly UserAgent[]> {
  const res = await fetch('/api/ua');
  const uas = t.readonlyArray(userAgent).decode(await res.json());
  return isLeft(uas) ? [] : uas.right;
}
