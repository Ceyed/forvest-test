import { Controller, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTagsEnum } from '../enums/swagger-tags.enum';
import { Public } from './public-route.decorator';

export function PublicController(routePath: string, swaggerTag: SwaggerTagsEnum) {
  const routePrefix: string = 'public/';
  return applyDecorators(
    Public(),
    ApiTags(swaggerTag),
    ApiBearerAuth(),
    Controller(routePrefix + routePath),
  );
}
