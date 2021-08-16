import { Module } from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'
import {FundPredictEntity} from 'src/entities/fund.entity'
import { FundController } from "./fund.controller";
import {  FundService } from "./fund.service";


// TODO: 自动注册 controller ，provider 。
// 连 module 都可以干掉了
@Module({
  imports: [
  ],
  controllers: [
    FundController
  ],
  providers: [
    FundService,
  ]
})
export class FundModule {

}