import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FundPredictEntity } from "src/entities/fund.entity";
import { BaseOrmDao } from "src/services/base-orm.dao";
import { Repository } from "typeorm";

type CurrEntity = FundPredictEntity

@Injectable()
export class FundService extends BaseOrmDao {
  constructor(
    @InjectRepository(FundPredictEntity)
    curRepo: Repository<CurrEntity>
  ) {
    super(curRepo)
  }


  getData() {
    
  }
}