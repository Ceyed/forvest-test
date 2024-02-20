import { BadRequestException, Injectable } from '@nestjs/common';
import { uuid } from 'libs/src/lib/common/uuid';
import { CreateUserDto } from 'libs/src/lib/dtos/user/create-user.dto';
import { UpdateUserDto } from 'libs/src/lib/dtos/user/update-user.dto';
import { UserBookmarksEntity } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.entity';
import { UserBookmarkRepository } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.repository';
import { UserEntity } from 'libs/src/lib/entities/user/user.entity';
import { UserRepository } from 'libs/src/lib/entities/user/user.repository';
import { serverConfig } from 'src/configs/server.config';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userBookmarkRepository: UserBookmarkRepository,
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
}
