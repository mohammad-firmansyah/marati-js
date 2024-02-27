import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [UserModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
