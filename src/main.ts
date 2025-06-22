import { HttpAdapterHost,NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './http-exception.filter';
import helmet from 'helmet';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());// Enabled for secure headers
  app.enableCors({
    origin:'*',// accept request from any domains origin : 'deployedapp.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept,Authorization,X-Requested-with',
    credentials:true,
  });

  
  app.setGlobalPrefix('api/v1')//api versioning

  app.useGlobalPipes(new ValidationPipe());

  const configService =app.get(ConfigService);
  const PORT=configService.getOrThrow<number>('PORT');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder().setTitle('Hostel API')
    .setDescription('This is an API for managing hostels,')
    .setVersion('1.0')
    .addTag('auth','Authentication Endpoints')
    .addTag('admins','Admin Managment Endpoints')
    .addTag('complaints','Complaint Managment Endpoints')
    .addTag('courses','Course Managment Endpoints')
    .addTag('profiles','Profile Managment Endpoints')
    .addTag('registrations','Registration Managment Endpoints')
    .addTag('roombookings','Roombooking Managment Endpoints')
    .addTag('rooms','Room Managment Endpoints')
    .addTag('seed','Seed Endpoint')
    .addTag('useraccess','Useraccess Managment Endpoints')
    .addTag('userfeedbacks','Userfeedback Managment Endpoints')
    .addTag('users','User Managment Endpoints')
    .addBearerAuth()
    // .addServer('http://localhost:8000/','Local Development Server')
    // .addServer('http://api.hostel.com/','Production Server')
    .build();

  const documentFactory = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api/docs', app, documentFactory,{
    jsonDocumentUrl: 'api/api-json',
    swaggerOptions:{
      persistAuthorization: true,
      tagsSorter: 'alpha', // sort tags alphabetically
      operationsSorter: 'alpha',
      docExpansion: 'none', // collapse all sections 
      filter:true,
    },
    customCss:`
    .swagger-ui .topbar { display:none; }
    `,
    customSiteTitle: 'Documentacion de la API del Hostel'
    });
  await app.listen(PORT, ()  =>{
    console.log(`server is  running on http://localhost:${PORT}`);
  });
  
}
bootstrap();
