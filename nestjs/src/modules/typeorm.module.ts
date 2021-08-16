import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from 'src/config/db';


export const MysqlModule = TypeOrmModule.forRoot({
  type: 'mysql',
  autoLoadEntities: true,
  bigNumberStrings: true,
  // synchronize: true,

  ...DB_CONFIG
})