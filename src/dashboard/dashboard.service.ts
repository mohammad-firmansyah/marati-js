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
    const Dashboards = await this.prisma.dashboard.findMany({where:{owner_id:createDashboardDto.owner_id}})

    return {
      'is_error':false,
      'message':'create dashboard success',
      'data':Dashboards
    }
  }

  async findAll(id:string) {
    const Dashboards = await this.prisma.dashboard.findMany({where:{owner_id : id}});
    return {
      'is_error':false,
      'message':'get dashboards success',
      'data': Dashboards
    }
  }

  async findOne(id: string) {
    const Dashboard = await this.prisma.dashboard.findMany({where: {id: id},include:{components:true}});
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

  async remove(id : string,owner_id : string) {
    const [_,Dashboards] = await this.prisma.$transaction([
      this.prisma.dashboard.delete({where:{id:id}}),
      this.prisma.dashboard.findMany({where:{owner_id:owner_id}})
    ])

    return {
      'is_error':false,
      'message':'delete dashboard success',
      'data': Dashboards
    }
  }
}
