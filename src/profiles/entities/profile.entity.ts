import { Column, Entity,OneToOne,PrimaryGeneratedColumn, Relation } from "typeorm";
import { Admin } from '../../admins/entities/admin.entity';
import { User } from "src/users/entities/user.entity";

export  enum Role{
    ADMIN='admin',
    USER='user',
    GUEST='guest',
}

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
    phone_number:string;

    @Column()
    password: string;

    @Column({type:'text', nullable:true,default:null})
        hashedRefreshToken:string | null;      

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

    @OneToOne(() => User, (user)  =>  user.userprofile)
    user:Relation<User>
    }

