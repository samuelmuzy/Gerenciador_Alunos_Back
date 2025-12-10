import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreateWork } from './dto/WorkDTO';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
    constructor(private workService:WorkService){}

    @Roles(Role.TEACHER)
    @Post('')
    public async createWork(@Body() body:CreateWork):Promise<CreateWork>{
        return await this.workService.createWork(body)
    }
}
