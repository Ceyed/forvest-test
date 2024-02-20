import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user/user.entity';

export class LoginDto extends PickType(UserEntity, ['mobile', 'password']) {}
