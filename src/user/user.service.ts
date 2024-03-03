import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs'
import { response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { SocialLoginDto } from './dto/social-login.dto';

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
    const payload = { sub: user.id };

        return {
          'is_error': false,
          'message':'login successfull',
          'data':{
            ...user,
            access_token: await this.jwtService.signAsync(payload, {
              secret: process.env.SECRET_KEY,
              expiresIn: '24h',
            })
          }
       
        }
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

  async update(id:string, updateUserDto: UpdateUserDto) {
    const data = await this.prisma.user.update({
      where:{id},
      data: updateUserDto
    })
  }

  async socialLogin(socialLoginDto:SocialLoginDto){
    const user = await this.verify(socialLoginDto.token);
    if(!user){
      return {
        'is_error':true,
        'message':'Unauthorized',
        'data':{}
      }
    }

    // if the user's email already exists then give the accces token
    const isUserExists = await this.prisma.user.findFirst({where:{email:user['email']}})
    
    if (isUserExists){
      console.log('isUserExists');
      
      const payload = { sub: isUserExists['id'] };
      return {
        'is_error': false,
        'message':'login successfull',
        'data':{
          ...isUserExists,
          access_token: await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '24h',
          })
        }
      }

    } else {
      // if the user's email does not exists then create the user and give the access token
      const newUserData = new CreateUserDto()
      newUserData.email = user['email']
      newUserData.fullname = user['name']
      newUserData.password = await hash('password', 10)
      newUserData.username = user['given_name']

      const newUser = await this.prisma.user.create({
        data: newUserData
      })
      
      console.log(newUser);
      
      const payload = { sub: newUser['id'] };
      return {
        'is_error': false,
        'message':'login successfull',
        'data':{
          ...newUser,
          access_token: await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '24h',
          })
        }
      }
    }
  }

  async verify(token:string) {
    try {
      
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
    
      return payload

    } catch (error) {
      
      return false
    }
    
}
  // remove(id: string) {
  //   const data = await this.prisma.user.update{
  //     id:{id},

  //   }
  // }
}
