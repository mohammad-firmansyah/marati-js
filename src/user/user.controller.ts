import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Req } from '@nestjs/common';
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

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  
  @Get()
  checkToken() {
    return {}
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
