import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';
import { db, key } from './db';
import { memory } from './config';

@Injectable()
export class AppService {

  async detectUserAgent(userAgentHeader?: string) {
    if (!userAgentHeader) {
      throw new HttpException('Missing User-Agent header', HttpStatus.BAD_REQUEST);
    }

    const result = new UAParser(userAgentHeader).getResult();
    await db.zadd(key('ua'), Date.now(), JSON.stringify(result));

    return result;
  }

  async retrieveUserAgents() {
    if (memory === 0) {
      return [];
    }

    const uas = await db.zrangebyscore(key('ua'), 0, Date.now());
    await this.cleanUpUserAgents(uas.reverse().slice(memory));

    return uas.reverse().slice(0, memory).map(ua => JSON.parse(ua));
  }

  private async cleanUpUserAgents(uas: string[]) {
    if (uas.length) {
      await db.zrem(key('ua'), uas);
    }
  }
}
