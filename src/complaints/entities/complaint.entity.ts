import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,Relation } from "typeorm";

export  enum Status{
    PENDING='pending',
    RESOLVED='resolved',
}

@Entity()
export class Complaint  {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    complaint_text:string;

    @Column({type:'enum',enum:Status,default:Status.PENDING})
    status:Status;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt:Date;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt:Date;

    @ManyToOne(()=>User,(user)  => user.complaint)
        users:Relation<User>
}

    
