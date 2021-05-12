import {Injectable} from '@nestjs/common';
import {UserInterface} from "../../shared/interface/user.interface";
import {from, Observable, of} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../../user/service/user.service";
import {map, switchMap} from "rxjs/operators";
import User from "../../user/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {
    }


    public generateJWT(user: UserInterface): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }


    public singUp(candidate: UserInterface): Observable<{ jwt: string; user: User; }> {
        return this.userService.create(candidate).pipe(
            switchMap((user: User) => {
                return this.generateJWT(user).pipe(
                    map((jwt: string) => {
                        return {jwt, user}
                    })
                )
            })
        )
    }
}
