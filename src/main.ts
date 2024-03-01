import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle("Marati Js Server")
  .setDescription("The marati backend server")
  .setVersion('1.0')
  .addBearerAuth({ in: 'header', type: 'apiKey', name: 'authorization' })
  .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('docs',app,document)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
