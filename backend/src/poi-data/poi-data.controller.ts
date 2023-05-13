import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PoiDataService } from './poi-data.service';

@Controller('poi-data')
export class PoiDataController {
  constructor(private readonly poiDataService: PoiDataService) {}

  @Get()
  findAll() {
    return this.poiDataService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.poiDataService.findById(id);
  }
}
