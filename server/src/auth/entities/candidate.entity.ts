import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
class Candidate {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phone!: string;

    @Column({nullable: true})
    code: number;
}

export default Candidate