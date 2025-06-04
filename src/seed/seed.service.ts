import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adminprofile } from 'src/adminprofiles/entities/adminprofile.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Registration } from 'src/registrations/entities/registration.entity';
import { Roombooking } from 'src/roombookings/entities/roombooking.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Useraccess } from 'src/useraccess/entities/useraccess.entity';
import { Userfeedback } from 'src/userfeedbacks/entities/userfeedback.entity';
import { Userprofile } from 'src/userprofiles/entities/userprofile.entity';
import { User } from 'src/users/entities/user.entity';
import { Admin, DataSource, Repository } from 'typeorm';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);
    constructor(@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        @InjectRepository(Adminprofile) private readonly adminProfileRepository: Repository<Adminprofile>,
        @InjectRepository(Complaint) private readonly complaintRepository: Repository<Complaint>,
        @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
        @InjectRepository(Registration) private readonly registrationRepository: Repository<Registration>,
        @InjectRepository(Roombooking) private readonly roomBookingRepository: Repository<Roombooking>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Useraccess) private readonly userAccessRepository: Repository<Useraccess>,
        @InjectRepository(Userfeedback) private readonly userFeedbackRepository: Repository<Userfeedback>,
        @InjectRepository(Userprofile) private readonly userProfileRepository: Repository<Userprofile>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly datasource:DataSource) {}


    async seed(){
        this.logger.log('Seeding database...');
        try {
            
            
        } catch (error) {
            this.logger.error('Error seeding database', error);
            throw error;
            
        }
    }
    }

