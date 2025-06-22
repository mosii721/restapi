import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, UseGuards, Req, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators/public.decorator';
import { AtGuard, RtGuard } from './guards';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ForgetPasswordDto} from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

interface RequestWithUser extends Request {
  user: {
    sub: number; 
    email: string;
    refreshToken: string; 
  };
}

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @UseGuards(AtGuard)
  @Get('signout/:id')
  async signOut(@Param('id',ParseIntPipe) id: number) {
    return await this.authService.signOut(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  refreshTokens(@Query('id',ParseIntPipe)id:number,@Req() req: RequestWithUser) {
    const user = req.user;
    if(user.sub !== id){
      throw new UnauthorizedException('admin ID mismatch');
    }
    return this.authService.refreshTokens(id, user.refreshToken)
  }

  @Public()
  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  async forgetPasswordDto(@Body() forgetPasswordDto: ForgetPasswordDto){
    return await this.authService.forgetPassword(forgetPasswordDto.email);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetpassword(@Body() resetPasswordDto: ResetPasswordDto){
    const {token,newPassword} = resetPasswordDto;
    return await this.authService.resetPassword(token,newPassword)
  }

}
