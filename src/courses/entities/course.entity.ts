import { Registration } from "src/registrations/entities/registration.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    course_name:string;

    @Column()
    course_duration:string;

    @Column()
    course_fee:number;

    @OneToMany(() => Registration, (registration)  =>  registration.courses)
    registration:Registration[]
}
