import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import chalk from 'chalk';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { relative as relativePath } from 'node:path';

import { AppModule } from './app/app.module.js';
import { frontendProxyUrl, isDevelopment, port } from './config.js';
import { db } from './db.js';
import { publicDir, root } from './constants.js';

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

  if (isDevelopment()) {
    const frontendProxy = createProxyMiddleware({
      target: frontendProxyUrl,
      changeOrigin: true,
      pathFilter: (path, req) => req.method === 'GET' && !path.startsWith('/api'),
      ws: true
    });

    app.use('/', frontendProxy);

    logger.log(`Proxying requests to the frontend at ${chalk.magenta(frontendProxyUrl)}`);
  } else {
    logger.log(
      `Compiled frontend assets will be served from ${chalk.magenta(relativePath(root, publicDir))}`
    );
  }

  await app.listen(port);
}

Promise.resolve()
  .then(start)
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch((err: unknown) => {
    console.error(chalk.red(err instanceof Error ? err.stack : err));
    process.exit(1);
  });
