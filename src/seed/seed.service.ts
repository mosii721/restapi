import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Role } from 'src/profiles/entities/profile.entity';
import { Complaint, Status } from 'src/complaints/entities/complaint.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Registration } from 'src/registrations/entities/registration.entity';
import { Roombooking } from 'src/roombookings/entities/roombooking.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Useraccess } from 'src/useraccess/entities/useraccess.entity';
import { Userfeedback } from 'src/userfeedbacks/entities/userfeedback.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Admin } from 'src/admins/entities/admin.entity';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);
    constructor(@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
        @InjectRepository(Complaint) private readonly complaintRepository: Repository<Complaint>,
        @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
        @InjectRepository(Registration) private readonly registrationRepository: Repository<Registration>,
        @InjectRepository(Roombooking) private readonly roomBookingRepository: Repository<Roombooking>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Useraccess) private readonly userAccessRepository: Repository<Useraccess>,
        @InjectRepository(Userfeedback) private readonly userFeedbackRepository: Repository<Userfeedback>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly datasource:DataSource) {}

    private async hashData(data:string):Promise<string>{
        const salt = await Bcrypt.genSalt(10);
        return Bcrypt.hash(data,salt)
      }

    async seed(){
        this.logger.log('Seeding database...');
            try {
      // Seed Admins and AdminProfiles
      for (let i = 0; i < 5; i++) {
        const adminProfile = this.profileRepository.create({
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          phone_number: faker.phone.number(),
          email: faker.internet.email(),
          password: await this.hashData(faker.internet.password()),
          role: Role.ADMIN,
        });
        const savedAdminProfile = await this.profileRepository.save(adminProfile);

        const admin = this.adminRepository.create({
          username: faker.internet.userName(),
          lastlogin: faker.date.recent().toISOString().split('T')[0],
          adminprofile: savedAdminProfile,
        });
        await this.adminRepository.save(admin);
      }

      
      const users: User[] = [];
      for (let i = 0; i < 20; i++) {
      const userProfile = this.profileRepository.create({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        password: await this.hashData(faker.internet.password()),
        role: Role.USER,
      });
      const savedUserProfile = await this.profileRepository.save(userProfile);

      const user = this.userRepository.create({
        username: faker.internet.userName(),
        lastlogin: faker.date.recent().toISOString().split('T')[0],
        userprofile: savedUserProfile, 
      });
      const savedUser = await this.userRepository.save(user);
      users.push(savedUser);
    
      }

      // Seed Courses
      const courses: Course[] = [];
      for (let i = 0; i < 5; i++) {
        const course = this.courseRepository.create({
          course_name: faker.lorem.words(2),
          course_duration: `${faker.number.int({ min: 1, max: 12 })} months`,
          course_fee: faker.number.int({ min: 1000, max: 5000 }),
        });
        const savedCourse = await this.courseRepository.save(course);
        courses.push(savedCourse);
      }

      // Seed Registrations
      for (const user of users) {
        const registration = this.registrationRepository.create({
          room_id: faker.number.int({ min: 1, max: 100 }),
          registration_date: faker.date.recent().toISOString().split('T')[0],
          user: user,
          courses: faker.helpers.arrayElement(courses),
        });
        await this.registrationRepository.save(registration);
      }

      // Seed Rooms
      const rooms: Room[] = [];
      for (let i = 0; i < 10; i++) {
        const room = this.roomRepository.create({
          room_number: faker.number.int({ min: 100, max: 999 }),
          seaters: faker.number.int({ min: 1, max: 4 }),
          fee: faker.number.int({ min: 500, max: 2000 }),
          room_type: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
        });
        const savedRoom = await this.roomRepository.save(room);
        rooms.push(savedRoom);
      }

      // Seed RoomBookings
      for (const user of users) {
        const roomBooking = this.roomBookingRepository.create({
          users:user,
          booking_date: faker.date.recent(),
          rooms: faker.helpers.arrayElement(rooms),
        });
        await this.roomBookingRepository.save(roomBooking);
      }

      // Seed UserAccess
      for (const user of users) {
        const userAccess = this.userAccessRepository.create({
          login_count: faker.number.int({ min: 0, max: 100 }),
          users: user,
        });
        await this.userAccessRepository.save(userAccess);
      }

      // Seed Complaints
      for (const user of users) {
        const complaint = this.complaintRepository.create({
          complaint_text: faker.lorem.sentence(),
          status: Status.PENDING,
          users: user,
        });
        await this.complaintRepository.save(complaint);
      }

      // Seed UserFeedback
      for (const user of users) {
        const userFeedback = this.userFeedbackRepository.create({
          feedack_text: faker.lorem.sentence(),
          rating: faker.number.int({ min: 0, max: 5 }),
          users: user,
        });
        await this.userFeedbackRepository.save(userFeedback);
    }

    this.logger.log('Database seeding completed successfully');

        } catch (error) {
            this.logger.error('Error seeding database', error);
            throw error;
            
        }
    }
}


