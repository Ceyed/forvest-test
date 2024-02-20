import { Body, Param, Post, Put } from '@nestjs/common';
import { uuid } from 'libs/src/lib/common/uuid';
import { AuthController } from 'libs/src/lib/decorators/auth-controller.decorator';
import { CreateBookDto } from 'libs/src/lib/dtos/book/create-book.dto';
import { UpdateBookDto } from 'libs/src/lib/dtos/book/update-book.dto';
import { UpdateResultDto } from 'libs/src/lib/dtos/update-result.dto';
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

  @Put(':id')
  update(@Param('id') id: uuid, @Body() updateBookDto: UpdateBookDto): Promise<UpdateResultDto> {
    return this._bookService.update(id, updateBookDto);
  }
}
