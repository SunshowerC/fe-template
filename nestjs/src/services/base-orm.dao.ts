

import { Injectable } from '@nestjs/common'
import { InjectConnection, InjectRepository,  } from '@nestjs/typeorm'
import { Connection, Repository , EntityTarget} from 'typeorm'
import { removeFalseLikeKey } from 'src/utils/common'
import { PaginationDto } from 'src/pipes/pagination.pipe'

type CurrEntity = any


@Injectable()
export class BaseOrmDao {
  private curRepo: Repository<any>

  constructor(
    reposity: Repository<any>
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
  async query(body: Partial<CurrEntity> & PaginationDto = {}) {
    const [data, total] = await this.curRepo.findAndCount({
      skip: 0,
      take: 1000,
      order: {
        createTime: 'DESC'
      },
      where: {
        ...removeFalseLikeKey(body, [0])
      }
    })
    return { data, total }
  }
}
