import {Body, Controller, HttpException, Post, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AuthService} from "../service/auth.service";
import {UserInterface} from "../../shared/interface/user.interface";
import {Observable} from 'rxjs';
import User from "../../user/entities/user.entity";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('sing-in')
    private singIp(user: UserInterface): Observable<UserInterface> | any {
        return
    }

    @Post('sing-up')
    @UseInterceptors(FileInterceptor('avatar'))
    private singUp(@UploadedFile() avatar: Express.Multer.File,@Body() candidate: UserInterface): Observable<{ jwt: string, user: User }> | any{
        return this.authService.singUp(candidate,avatar)
    }

    @Post('send-sms')
    private createCandidate(@Body() data: { phone: string }): Observable<{smsEndowed: true}> {

        return this.authService.sendSMStoPhone2(data.phone)
    }

    @Post('check-code')
    private checkCode(@Body() candidate: { code: number, phone: string }): Observable<{ confirmed: boolean }> {

        return this.authService.chekCode(candidate.phone, Number(candidate.code))
    }
}


