import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { ApiParam } from '@nestjs/swagger';

export interface RouteQueryParams {
  coordinates: string,
  mode: string
}

@Controller('routes')
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
  findRoute(@Query() routeQueryParams: RouteQueryParams) {
    console.log(routeQueryParams)
    try {
      return this.routesService.getRoute(routeQueryParams.coordinates, routeQueryParams.mode);
    } catch(error){
      throw new Error(error);
    }
  }
}
