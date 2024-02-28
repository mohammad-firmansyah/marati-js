import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComponentService {

  constructor(
    private prisma : PrismaService
  ){}

  async create(createComponentDto: CreateComponentDto) {
    return this.prisma.component.create({
      data:{
        ...createComponentDto
      }
    });
}


  findAll() {
    return `This action returns all component`;
  }

  findOne(id: number) {
    return `This action returns a #${id} component`;
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return `This action updates a #${id} component`;
  }

  remove(id: number) {
    return `This action removes a #${id} component`;
  }
}
