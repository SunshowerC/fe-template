import { Controller, Get, Post, UsePipes } from "@nestjs/common";
import { PaginationPipe } from "src/pipes/pagination.pipe";
import { FundDao } from "./fund.dao";
import {sleep}  from 'src/utils/common'

@Controller()
export class FundController {
  constructor(
    private readonly fundDao: FundDao,
  ){}



  @Get('query_fund_data') 
  @UsePipes(PaginationPipe)
  async queryData() {
    
    const result = await this.fundDao.query({
      // skip:0 ,
      // take: 10
    })

    
    return result 
  }


}