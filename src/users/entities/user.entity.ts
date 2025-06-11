
import { Profile } from "src/profiles/entities/profile.entity";
import { Complaint } from "src/complaints/entities/complaint.entity";
import { Registration } from "src/registrations/entities/registration.entity";
import { Useraccess } from "src/useraccess/entities/useraccess.entity";
import { Userfeedback } from "src/userfeedbacks/entities/userfeedback.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation, JoinColumn, OneToMany } from "typeorm";
import { Roombooking } from "src/roombookings/entities/roombooking.entity";

@Entity()
export class User {
        @PrimaryGeneratedColumn()
        id:number;
        @Column()
        username:string;
        @Column('date')
        lastlogin:string;
        @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
        createdAt:Date;
        @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
        updatedAt:Date;

        @OneToOne(() => Profile, (userprofile)  =>  userprofile.user,{
                cascade:true,
                onDelete:'CASCADE',
        })
        @JoinColumn()
        userprofile:Relation<Profile>

        @OneToOne(() => Registration, (registration)  =>  registration.user)
        registration:Relation<Registration>

        @OneToMany(() => Userfeedback,(userfeedback) => userfeedback.users)
        userfeedback:Userfeedback[]

        @OneToMany(() => Complaint,(complaint) => complaint.users)
        complaint:Complaint[]

        @OneToMany(() => Roombooking,(roombooking) => roombooking.users)
        roombooking:Roombooking[]

        @OneToMany(() => Useraccess,(useraccess) => useraccess.users)
        useraccess:Useraccess[]

}
