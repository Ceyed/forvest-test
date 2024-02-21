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
import { FileTypeEnum } from 'libs/src/lib/enums/file-type.enum';
import { RedisEntityEnum } from 'libs/src/lib/enums/redis-entities.enum';
import { serverConfig } from 'src/configs/server.config';
import { UpdateResult } from 'typeorm';
import { RedisHelperService } from '../redis-helper/redis-helper.service';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userBookmarkRepository: UserBookmarkRepository,
    private readonly _fileRepository: FileRepository,
    private readonly _redisHelperService: RedisHelperService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    await this._checkExistingUser(createUserDto);

    createUserDto.password = await bcrypt.hash(createUserDto.password, serverConfig.salt);
    const { password, ...otherUserFields } = await this._userRepository.add(createUserDto);

    return otherUserFields;
  }

  async getUserBookmarks(id: uuid): Promise<UserBookmarksEntity[]> {
    const key: string = this._redisHelperService.getKey(RedisEntityEnum.Bookmark, id);
    const redisData: UserBookmarksEntity[] =
      await this._redisHelperService.get<UserBookmarksEntity[]>(key);
    if (redisData) {
      return redisData;
    }

    const databaseData: UserBookmarksEntity[] =
      await this._userBookmarkRepository.getUserBookmarks(id);
    await this._redisHelperService.set<UserBookmarksEntity[]>(key, databaseData);
    return databaseData;
  }

  async getAllBookmarks(): Promise<UserBookmarksEntity[]> {
    const key: string = this._redisHelperService.getKey(RedisEntityEnum.Bookmark, 'all');
    const redisData: UserBookmarksEntity[] =
      await this._redisHelperService.get<UserBookmarksEntity[]>(key);
    if (redisData) {
      return redisData;
    }

    const databaseData: UserBookmarksEntity[] =
      await this._userBookmarkRepository.getAllBookmarks();
    await this._redisHelperService.set<UserBookmarksEntity[]>(key, databaseData);
    return databaseData;
  }

  async uploadAvatar(file: Express.Multer.File, user: UserAuth): Promise<UpdateResultDto> {
    if (!file) throw new NotFoundException('File not founded');

    const uploadAvatarResult: FileEntity = await this._fileRepository.upload(
      file,
      user.id,
      FileTypeEnum.Avatar,
    );
    if (uploadAvatarResult) {
      const UpdateResult: UpdateResult = await this._userRepository.update(user.id, {
        avatarFileId: uploadAvatarResult.id,
        avatarLink: uploadAvatarResult.fileUrl,
      });
      return { status: !!UpdateResult.affected };
    }
    return { status: false };
  }

  private _checkExistingUser = async (data: CreateUserDto | UpdateUserDto): Promise<void> => {
    const user: UserEntity = await this._userRepository.getOne({ mobile: data.mobile });
    if (user) {
      throw new BadRequestException('Mobile is used. login or try another mobile');
    }
  };
}
