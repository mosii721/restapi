import { Column, Entity,OneToOne,PrimaryGeneratedColumn, Relation } from "typeorm";
import { Admin } from '../../admins/entities/admin.entity';

export  enum Role{
    ADMIN='admin',
    USER='user',
    GUEST='guest',
}

@Entity()
export class Adminprofile {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
    phone_number:string;

    @Column({unique:true})
    email:string;

    @Column({type:'enum',enum:Role,default:Role.GUEST})
    role:Role;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt:Date;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt:Date;

    @OneToOne(() => Admin, (admin)  =>  admin.adminprofile)
    admin:Relation<Admin>
}
