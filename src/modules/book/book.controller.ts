import { Body, Param, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { uuid } from 'libs/src/lib/common/uuid';
import { ApiCustomFile } from 'libs/src/lib/decorators/api-file.decorator';
import { AuthController } from 'libs/src/lib/decorators/auth-controller.decorator';
import { User } from 'libs/src/lib/decorators/user.decorator';
import { CreateBookDto } from 'libs/src/lib/dtos/book/create-book.dto';
import { UpdateBookDto } from 'libs/src/lib/dtos/book/update-book.dto';
import { UpdateResultDto } from 'libs/src/lib/dtos/update-result.dto';
import { UserAuth } from 'libs/src/lib/dtos/user-auth.dto';
import { BookEntity } from 'libs/src/lib/entities/book/book.entity';
import { SwaggerTagsEnum } from 'libs/src/lib/enums/swagger-tags.enum';
import { BookService } from './book.service';

@AuthController('book', SwaggerTagsEnum.Book)
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this._bookService.create(createBookDto);
  }

  @Put('upload-book-file/:id')
  @ApiCustomFile()
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: uuid,
    @User() user: UserAuth,
  ): Promise<UpdateResultDto> {
    return this._bookService.uploadBookFile(id, file, user);
  }

  @Put('upload-book-image/:id')
  @ApiCustomFile()
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: uuid,
    @User() user: UserAuth,
  ): Promise<UpdateResultDto> {
    return this._bookService.uploadBookImage(id, file, user);
  }

  @Put(':id')
  update(@Param('id') id: uuid, @Body() updateBookDto: UpdateBookDto): Promise<UpdateResultDto> {
    return this._bookService.update(id, updateBookDto);
  }

  @Patch('add/to/bookmark/:id')
  addToBookmark(@Param('id') id: uuid, @User() user: UserAuth): Promise<UpdateResultDto> {
    return this._bookService.addToBookmark(id, user.id);
  }
}
