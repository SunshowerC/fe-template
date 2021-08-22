

import { Injectable } from '@nestjs/common'
import { FindOneOptions, Repository } from 'typeorm'
import { removeFalseLikeKey } from 'src/utils/common'
import { PaginationDto, transToFullPagination } from 'src/pipes/pagination.pipe'
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames'

// type CurrEntity = any

interface EntityType {
  id: string

  createTime: Date
  updateTime: Date
}


@Injectable()
export class BaseOrmDao<CurrEntity extends EntityType> {
  private curRepo: Repository<CurrEntity>

  constructor(
    reposity: Repository<CurrEntity>
  ) {
    this.curRepo = reposity
  }

  /**
   * 增或改
   */
  async insertOrUpdate(body: Partial<CurrEntity>) {
    let currEntity
    if (body.id) {
      currEntity = await this.curRepo.findOne(body)
    }
    currEntity = {
      ...(currEntity || {}),
      ...body,
      id: body.id?.toString(), // @important id 必须是 bigint, string 才能被 save .
      updateTime: undefined // 去除更新时间、typeorm 会自动更新最新的
    }
    const result = await this.curRepo.save(currEntity)
    return result
  }

  /**
   * 查
   */
  async query(body: Partial<CurrEntity>, pagination?: PaginationDto ) {

    const defaultOrder: FindOneOptions<EntityType>['order'] = {
      createTime: 'DESC'
    }
    const fullPg = transToFullPagination(pagination || {})
     
    const [data, total] = await this.curRepo.findAndCount({
      skip: fullPg.pagination.skip,
      take: fullPg.pagination.take,
      order: defaultOrder,
      where: {
        ...removeFalseLikeKey(body, [0])
      }
    })
    return { data, total }
  }
}
