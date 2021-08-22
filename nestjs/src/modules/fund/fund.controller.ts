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
      
    }, {
      current: 1,
      pageSize: 20
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
    }, {
      current: 2,
      pageSize: 20
    })

    res.send({
      [CustomFormatKey]: CaseFormat.SnakeCase,
      ...result
    })

    // return result 
  }

}