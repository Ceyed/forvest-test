import { Controller, Get } from '@nestjs/common';
import { Public } from 'libs/src/lib/decorators/public-route.decorator';
import { AppService } from './app.service';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
