import { Injectable } from '@nestjs/common';

@Injectable()
export class PoiDataService {
  findAll() {
    return `This action returns all poiData`;
  }
}
