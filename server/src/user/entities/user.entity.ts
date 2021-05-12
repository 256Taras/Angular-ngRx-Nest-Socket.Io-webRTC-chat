import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nikname: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string

    @Column()
    avatar: string;

    @Column()
    phone: number;
}

export default User