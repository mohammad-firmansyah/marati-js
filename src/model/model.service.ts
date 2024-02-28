import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModelService {
  constructor(
    private prisma : PrismaService
  ){}

  async create(createModelDto: CreateModelDto) {
    const data = await this.prisma.model.create({
      data: {
        ...createModelDto
      }
    });

    return {
      'is_error':false,
      'message':'data created',
      'data':data
    };
  }

  async findAll() {
    const data = await this.prisma.model.findMany()
    return {
      'is_error':false,
      'message':'get all models',
      'data':data
    }
  }
  
  async findAllByUser(owner_id:string) {
    const data = await this.prisma.model.findMany({where:{owner_id: owner_id}})
    return {
      'is_error':false,
      'message':'get all user\'s models',
      'data':data
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} model`;
  }

  update(id: number, updateModelDto: UpdateModelDto) {
    return `This action updates a #${id} model`;
  }

  remove(id: number) {
    return `This action removes a #${id} model`;
  }
}
