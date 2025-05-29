import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Adminprofile } from '../../adminprofiles/entities/adminprofile.entity';

@Entity()
export class Admin {
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

        @OneToOne(() => Adminprofile, (adminprofile)  =>  adminprofile.admin, {
                cascade:true,
                onDelete:'CASCADE',
        })
        @JoinColumn()
        adminprofile:Relation<Adminprofile>
}
