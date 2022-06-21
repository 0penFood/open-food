import { Controller, Get, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from "./dto/auth.dto";
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //@UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('user')
    getProfile(@Headers() req) {
        console.log(req);
    }
}