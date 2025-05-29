import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn,Check,ManyToOne,Relation } from "typeorm";

@Entity()
export class Userfeedback {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    feedack_text:string;

    @Column({ type: 'int', nullable: true })
    @Check(`"rating" >= 0 AND "rating" <= 5`)
    rating:number;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt:Date;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt:Date;

    @ManyToOne(()=>User,(user)  => user.userfeedback)
        users:Relation<User>
}
