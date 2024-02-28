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


  async findAll(dashboardId : string) {
    const data = await this.prisma.component.findMany({where:{dashboard_id:dashboardId}}) 
    return {
      'is_error':false,
      'message':'get all data components',
      'data': data
    }
  }

  async findOne(id: string) {
    const data = await this.prisma.component.findFirst({where:{id:id}})
    return {
      'is_error':false,
      'message':'get detail component',
      'data':data
    }
  }

  async update(id: string, updateComponentDto: UpdateComponentDto) {
    const data = await this.prisma.component.update({
      where : {id},
      data:updateComponentDto
    }) 
    return {
      'is_error':false,
      'message':'data updated',
      'data': data
    };
  }

  remove(id: number) {
    return `This action removes a #${id} component`;
  }
}
