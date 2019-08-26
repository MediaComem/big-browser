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

    const uas = await this.listUserAgents();
    await this.cleanUpUserAgents(uas.slice(memory));

    return uas.slice(0, memory).map(ua => ({
      ...JSON.parse(ua.ua),
      createdAt: new Date(ua.createdAt).toISOString()
    }));
  }

  private async cleanUpUserAgents(uas: Array<{ ua: string, createdAt: number }>) {
    if (uas.length) {
      await db.zrem(key('ua'), uas.map(ua => ua.ua));
    }
  }

  private async listUserAgents() {

    const uasWithScores = await db.zrangebyscore(key('ua'), 0, Date.now(), 'WITHSCORES');
    if (!uasWithScores.length) {
      return [];
    }

    return Array(uasWithScores.length / 2).fill(0).map((_, i) => ({
      ua: uasWithScores[i * 2],
      createdAt: parseInt(uasWithScores[i * 2 + 1], 10)
    })).reverse();
  }
}
