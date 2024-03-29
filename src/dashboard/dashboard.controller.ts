import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('dashboard')
@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get(':owner_id')
  findAll(@Param('owner_id') owner_id:string) {
    return this.dashboardService.findAll(owner_id);
  }

  @Get(':id/detail')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(id, updateDashboardDto);
  }

  @Delete(':id/:ownerId')
  remove(@Param('id') id: string,@Param('ownerId') owner_id:string) {
    return this.dashboardService.remove(id,owner_id);
  }
}
