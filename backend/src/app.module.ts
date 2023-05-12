import { Module, Logger } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      validationSchema: Joi.object({
        PRODUCTION: Joi.bool().required(),
        SEED_MONGO: Joi.bool().required(),
        MONGO_URL: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        PORT: Joi.number(),
        API_PREFIX: Joi.string(),
      })
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        if (configService.get('PRODUCTION')) {
          Logger.log('Running in production!');
          return [
            {
              rootPath: join(__dirname, '..', 'client'),
              exclude: ['api'],
              // index: false,
            },
          ];
        } else {
          return [];
        }
      },
      inject: [ConfigService],
    }),
    MongoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }

