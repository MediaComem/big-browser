import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join as joinPath, resolve as resolvePath } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [
    AppController
  ],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolvePath(joinPath(__dirname, '..', 'public'))
    })
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
