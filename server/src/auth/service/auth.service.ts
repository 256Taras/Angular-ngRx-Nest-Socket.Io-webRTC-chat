import {HttpException, Inject, Injectable} from '@nestjs/common';
import {UserInterface} from "../../shared/interface/user.interface";
import {from, iif, Observable, of, pipe, throwError} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../../user/service/user.service";
import {catchError, concatMap, map, switchMap, tap} from "rxjs/operators";
import User from "../../user/entities/user.entity";
import {Repository} from "typeorm";
import Candidate from "../entities/candidate.entity";
import {InjectRepository} from "@nestjs/typeorm";
import Twilio from "twilio/lib/rest/Twilio";
import {CandidateInterface} from "../entities/candidate.interface.";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        @Inject("SMS") private readonly twilioService: Twilio,
        @InjectRepository(Candidate) private readonly candidateRepository: Repository<Candidate>
    ) {
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

    public sendSMStoPhone2(phone: string): Observable<any> {
        const code = this._generateCode();
        return this._findByPhone(phone).pipe(
            concatMap((candidate) => {
                if (!candidate) {
                    return this._createCandidate(phone, code)
                }
                return this._updateCandidate(candidate.id, phone, code)
            }),
            switchMap(({phone, code}: Candidate) => {
                return this._twilioParams(phone, code)
            }),
            catchError(err => throwError(err))
        )

    }


    public chekCode(phone: string, codeForChek: number) {
        const eMessage = `Невірний код!`
        return this._findByPhone(phone).pipe(
            switchMap(({code, phone}:CandidateInterface) => {
                if ( code === codeForChek) {
                    return of({confirmed: true})
                }
                return this._error(eMessage, 400)
            }),
            catchError(err => throwError(err))
        )
    }

    //------------------------------------------------------

    private _twilioParams(phone: string, code: number | unknown) {
        const twilioNumber = process.env.TWILIO_NUMBER
        return from(this.twilioService.messages.create({
                from: twilioNumber,
                to: phone,
                body: `Ваш код підтвердження ${code}`,
            })
        ).pipe(
            map((res) => {
                if (!res.errorCode && !res.errorMessage) {
                    return {smsEndowed: true}
                }
            })
        )
    }

    private _generateCode(): number {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private _updateCandidate(id: number, phone: string, code: number): Observable<Candidate> {
        return from(this.candidateRepository.update(id, {phone, code})).pipe(
            switchMap(() => this._findByPhone(phone))
        )
    }

    private _findByPhone(phone: string): Observable<Candidate | undefined> {
        return from(this.candidateRepository.findOne({phone}))
    }

    private _createCandidate(phone: string, code: number): Observable<Candidate> {
        return from(this.candidateRepository.save({phone, code}))
    }

    private generateJWT(user: UserInterface): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }

    private _error(errorMessage: string, statusCode: number) {
        return throwError(new HttpException(errorMessage, statusCode))
    }

}
