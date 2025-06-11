import { Room } from "src/rooms/entities/room.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Roombooking {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    booking_date:Date;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt:Date;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt:Date;

    @ManyToOne(()=>Room,(room)  => room.roombooking)
    rooms:Relation<Room>

    @ManyToOne(()=>User,(user)  => user.userfeedback)
    users:Relation<User>
}
