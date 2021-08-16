import { Module } from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'
import {FundPredictEntity} from 'src/entities/fund.entity'
import { FundController } from "./fund.controller";
import { FundDao } from "./fund.dao";
import { FundService } from "./fund3.service";


// TODO: 自动注册 controller ，provider 
@Module({
  imports: [
    TypeOrmModule.forFeature([FundPredictEntity]),
  ],
  controllers: [
    FundController
  ],
  providers: [
    FundDao,
    FundService
  ]
})
export class FundModule {

}