import { Controller, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTagsEnum } from '../enums/swagger-tags.enum';

export function AuthController(routePath: string, swaggerTag: SwaggerTagsEnum) {
  return applyDecorators(ApiTags(swaggerTag), ApiBearerAuth(), Controller(routePath));
}
