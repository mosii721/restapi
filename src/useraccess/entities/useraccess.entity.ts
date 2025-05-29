import { User } from "src/users/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,Relation } from "typeorm";

@Entity()
export class Useraccess {
    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'int', default: 0 })
    login_count: number;

    @ManyToOne(()=>User,(user)  => user.useraccess)
    users:Relation<User>
}
