import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { loggerFuncMiddleware } from './middlewares/loggerFunc.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CatsModule } from './modules/cats/cats.module';
import { CatsController } from './modules/cats/cats.controller';

@Module({
  imports: [AuthModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes({ path: 'cats', method: RequestMethod.GET });
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(loggerFuncMiddleware).forRoutes(CatsController);
  // }

  // consumer // https://docs.nestjs.com/middleware#excluding-routes
  // .apply(LoggerMiddleware)
  // .exclude(
  //   { path: 'cats', method: RequestMethod.GET },
  //   { path: 'cats', method: RequestMethod.POST },
  //   'cats/(.*)',
  // )
  // .forRoutes(CatsController);
}
