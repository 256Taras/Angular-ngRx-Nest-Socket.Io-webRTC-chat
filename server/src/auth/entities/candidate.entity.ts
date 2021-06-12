import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
class Candidate {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phone!: string;

    @Column({nullable: true})
    code: number;

    @Column({default:false})
    isApproved: boolean;
}

export default Candidate