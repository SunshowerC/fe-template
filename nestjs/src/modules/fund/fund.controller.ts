import { Body, Controller, Get, Inject, Post, Res, UsePipes } from "@nestjs/common";
import { PaginationPipe } from "src/pipes/pagination.pipe";
import { FundService } from "./fund.service";
import {sleep}  from 'src/utils/common'
import { BaseOrmDao } from "src/modules/db/base-orm.dao";
import { FundPredictEntity } from "src/entities/fund.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { CaseFormat, CustomFormatKey } from "src/config/data-transform";

@Controller()
export class FundController {

  constructor(
    private fundDao: FundService,
  ){
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

  @Post('query_post') 
  @UsePipes(PaginationPipe)
  async posttt(@Body() body: any, @Res() res: Response ) {
    console.log('bo', {
      body
    })


    const result = await  this.fundDao.query({
      // skip:0 ,
      // take: 10
    })

    res.send({
      [CustomFormatKey]: CaseFormat.SnakeCase,
      ...result
    })

    // return result 
  }

  // @Get('query_fund_data2') 
  // @UsePipes(PaginationPipe)
  // async queryData2() {
    
  //   const result = await this.fundDao2.query({
  //     // skip:0 ,
  //     // take: 10
  //   })
  //   return result 
  // }


  // @Get('query_fund_data3') 
  // @UsePipes(PaginationPipe)
  // async queryData3() {
    
  //   const result = await this.fundDao3.query({
  //     // skip:0 ,
  //     // take: 10
  //   })
  //   return result 
  // }

}