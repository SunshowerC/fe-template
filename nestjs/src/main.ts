import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appLogger, AppLogger } from './services/logger/app-logger.service';
import httpContext from 'express-http-context'

const PORT = process.env.PORT ?? 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // TODO: 日志输出到文件
    // nest 默认日志
    // logger: false, // 关闭日志
    // logger: ['error', 'warn', 'log', 'debug', 'verbose'], // 指定日志级别
    logger: appLogger
  });

  app.use(httpContext.middleware)

  
  await app.listen(PORT);
}
bootstrap();
