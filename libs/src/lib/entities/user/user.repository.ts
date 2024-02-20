import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { uuid } from '../../common/uuid';
import { CreateUserDto } from '../../dtos/users/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }

  add(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.save(createUserDto);
  }

  getOne(conditions: Partial<Record<keyof UserEntity, any>>): Promise<UserEntity> {
    return this.findOneBy(conditions);
  }

  async getOneOrFail(id: uuid): Promise<UserEntity> {
    const user: UserEntity = await this.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException('User not founded');
    return user;
  }

  async getOneOrFailByMobile(mobile: string): Promise<UserEntity> {
    const user: UserEntity = await this.findOne({ where: { mobile } });
    if (!user) throw new NotFoundException('User not founded');
    return user;
  }
}
