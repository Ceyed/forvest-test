import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { uuid } from 'libs/src/lib/common/uuid';
import { CreateBookDto } from 'libs/src/lib/dtos/book/create-book.dto';
import { UpdateBookDto } from 'libs/src/lib/dtos/book/update-book.dto';
import { UpdateResultDto } from 'libs/src/lib/dtos/update-result.dto';
import { UserAuth } from 'libs/src/lib/dtos/user-auth.dto';
import { BookEntity } from 'libs/src/lib/entities/book/book.entity';
import { BookRepository } from 'libs/src/lib/entities/book/book.repository';
import { FileEntity } from 'libs/src/lib/entities/file/file.entity';
import { FileRepository } from 'libs/src/lib/entities/file/file.repository';
import { UserBookmarksEntity } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.entity';
import { UserBookmarkRepository } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.repository';
import { FileTypeEnum } from 'libs/src/lib/enums/file-type.enum';
import { UpdateResult } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    private readonly _bookRepository: BookRepository,
    private readonly _userBookmarkRepository: UserBookmarkRepository,
    private readonly _fileRepository: FileRepository,
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

  async uploadBook(id: uuid, file: Express.Multer.File, user: UserAuth): Promise<UpdateResultDto> {
    if (!file) throw new NotFoundException('File not founded');
    const fileEntity: FileEntity = await this._fileRepository.upload(
      file,
      user.id,
      FileTypeEnum.Book,
    );
    if (fileEntity) {
      const updateBookResult: UpdateResult = await this._bookRepository.update(id, {
        fileId: fileEntity.id,
        downloadUrl: fileEntity.fileUrl,
      });
      return { status: !!updateBookResult.affected };
    }
    return { status: false };
  }

  private _addToBookmarkValidation = async (bookId: uuid, userId: uuid): Promise<void> => {
    await this._bookRepository.getOneOrFail(bookId);
    if (await this._userBookmarkRepository.bookmarkExists(bookId, userId)) {
      throw new BadRequestException('You already bookmarked this book');
    }
  };
}
