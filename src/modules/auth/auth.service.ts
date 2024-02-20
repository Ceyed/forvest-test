import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'libs/src/lib/dtos/user/login.dto';
import { TokenDto } from 'libs/src/lib/dtos/user/token.dto';
import { UserEntity } from 'libs/src/lib/entities/user/user.entity';
import { UserRepository } from 'libs/src/lib/entities/user/user.repository';
import { SerializeMobile } from 'libs/src/lib/utils/serialize-mobile.utils';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenDto> {
    loginDto.mobile = SerializeMobile(loginDto.mobile);
    const user: UserEntity = await this._userRepository.getOneOrFailByMobile(loginDto.mobile);

    const passwordMatches: boolean = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatches) throw new ConflictException('Password is wrong');

    const payload = { id: user.id, firstName: user.firstName };
    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  }
}
