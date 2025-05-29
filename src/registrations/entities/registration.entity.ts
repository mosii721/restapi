import { Course } from "src/courses/entities/course.entity";
import { User } from "src/users/entities/user.entity";
import {Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation, JoinColumn,ManyToOne} from "typeorm";

@Entity()
export class Registration {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    room_id:number;

    @Column('date')
    registration_date:string;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt:Date;
    
    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt:Date;

    @OneToOne(() => User, (user)  =>  user.registration,{
        cascade:true,
        onDelete:'CASCADE',
    })
    @JoinColumn()
    user:Relation<User>

    @ManyToOne(()=>Course,(course)  => course.registration)
    courses:Relation<Course>
    }
    
