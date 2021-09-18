import { DB_CONFIG } from 'src/config/db';
import { FundPredictEntity } from 'src/entities/fund.entity';
import { OrmLogger } from 'src/services/logger/ormlogger.service';
import { Connection, createConnection } from 'typeorm';
export const DATABASE_CONNECTION = 'DATABASE_CONNECTION'

const databaseProvider = {
  provide: DATABASE_CONNECTION,
  useFactory: async () => await createConnection({
    type: 'mysql',

    entities: [
      __dirname + '/../../**/*.entity{.ts,.js}',
    ],
    bigNumberStrings: true,
    logger: new OrmLogger('all'),
    logging: 'all',


    // 最大的正常执行时间，如果 sql 执行时间大于这个值，
    // 将会触发 logQuerySlow ，设置为 -1 即100%触发 logQuerySlow
    // sql 执行大于 1000ms 视为慢查询，记录日志
    // @important 
    // - [存疑] sql query 日志是查询前，结果还未响应就开始记录的
    // - 发现，db 连接超时，不会有 sql query log ，说明先进行 db 连接，再 log ?
    // - slow query 是查询结果出来后，才记录的日志
    maxQueryExecutionTime: 2000,

    ...DB_CONFIG,
  }),
}

const photoProvider = {
  provide: FundPredictEntity,
  useFactory: (connection: Connection) => connection.getRepository(FundPredictEntity),
  inject: [DATABASE_CONNECTION],
};

export const databaseProviders = [
  databaseProvider,
  photoProvider
];