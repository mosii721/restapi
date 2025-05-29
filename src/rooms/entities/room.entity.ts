import { Roombooking } from "src/roombookings/entities/roombooking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    room_number:number;

    @Column()
    seaters:number;

    @Column()
    fee:number;

    @Column()
    room_type:string;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt:Date;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt:Date;

    @OneToMany(()  => Roombooking, (roombooking)  =>  roombooking.rooms)
    roombooking: Roombooking[]
}
