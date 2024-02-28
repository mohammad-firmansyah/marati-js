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
    return newDashboard
  }

  async findAll() {
    const Dashboards = await this.prisma.dashboard.findMany();
    return Dashboards;
  }

  async findOne(id: string) {
    const Dashboard = await this.prisma.dashboard.findFirst({where: {id: id}});
    return Dashboard;
  }

  async update(id: string, updateDashboardDto: UpdateDashboardDto) {
    const Dashboard = await this.prisma.dashboard.update({
      where: {id},
      data : updateDashboardDto
    });

    return Dashboard
  }

  async remove(id: string) {
    return await this.prisma.dashboard.delete({where:{id:id}})
  }
}
