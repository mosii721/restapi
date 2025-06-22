import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import  * as  Bcrypt from 'bcrypt';
import  { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';



export interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}
@Injectable()
export class AuthService {
    constructor(@InjectRepository(Profile) private profileRepository:Repository<Profile>,
    private jwtService:JwtService,
    private configService:ConfigService){}
  
  private async getTokens(userId:number,email:string,role:string){
    const [at,rt] = await Promise.all([
      this.jwtService.signAsync({sub:userId,email:email,role:role,},{
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET'
        ),
        expiresIn: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_EXPIRES_IN'
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role:role,
        },
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_SECRET',
          ),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRES_IN',
          ), 
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };  
  }

  private async hashData(data:string):Promise<string>{
        const salt = await Bcrypt.genSalt(10);
        return Bcrypt.hash(data,salt)
      }

  //updates the refresh token in the database
  private async saveRefreshToken(userId:number, refreshToken:string){
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.profileRepository.update(userId, {
      hashedRefreshToken: hashedRefreshToken,
    })
  }

  

  async forgetPassword(email:string){
    const foundUser =  await this.profileRepository.findOne({
      where:{email},
    })
    if(!foundUser){
      throw new NotFoundException(`User with email ${email} not found`)
    }
    const resetToken = await this.jwtService.signAsync(
      {
          sub: foundUser.id,
          email: email,
        },
        {
          secret: this.configService.getOrThrow<string>('RESET_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow<string>('RESET_TOKEN_EXPIRES_IN')
        },
    )
    await this.sendResetPasswordEmail(email,resetToken);
    return resetToken;
  }

  private async sendResetPasswordEmail(email:string,token:string){
    const transport = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:this.configService.getOrThrow<string>('SMTP_USER'),
        pass:this.configService.getOrThrow<string>('SMTP_PASS'),
      },
      port: 587,
      secure: false,
    })

    const content = `
                      <p>To reset your password,please use this reset token${token}</P>
                      <p><strong>${token}</strong></p>
                    `

    try {
      await transport.sendMail({
        from:`${this.configService.getOrThrow<string>('SMTP_USER')}`,
        to:email,
        subject:'Password Reset',
        html:content,
      })
      console.log(`Email sent to ${email}`)
    } catch (error) {
      console.error('Error sending email',error)
      throw new Error('Error sending email')
    }
  }

  async signIn(createAuthDto: CreateAuthDto) {
    const foundUser = await this.profileRepository.findOne({
      where:{email:createAuthDto.email},
      select:['id','email','password','role']
    })
    if(!foundUser){
      throw new NotFoundException(`User with  email ${createAuthDto.email}Not Found `)
    };
    const foundPassword = await Bcrypt.compare(
      createAuthDto.password,
      foundUser.password)

      if (!foundPassword){
        throw new NotFoundException(` wrong credentials`);

      }
      const {accessToken,refreshToken}=await  this.getTokens(
        foundUser.id,
        foundUser.email,
        foundUser.role,
      )

      await this.saveRefreshToken(foundUser.id,refreshToken )

      return {accessToken,refreshToken}
    
  }

  async signOut(userId:number) {
    const foundUser = await this.profileRepository.findOne({
      where:{id:userId},
      select:['id','email','hashedRefreshToken'],
    })

    if (!foundUser ) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    await this.profileRepository.update(userId,{
      hashedRefreshToken:null,
    });
    
    return {message: 'User signed out successfully' };
    
}

async refreshTokens(id:number, refreshToken:string) {
    const foundUser  = await this.profileRepository.findOne({
      where:{id},
      select:['id','email','hashedRefreshToken','role'],
    })
    if (!foundUser ) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (!foundUser .hashedRefreshToken) {
      throw new NotFoundException(`User with id ${id} does not have a refresh token`);
    }

    const isRefreshTokenValid = await Bcrypt.compare(
      refreshToken,
      foundUser .hashedRefreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new NotFoundException(`Invalid refresh token`);
    };

    // Generate new access and refresh tokens
    const {accessToken,refreshToken:newRefreshToken}=await this.getTokens(
      foundUser .id,
      foundUser .email,
      foundUser .role,
    );
    
    await this.saveRefreshToken(foundUser .id,newRefreshToken);
    return {accessToken,refreshToken:newRefreshToken};
}

async resetPassword(token:string, newPassword:string){
let payload: JwtPayload;
try{
  payload= await this.jwtService.verifyAsync<JwtPayload>(token,{
    secret: this.configService.getOrThrow<string>('RESET_TOKEN_SECRET'),
  })
}catch{
  throw new BadRequestException('Invalid token');
}

const founduser =await this.profileRepository.findOne({
  where:{id:payload.sub},
  select:['id','email'],
});
if(!founduser){
  throw new NotFoundException(`User not found`);
}
const hashedPassword = await Bcrypt.hash(newPassword,10);
founduser.password = hashedPassword;

await this.profileRepository.save(founduser);
}

}
