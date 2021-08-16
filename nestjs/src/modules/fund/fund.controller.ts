import { Controller, Get, Inject, Post, UsePipes } from "@nestjs/common";
import { PaginationPipe } from "src/pipes/pagination.pipe";
import { FundDao } from "./fund.dao";
import {sleep}  from 'src/utils/common'
import { BaseOrmDao } from "src/services/base-orm.dao";
import { FundPredictEntity } from "src/entities/fund.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FundService } from "./fund3.service";

@Controller()
export class FundController {

  fundDao2: BaseOrmDao
  constructor(
    private readonly fundDao: FundDao,
    private readonly fundDao3: FundService,
    @InjectRepository(FundPredictEntity)
    curRepo: Repository<FundPredictEntity>
  ){
    this.fundDao2 = new BaseOrmDao(curRepo)
  }



  @Get('query_fund_data') 
  @UsePipes(PaginationPipe)
  async queryData() {
    
    const result = await this.fundDao.query({
      // skip:0 ,
      // take: 10
    })

    
    return result 
  }


  @Get('query_fund_data2') 
  @UsePipes(PaginationPipe)
  async queryData2() {
    
    const result = await this.fundDao2.query({
      // skip:0 ,
      // take: 10
    })
    return result 
  }


  @Get('query_fund_data3') 
  @UsePipes(PaginationPipe)
  async queryData3() {
    
    const result = await this.fundDao3.query({
      // skip:0 ,
      // take: 10
    })
    return result 
  }

}