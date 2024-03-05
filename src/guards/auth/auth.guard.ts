import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { JwtPayload } from 'src/contracts/jwt-payload/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService : JwtService,
    private prismaService : PrismaService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      
      const request : Request = context.switchToHttp().getRequest();
      
      const token : string = request.headers['authorization'];
      
      if (!token) throw new UnauthorizedException()
      
      const payload : JwtPayload = await this.jwtService.verifyAsync(
        token,
        {secret:process.env.SECRET_KEY}
      )
      request.user = payload;

      return true
    } catch (err :unknown){
       throw new HttpException(
      {
        is_error: true,
        message: 'Unauthorized',
        data: {},
      },
      HttpStatus.UNAUTHORIZED,
    );
    }

  }
}
