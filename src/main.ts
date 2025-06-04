import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService =app.get(ConfigService);
  const PORT=configService.getOrThrow<number>('PORT')

  const config = new DocumentBuilder().setTitle('Hostel API')
    .setDescription('API for managing hostels')
    .setVersion('1.0')
    .addTag('admins')
    .build();

  const documentFactory = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api/docs', app, documentFactory,{
    jsonDocumentUrl: 'api/api-json',
    });
  await app.listen(PORT, ()  =>{
    console.log(`server is  running on http://localhost:${PORT}`);
  });
}
bootstrap();
