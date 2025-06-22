import { Injectable } from '@nestjs/common';
import { existsSync, promises as fspromises } from 'fs';
import * as path  from 'path';

//create logs in a folder called appslogs outside the src
@Injectable()
export class LogsService {

    async  logToFile(entry:string,ip?:string){

        const formattedEntry = `
        ${Intl.DateTimeFormat('en-US', {
            dateStyle:  'short',
            timeStyle:  'medium',
            timeZone:  'Africa/Nairobi'
        }).format(new Date())} -IP: ${ip || 'unknown'} - ${entry}\n`;

        try {
            const logsPath = path.join(__dirname,'..' ,'..' ,'appslogs');
            if(!existsSync(logsPath)){
                await fspromises.mkdir(logsPath);//create the directory if it doesn't exist
            }

            await fspromises.appendFile(
                path.join(logsPath, 'myErrorsFile.log'),//the folder should contain a file called myErrorsFile.log
                formattedEntry,
            );
        } catch (e) {
            if (e instanceof Error) console.error('Error writing to log file:', e.message);
        }
    }
    }

