import { BadRequestException, Injectable } from '@nestjs/common';
import { uuid } from 'libs/src/lib/common/uuid';
import { CreateBookDto } from 'libs/src/lib/dtos/book/create-book.dto';
import { UpdateBookDto } from 'libs/src/lib/dtos/book/update-book.dto';
import { UpdateResultDto } from 'libs/src/lib/dtos/update-result.dto';
import { BookEntity } from 'libs/src/lib/entities/book/book.entity';
import { BookRepository } from 'libs/src/lib/entities/book/book.repository';
import { UserBookmarksEntity } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.entity';
import { UserBookmarkRepository } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly _bookRepository: BookRepository,
    private readonly _userBookmarkRepository: UserBookmarkRepository,
  ) {}

  getAll(): Promise<BookEntity[]> {
    return this._bookRepository.getAll();
  }

  create(createBookDto: CreateBookDto): Promise<BookEntity> {
    return this._bookRepository.add(createBookDto);
  }

  async update(id: uuid, updateBookDto: UpdateBookDto): Promise<UpdateResultDto> {
    await this._bookRepository.getOneOrFail(id);
    return this._bookRepository.edit(id, updateBookDto);
  }

  async addToBookmark(id: uuid, userId: uuid): Promise<UpdateResultDto> {
    await this._addToBookmarkValidation(id, userId);
    const bookmark: UserBookmarksEntity = await this._userBookmarkRepository.save({
      bookId: id,
      userId,
    });
    return { status: !!bookmark };
  }

  private _addToBookmarkValidation = async (bookId: uuid, userId: uuid): Promise<void> => {
    await this._bookRepository.getOneOrFail(bookId);
    if (await this._userBookmarkRepository.bookmarkExists(bookId, userId)) {
      throw new BadRequestException('You already bookmarked this book');
    }
  };
}
