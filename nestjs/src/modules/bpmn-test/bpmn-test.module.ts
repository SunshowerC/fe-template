import { Module } from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'
import {FundPredictEntity} from 'src/entities/fund.entity'
import { BpmnTestController } from "./bpmn-test.controller";


// TODO: 自动注册 controller ，provider 。
// 连 module 都可以干掉了
@Module({
  imports: [
  ],
  controllers: [
    BpmnTestController
  ],
  providers: [
    // FundService,
  ]
})
export class BpmnTestModule {

}