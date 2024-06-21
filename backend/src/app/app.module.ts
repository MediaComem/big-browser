import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { publicDir } from '../constants.js';

@Module({
  controllers: [AppController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: publicDir
    })
  ],
  providers: [AppService]
})
export class AppModule {}
