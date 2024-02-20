import { Get } from '@nestjs/common';
import { AuthController } from 'libs/src/lib/decorators/auth-controller.decorator';
import { User } from 'libs/src/lib/decorators/user.decorator';
import { UserAuth } from 'libs/src/lib/dtos/user-auth.dto';
import { UserBookmarksEntity } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.entity';
import { SwaggerTagsEnum } from 'libs/src/lib/enums/swagger-tags.enum';
import { UserService } from './user.service';

@AuthController('user', SwaggerTagsEnum.User)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('user-bookmarks')
  getUserBookmarks(@User() user: UserAuth): Promise<UserBookmarksEntity[]> {
    return this._userService.getUserBookmarks(user.id);
  }

  @Get('all-bookmarks')
  getAllBookmarks(): Promise<UserBookmarksEntity[]> {
    return this._userService.getAllBookmarks();
  }
}
