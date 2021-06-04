import {HttpException, Inject, Injectable} from '@nestjs/common';
import {from, Observable, of, throwError} from "rxjs";
import {catchError, concatMap, map, switchMap} from "rxjs/operators";
import {InjectRepository} from "@nestjs/typeorm";
import Twilio from "twilio/lib/rest/Twilio";
import {JwtService} from "@nestjs/jwt";
import {Repository} from "typeorm";

import {UserInterface} from "../../shared/interface/user.interface";
import {UserService} from "../../user/service/user.service";
import User from "../../user/entities/user.entity";
import Candidate from "../entities/candidate.entity";


import {FileService} from 'src/file/service/file.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly fileService: FileService,
        @Inject("SMS") private readonly twilioService: Twilio,
        @InjectRepository(Candidate) private readonly candidateRepository: Repository<Candidate>
    ) {
    }

    public singUp(candidate: UserInterface, photo: any): Observable<{ jwt: string; user: User; }> {
        const registerUser = from(this.fileService.uploadUserAvatar(photo, candidate.phone)).pipe(
            switchMap((avatar) => {
                return this.userService.create({...candidate, ...avatar}).pipe(
                    switchMap((user: User) => {
                        return this.generateJWT(user).pipe(
                            map((jwt: string) => {
                                return {jwt, user}
                            })
                        )
                    })
                )
            })
        )


        return this._findByCandidatePhone(candidate.phone).pipe(
            switchMap((candidate: Candidate | undefined) => {
                if (!candidate || !candidate.isApproved) {
                    return this._error('Номер телефону не підтверджено!', 409)
                }
                return registerUser
            })
        )


    }


    public sendSMStoPhone2(phone: string): Observable<any> {
        // const code = this._generateCode();
        const code = 1111;

        return this._findByUserPhone(phone).pipe(
            concatMap((user) => {
                if (!user) {
                    return this._createCandidate(phone, code)
                }
                if (user) {
                    return this._error('Телефон уже зареєстрований', 409)
                }
            }),
            switchMap(({phone, code}: Candidate) => {
                return this._twilioParams(phone, code)
            }),
            catchError(err => throwError(err))
        )

    }


    public chekCode(phone: string, codeForChek: number): Observable<{ confirmed: boolean }> {

        return this._findByCandidatePhone(phone).pipe(
            concatMap(({code, phone, id}: Candidate) => {
                if (code !== codeForChek) {
                    return this._error(this.eMessage, 400)
                }
                return from(this.candidateRepository.update(id, {isApproved: true})).pipe(
                    map((value) => {
                        return {confirmed: true}
                    })
                )

            })
        )
    }

    public chekUserCode(code: number, phone: string): Observable<{ jwt: string; user: User; }> {
        return this._findByUserPhone(phone).pipe(
            switchMap((user: User) => {
                if (user.code !== code) {
                    return this._error(this.eMessage, 400)
                }
                return this.generateJWT(user).pipe(
                    map((jwt: string) => {
                        return {jwt, user}
                    })
                )
            })
        )
    }

    public sendSmsToUserPhone(phone: string): Observable<{ smsEndowed: boolean }> {
        // const code = this._generateCode();
        const code = 1111;
        return this._findByUserPhone(phone).pipe(
            concatMap((user) => {
                if (!user) {
                    return this._error('Цей телефон не зареєстрований!', 400);
                }
                if (user) {
                    return this._twilioParams(phone, code).pipe(
                        map(({smsEndowed}) => {
                          if (smsEndowed){
                              this.userService.update(user.id, {code});
                            return {smsEndowed:true};
                          }
                        })
                    )
                }
            }),
            catchError(err => throwError(err))
        )
    }


    /*

         const eMessage = `Невірний код!`
        return this._findByCandidatePhone(phone).pipe(
            switchMap(({code, phone}: CandidateInterface) => {
                if (code === codeForChek) {
                    return of({confirmed: true})
                }
                return this._error(eMessage, 400)
            }),
            catchError(err => throwError(err))
        )

     */


    //------------------------------------------------------

    private eMessage: string = `Невірний код!`;

    private _twilioParams(phone: string, code: number | unknown) {
        const twilioNumber = process.env.TWILIO_NUMBER
        /*  return from(this.twilioService.messages.create({
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

         */

        return of({smsEndowed: true});
    }

    private _generateCode(): number {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private _updateCandidate(id: number, phone: string, code: number): Observable<Candidate> {
        return from(this.candidateRepository.update(id, {phone, code})).pipe(
            switchMap(() => this._findByCandidatePhone(phone))
        )
    }

    private _findByCandidatePhone(phone: string): Observable<Candidate | undefined> {
        return from(this.candidateRepository.findOne({phone}));
    }

    private _findByUserPhone(phone: string): Observable<User | undefined> {
        return this.userService.findByPhone(phone);
    }

    private _createCandidate(phone: string, code: number): Observable<Candidate> {
        return from(this.candidateRepository.save({phone, code}));
    }

    private generateJWT(user: UserInterface): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }

    private _error(errorMessage: string, statusCode: number) {
        return throwError(new HttpException(errorMessage, statusCode));
    }


}
