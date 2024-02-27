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
    const Dashboards = await this.prisma.dashboard.findMany()
    return Dashboards;
  }

  async findOne(id: string) {
    const Dashboard = await this.prisma.dashboard.findUnique({where: {id: id}})
    return Dashboard
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
