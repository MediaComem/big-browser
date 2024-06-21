import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service.js';

@Controller('/api/ua')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  detectUserAgent(@Req() req: Request) {
    return this.appService.detectUserAgent(req.get('User-Agent'));
  }

  @Get()
  retrieveUserAgents() {
    return this.appService.retrieveUserAgents();
  }
}
