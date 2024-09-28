/* eslint-disable @typescript-eslint/class-methods-use-this */
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnApplicationBootstrap
} from '@nestjs/common';
import chalk from 'chalk';
import { DateTime } from 'luxon';
import { relative as relativePath } from 'node:path';
import { UAParser } from 'ua-parser-js';

import { memory } from '../config.js';
import { publicDir, root } from '../constants.js';
import { db, key } from '../db.js';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  readonly #logger: Logger;

  constructor() {
    this.#logger = new Logger(new.target.name);
  }

  onApplicationBootstrap(): void {
    this.#logger.log(`Assets will be served from ${chalk.magenta(relativePath(root, publicDir))}`);
  }

  async detectUserAgent(this: void, userAgentHeader?: string) {
    if (!userAgentHeader) {
      throw new HttpException('Missing User-Agent header', HttpStatus.BAD_REQUEST);
    }

    const result = new UAParser(userAgentHeader).getResult();
    const now = DateTime.now();
    await db.zAdd(key('ua'), { score: now.toMillis(), value: JSON.stringify(result) });

    return {
      ...result,
      createdAt: now.toISO()
    };
  }

  async retrieveUserAgents() {
    if (memory === 0) {
      return [];
    }

    const uas = await this.listUserAgents();
    await this.cleanUpUserAgents(uas.slice(memory));

    return uas.slice(0, memory).map(ua => ({
      ...JSON.parse(ua.ua),
      createdAt: DateTime.fromMillis(ua.createdAt).toISO()
    }));
  }

  private async cleanUpUserAgents(uas: Array<{ ua: string; createdAt: number }>) {
    if (uas.length !== 0) {
      await db.zRem(
        key('ua'),
        uas.map(ua => ua.ua)
      );
    }
  }

  private async listUserAgents() {
    const uasWithScores = await db.zRangeByScoreWithScores(key('ua'), 0, DateTime.now().toMillis());
    if (uasWithScores.length === 0) {
      return [];
    }

    return uasWithScores
      .flatMap(({ score, value }) => ({
        ua: value,
        createdAt: score
      }))
      .reverse();
  }
}
