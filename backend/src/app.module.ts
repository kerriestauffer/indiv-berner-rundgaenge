import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import {HttpModule} from '@nestjs/axios'

@Module({
  imports: [RoutesModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
