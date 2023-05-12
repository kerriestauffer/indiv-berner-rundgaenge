import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection, Db, MongoClient } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  private connection: MongoClient;
  private db: Db;

  constructor(private configService: ConfigService) {}

  public getMongoDb(): Db {
    return this.db;
  }

  public createCollection(name: string): Promise<Collection> {
    return this.db.createCollection(name);
  }

  public getCollection(collection: string) {
    return this.db.collection(collection);
  }

  async onModuleInit() {
    Logger.debug('Initializing mongo connection');
    const mongo_uri = this.configService.get('MONGO_URL');
    const db = this.configService.get('MONGO_DB');

    this.connection = new MongoClient(mongo_uri);
    this.db = this.connection.db(db);
    Logger.debug('Initialized mongo connection');
  }
  async onModuleDestroy() {
    Logger.debug('Stopping mongo connection');
    if (this.connection) await this.connection.close();
    Logger.debug('Stopped mongo connection');
  }
}
