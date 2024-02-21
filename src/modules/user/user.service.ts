import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { uuid } from 'libs/src/lib/common/uuid';
import { UpdateResultDto } from 'libs/src/lib/dtos/update-result.dto';
import { UserAuth } from 'libs/src/lib/dtos/user-auth.dto';
import { CreateUserDto } from 'libs/src/lib/dtos/user/create-user.dto';
import { UpdateUserDto } from 'libs/src/lib/dtos/user/update-user.dto';
import { FileEntity } from 'libs/src/lib/entities/file/file.entity';
import { FileRepository } from 'libs/src/lib/entities/file/file.repository';
import { UserBookmarksEntity } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.entity';
import { UserBookmarkRepository } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.repository';
import { UserEntity } from 'libs/src/lib/entities/user/user.entity';
import { UserRepository } from 'libs/src/lib/entities/user/user.repository';
import { serverConfig } from 'src/configs/server.config';
import { UpdateResult } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userBookmarkRepository: UserBookmarkRepository,
    private readonly _fileRepository: FileRepository,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    await this._checkExistingUser(createUserDto);

    createUserDto.password = await bcrypt.hash(createUserDto.password, serverConfig.salt);
    const { password, ...otherUserFields } = await this._userRepository.add(createUserDto);

    return otherUserFields;
  }

  private _checkExistingUser = async (data: CreateUserDto | UpdateUserDto): Promise<void> => {
    const user: UserEntity = await this._userRepository.getOne({ mobile: data.mobile });
    if (user) {
      throw new BadRequestException('Mobile is used. login or try another mobile');
    }
  };

  getUserBookmarks(id: uuid): Promise<UserBookmarksEntity[]> {
    return this._userBookmarkRepository.getUserBookmarks(id);
  }

  getAllBookmarks(): Promise<UserBookmarksEntity[]> {
    return this._userBookmarkRepository.getAllBookmarks();
  }

  async uploadAvatar(file: Express.Multer.File, user: UserAuth): Promise<UpdateResultDto> {
    if (!file) throw new NotFoundException('File not founded');
    const uploadAvatarResult: FileEntity = await this._fileRepository.uploadAvatar(file, user.id);
    if (uploadAvatarResult) {
      const UpdateResult: UpdateResult = await this._userRepository.update(user.id, {
        avatarFileId: uploadAvatarResult.id,
        avatarLink: uploadAvatarResult.fileUrl,
      });
      return { status: !!UpdateResult.affected };
    }
    return { status: false };
  }
}
