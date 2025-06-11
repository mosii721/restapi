import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
export class Admin {
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
        

        @OneToOne(() => Profile, (adminprofile)  =>  adminprofile.admin, {
                cascade:true,
                onDelete:'CASCADE',
        })
        @JoinColumn()
        adminprofile:Relation<Profile>
}
