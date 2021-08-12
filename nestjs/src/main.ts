import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfigure } from './config/app-configure';
import { appLogger } from './services/logger/app-logger.service';
import {apiPrefix, env} from './config/index'


const PORT = process.env.PORT ?? 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // TODO: 日志输出到文件
    // nest 默认日志
    // logger: false, // 关闭日志
    // logger: ['error', 'warn', 'log', 'debug', 'verbose'], // 指定日志级别
    logger: appLogger
  });

  

  appConfigure(app)

  app.setGlobalPrefix(apiPrefix)
  await app.listen(PORT);
  appLogger.info(`app is running on ${PORT}`, {
    env,
    apiPrefix
  })
}
bootstrap();
