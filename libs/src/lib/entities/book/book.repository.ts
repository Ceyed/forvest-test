import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateBookDto } from '../../dtos/book/create-book.dto';
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
}
