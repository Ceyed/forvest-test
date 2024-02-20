import { Body, Post } from '@nestjs/common';
import { PublicController } from 'libs/src/lib/decorators/public-controller.decorator';
import { CreateUserDto } from 'libs/src/lib/dtos/users/create-user.dto';
import { UserEntity } from 'libs/src/lib/entities/user/user.entity';
import { SwaggerTagsEnum } from 'libs/src/lib/enums/swagger-tags.enum';
import { UserService } from './user.service';

@PublicController('user', SwaggerTagsEnum.User)
export class UserPublicController {
  constructor(private readonly _userService: UserService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    return this._userService.register(createUserDto);
  }
}
