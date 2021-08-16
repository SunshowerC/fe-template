import { Module } from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'
import {FundPredictEntity} from 'src/entities/fund.entity'
import { FundController } from "./fund.controller";
import { FundDao } from "./fund.dao";


@Module({
  imports: [
    TypeOrmModule.forFeature([FundPredictEntity]),
  ],
  controllers: [
    FundController
  ],
  providers: [
    FundDao
  ]
})
export class FundModule {

}