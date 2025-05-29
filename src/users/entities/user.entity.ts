
import { Complaint } from "src/complaints/entities/complaint.entity";
import { Course } from "src/courses/entities/course.entity";
import { Registration } from "src/registrations/entities/registration.entity";
import { Useraccess } from "src/useraccess/entities/useraccess.entity";
import { Userfeedback } from "src/userfeedbacks/entities/userfeedback.entity";
import { Userprofile } from "src/userprofiles/entities/userprofile.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class User {
        @PrimaryGeneratedColumn()
        id:number;
        @Column()
        username:string;
        @Column()
        password:string;
        @Column('date')
        lastlogin:string;
        @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
        createdAt:Date;
        @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
        updatedAt:Date;

        @OneToOne(() => Userprofile, (userprofile)  =>  userprofile.user,{
                cascade:true,
                onDelete:'CASCADE',
        })
        @JoinColumn()
        userprofile:Relation<Userprofile>

        @OneToOne(() => Registration, (registration)  =>  registration.user)
        registration:Relation<Registration>

        @OneToMany(() => Userfeedback,(userfeedback) => userfeedback.users)
        userfeedback:Userfeedback[]

        @OneToMany(() => Complaint,(complaint) => complaint.users)
        complaint:Complaint[]

        @OneToMany(() => Useraccess,(useraccess) => useraccess.users)
        useraccess:Useraccess[]

}
