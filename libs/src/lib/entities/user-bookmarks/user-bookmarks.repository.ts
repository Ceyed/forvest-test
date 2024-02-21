import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { uuid } from '../../common/uuid';
import { UserBookmarksEntity } from './user-bookmarks.entity';

@Injectable()
export class UserBookmarkRepository extends Repository<UserBookmarksEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(UserBookmarksEntity, _dataSource.createEntityManager());
  }

  bookmarkExists(bookId: uuid, userId: uuid): Promise<number> {
    return this.countBy({ bookId, userId });
  }

  getUserBookmarks(userId: uuid): Promise<UserBookmarksEntity[]> {
    return this.findBy({ userId });
  }

  getAllBookmarks(): Promise<UserBookmarksEntity[]> {
    return this.find();
  }
}
