import { Column, Entity, PrimaryColumn } from "typeorm";



@Entity({
  name: 'date_fund_tab'
})
export class DateFundEntity {
  constructor(partial?: Partial<DateFundEntity>) {
    partial && Object.assign(this, partial)
  }

  @PrimaryColumn({
    name: 'id',
    type: 'bigint'
  })
  id!: string

  @Column({
    name: 'create_date',
    type: 'datetime',
  })
  createDate!: Date

  @Column({
    name: 'update_date',
    type: 'datetime',
  })
  updateDate!: Date

  @Column({
    name: 'fund_date',
    type: 'date'
  })
  fundDate!: string


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
    name: 'json_data',
    type: 'text'
  })
  jsonData!: string


}