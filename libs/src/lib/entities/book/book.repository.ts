import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { uuid } from '../../common/uuid';
import { CreateBookDto } from '../../dtos/book/create-book.dto';
import { UpdateBookDto } from '../../dtos/book/update-book.dto';
import { UpdateResultDto } from '../../dtos/update-result.dto';
import { BookEntity } from './book.entity';

@Injectable()
export class BookRepository extends Repository<BookEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(BookEntity, _dataSource.createEntityManager());
  }

  getAll(): Promise<BookEntity[]> {
    return this.find();
  }

  add(createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.save(createBookDto);
  }

  async edit(id: uuid, updateBookDto: UpdateBookDto): Promise<UpdateResultDto> {
    const updateResult: UpdateResult = await this.update(id, updateBookDto);
    return { status: !!updateResult.affected };
  }
}
