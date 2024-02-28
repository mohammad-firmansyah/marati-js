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
    })

    return {
      'is_error':false,
      'message':'data created',
      'data':data
    }
  }

  findAll() {
    return `This action returns all model`;
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
