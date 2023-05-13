import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { ApiParam } from '@nestjs/swagger';

export interface RouteQueryParams {
  coordinates: string,
  mode: string
}

@Controller('trips')
export class RoutesController {

  constructor(private readonly routesService: RoutesService) {}

  @Get('health')
  health(){
    return HttpStatus.OK;
  }

  @Get()
  @ApiParam({
    name: 'routeQueryParams',
    description: 'coordinates, mode',
  })
  findTrip(@Query() routeQueryParams: RouteQueryParams) {
    try {
      return this.routesService.getTrip(routeQueryParams.coordinates, routeQueryParams.mode);
    } catch(error){
      throw new Error(error);
    }
  }
}
