import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { TransformRespInterceptor } from './interceptors/transform-res.interceptor';
import { FundModule } from './modules/fund/fund.module';
import { MysqlModule } from './modules/typeorm.module';

@Module({
  imports: [
    MysqlModule,
    // TODO: auto find *.module.ts and import 
    FundModule

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformRespInterceptor
    }
  ],
})
export class AppModule {}
