import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { MongoService } from '../mongo/mongo.service';
import { SEED } from './seed';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly collections = {
    poiCollection: 'poiData',
  };

  constructor(private mongo: MongoService) {}

  async onApplicationBootstrap() {
    // todo: update environment
    Logger.debug('Starting App in environment: dev');
    await this.initCollections();
    await this.seedPOI();
  }

  private async initCollections() {
    Logger.debug('resetting db');
    Object.values(this.collections).forEach(async (name) => {
      Logger.debug('Seeding: ' + name);
      await this.getCollection(name);
      Logger.debug('Seeded: ' + name);
    });
  }

  private async seedPOI() {
    Logger.debug('Seeding POI data');
    const eventCollection = await this.getCollection(
      this.collections.poiCollection,
    );
    await eventCollection.deleteMany({});
    await eventCollection.insertMany(SEED.points_of_interest);
    Logger.debug(
      `Got ${await eventCollection.estimatedDocumentCount()} seeded POINTS OF INTEREST in db`,
    );
  }

  private async getCollection(name: string) {
    const collection = this.mongo.getCollection(name)
      ? this.mongo.getCollection(name)
      : await this.mongo.createCollection(name);
    return collection;
  }
}
