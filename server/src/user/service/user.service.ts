import {HttpException, Injectable} from '@nestjs/common';
import {UserInterface} from "../../shared/interface/user.interface";
import {InjectRepository} from "@nestjs/typeorm";
import User from "../entities/user.entity";
import {Repository} from "typeorm";
import {from, Observable, throwError} from 'rxjs';
import {catchError, map, switchMap} from "rxjs/operators";
import {FileService} from "../../file/service/file.service";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,

    ) {}

    public create(candidate: UserInterface): Observable<User> {

        return this.findByNikname(candidate.nikname).pipe(
            switchMap((userExist) => {
                if (userExist) {
                    throw new HttpException(`user with nik name:${candidate.nikname} already exist`, 409)
                }

                return from(this.userRepository.save(candidate)).pipe(
                    map((user)=>{
                        console.log(user)
                        return user
                    })
                )
            }), catchError(err => throwError(err))
        )
    }

    public findByNikname(nikname: string): Observable<User> {
        return from(this.userRepository.findOne({nikname})).pipe(
            map((user) => {
                return user
            })
        )
    }
    public findByPhone(phone: string ): Observable<User> {
        const user = this.userRepository
          .createQueryBuilder('user')
          .where("user.phone = :phone" ,{phone})
          .getOne()
        return from(user).pipe(
            map((user) => {

                return user
            })
        )
    }


    public findAll(): Observable<User[]> {
        return from(this.userRepository.find())
    }

    public findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({id}))
    }


    public update(id: number, updateUserDto: UserInterface) {
        const updateUser = this.userRepository
          .createQueryBuilder('user')
          .update(User)
          .set({code:updateUserDto.code})
          .where("id = :id", { id })
          .execute();
    }

    public updateAvatar(id: number, updateUserDto: UserInterface) {
        return ''
    }

    public remove(id: number) {
        return from(this.userRepository.findOne({id}))
    }
}
