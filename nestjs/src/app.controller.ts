import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { appLogger } from './services/logger/app-logger.service';

@Controller('/cat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/post')
  async postllo(@Body() body: any, @Req() req: any){
    appLogger.info('heloelo')
    return new Promise((resolve,rej)=>{
      setTimeout(()=>{
        resolve(this.appService.getHello())
      }, 10000)
    })

    
  }
}
