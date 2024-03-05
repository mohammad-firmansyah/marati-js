import { Controller,Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SocialLoginDto } from './dto/social-login.dto';
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  register(@Body() body:CreateUserDto){
    return this.userService.create(body);
  }
  
  @Post("login")
  login(@Body() body:LoginDto){
    return this.userService.login(body);
  }
  
  @Post("social-login")
  socialLogin(@Body() body:SocialLoginDto){
    return this.userService.socialLogin(body);
  }

  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  
 
}
