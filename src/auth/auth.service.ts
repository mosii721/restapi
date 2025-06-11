import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import  * as  Bcrypt from 'bcrypt';
import  { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

}
