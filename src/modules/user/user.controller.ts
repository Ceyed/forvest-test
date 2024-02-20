import { AuthController } from 'libs/src/lib/decorators/auth-controller.decorator';
import { SwaggerTagsEnum } from 'libs/src/lib/enums/swagger-tags.enum';
import { UserService } from './user.service';

@AuthController('user', SwaggerTagsEnum.User)
export class UserController {
  constructor(private readonly _userService: UserService) {}
}
