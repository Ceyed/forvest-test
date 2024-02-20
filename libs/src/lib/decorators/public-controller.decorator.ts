import { Controller, applyDecorators } from '@nestjs/common';
import { Public } from './public-route.decorator';

export function PublicController(routePath: string) {
  const routePrefix: string = 'public/';
  return applyDecorators(Public(), Controller(routePrefix + routePath));
}
