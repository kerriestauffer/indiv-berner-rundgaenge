import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Individuelle Berner Stadtspaziergänge')
    .setDescription('API Routenfinder')
    .setVersion('1.0')
    .addTag('spaziergaenge')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();

  const apiPrefix = await configService.get('API_PREFIX');
  app.setGlobalPrefix(apiPrefix ? apiPrefix.toString() : 'api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('backend')
    //.setDescription('Every available endpoint.')
    .setVersion('1.0')
    //.addTag('tag')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  if (!(await configService.get('PRODUCTION'))) {
    // no api docs in production
    SwaggerModule.setup('api', app, swaggerDocument);
  }

  const port = await configService.get('PORT');
  await app.listen(3000);
}
bootstrap();
