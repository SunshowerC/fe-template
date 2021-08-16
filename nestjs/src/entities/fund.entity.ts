import { Entity, Column, Index, ConnectionOptions, PrimaryColumn, createConnection } from 'typeorm'

export enum PredictStatus {
  FAILED = 0,
  SUCCESS = 1,
}

@Entity({
  name: `fund_predict_tab`
})
export class FundPredictEntity { 
  constructor(partial?: Partial<FundPredictEntity>) {
    partial && Object.assign(this, partial)
  }

  @PrimaryColumn({
    name: 'id',
    type: 'bigint'
  })
  id!: string

  @Column({
    name: 'fund_name',
    type: 'varchar'
  })
  fundName!: string

  @Column({
    name: 'fund_code',
    type: 'varchar'
  })
  fundCode!: string

  @Column({
    name: 'predict_date',
    type: 'date'
  })
  predictDate!: string

  @Column({
    name: 'predict_company',
    type: 'varchar'
  })
  predictCompany!: string

  @Column({
    name: 'predict_increase',
    type: 'float'
  })
  predictIncrease!: number

  @Column({
    name: 'final_increase',
    type: 'float'
  })
  finalIncrease!: number

  /**
   * 预测溢价率
   */
  @Column({
    name: 'predict_premium',
    type: 'float'
  })
  predictPremium!: number

  @Column({
    name: 'final_premium',
    type: 'float'
  })
  finalPremium!: number

  @Column({
    name: 'error',
    type: 'float'
  })
  error!: number

  @Column({
    name: 'success',
    type: 'tinyint'
  })
  success!: number

  @Column({
    name: 'create_date',
    type: 'datetime',
  })
  createTime!: Date

  @Column({
    name: 'update_date',
    type: 'datetime',
  })
  updateTime!: Date

  shouldDo?: '溢' | '折' | '无'
}
