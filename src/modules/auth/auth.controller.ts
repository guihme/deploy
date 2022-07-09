import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthBodyOptions } from "./auth.schema";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    
    @UseGuards(AuthGuard('local'))
    @ApiBody(AuthBodyOptions)
    @Post('login')
    async login(@Request() req){
        return req.user;
    }
}