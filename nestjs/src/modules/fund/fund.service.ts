

import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FundPredictEntity } from 'src/entities/fund.entity'
import { removeFalseLikeKey } from 'src/utils/common'
import { PaginationDto } from 'src/pipes/pagination.pipe'
import { BaseOrmDao } from 'src/modules/db/base-orm.dao'


@Injectable()
export class FundService extends BaseOrmDao {
  constructor(
    @Inject(FundPredictEntity)
    curRepo: Repository<FundPredictEntity>,
  ) {
    super(curRepo)
  }

}
