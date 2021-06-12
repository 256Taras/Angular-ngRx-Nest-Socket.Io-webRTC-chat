// @ts-ignore
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    nikname: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string

    @Column({nullable:true})
    avatar: string;

    @Column()
    phone: string;

    @Column({nullable:true})
    code: number;

}

export default User