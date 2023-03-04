import { Body, Controller, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto
    /*@Body('email') email: string, @Body('password', ParseIntPipe) password: string*/) {
        // console.log({
        //     dto: dto // dto, also works (the same thing)
        //     // email,
        //     // typeOfEmail: typeof email,
        //     // password,
        //     // typeOfPassword: typeof password
            
        // })

        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}