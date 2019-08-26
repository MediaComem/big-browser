import { NestFactory } from '@nestjs/core';
import chalk from 'chalk';

import { AppModule } from './app.module';
import { port } from './config';
import { db } from './db';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

Promise.resolve().then(db.connect).then(bootstrap).catch(err => {
  console.error(chalk.red(err.stack));
  process.exit(1);
});
