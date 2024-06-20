import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import chalk from 'chalk';

import { AppModule } from './app.module.js';
import { port } from './config.js';
import { db } from './db.js';

async function start() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);

  const sanitizedUrl = new URL(db.url);
  if (sanitizedUrl.password !== '') {
    sanitizedUrl.password = '***';
  }

  logger.debug(`Connecting to the database at ${sanitizedUrl.toString()}...`);
  await db.connect();
  logger.log(`Connected to the database at ${sanitizedUrl.toString()}`);

  await app.listen(port);
}

Promise.resolve()
  .then(start)
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch((err: unknown) => {
    console.error(chalk.red(err instanceof Error ? err.stack : err));
    process.exit(1);
  });
