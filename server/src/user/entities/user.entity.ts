import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    telephone: number;
}

export default User