import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComponentService } from './component.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('component')
@ApiTags('Component')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentService.create(createComponentDto);
  }

  @Get()
  findAll(@Param('id') id : string) {
    return this.componentService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentDto: UpdateComponentDto) {
    return this.componentService.update(id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentService.remove(id);
  }
}
