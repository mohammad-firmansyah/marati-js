import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs'
import { response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }

    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.findByEmail(createUserDto.email);
    if (checkEmail) {
      throw new ConflictException('email already registered');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      },
    });

    const { password, ...user } = newUser;
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email);
    if (user) {
        const authenticated = await compare(loginDto.password, user.password)
        if(authenticated){

        const { password, ...result } = user;
        const payload = { sub: user.id };

        return {
          'is_error': false,
          'message':'login successfull',
          'data':{
            ...result,
            access_token: await this.jwtService.signAsync(payload, {
              secret: process.env.SECRET_KEY,
              expiresIn: '24h',
            })
          }
       
        }
      }

      throw new UnauthorizedException();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
