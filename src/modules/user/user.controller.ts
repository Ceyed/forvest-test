import { Get, Post, UploadedFile } from '@nestjs/common';
import { ApiCustomFile } from 'libs/src/lib/decorators/api-file.decorator';
import { AuthController } from 'libs/src/lib/decorators/auth-controller.decorator';
import { User } from 'libs/src/lib/decorators/user.decorator';
import { UpdateResultDto } from 'libs/src/lib/dtos/update-result.dto';
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

  @Post('upload-avatar')
  @ApiCustomFile(false)
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserAuth,
  ): Promise<UpdateResultDto> {
    return this._userService.uploadAvatar(file, user);
  }
}
