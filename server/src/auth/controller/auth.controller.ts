import {Body, Controller, HttpException, Post, Req} from '@nestjs/common';
import {AuthService} from "../service/auth.service";
import {UserInterface} from "../../shared/interface/user.interface";
import {Observable} from 'rxjs';
import User from "../../user/entities/user.entity";
import {map} from "rxjs/operators";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('sing-in')
    private singIp(user: UserInterface): Observable<UserInterface> | any {
        return
    }

    @Post('sing-up')
    public singUp(@Body() candidate: UserInterface): Observable<{ jwt: string, user: User }> {
        return this.authService.singUp(candidate)
    }
}
