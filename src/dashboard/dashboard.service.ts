import { Body, Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma : PrismaService
  ){}

  async create(createDashboardDto: CreateDashboardDto) {
    const newDashboard = await this.prisma.dashboard.create({
      data: {
        ...createDashboardDto
      },
    });
    return {
      'is_error':false,
      'message':'create dashboard success',
      'data':newDashboard
    }
  }

  async findAll() {
    const Dashboards = await this.prisma.dashboard.findMany();
    return {
      'is_error':false,
      'message':'get dashboards success',
      'data': Dashboards
    }
  }

  async findOne(id: string) {
    const Dashboard = await this.prisma.dashboard.findFirst({where: {id: id}});
    return {
      'is_error':false,
      'message':'get dashboard success',
      'data': Dashboard
    }
  }

  async update(id: string, updateDashboardDto: UpdateDashboardDto) {
    const Dashboard = await this.prisma.dashboard.update({
      where: {id},
      data : updateDashboardDto
    });

    return {
      'is_error':false,
      'message':'update dashboard success',
      'data': Dashboard
    }
  }

  async remove(id: string) {
    await this.prisma.dashboard.delete({where:{id:id}})
    return {
      'is_error':false,
      'message':'delete dashboard success',
      'data': {}
    }
  }
}
