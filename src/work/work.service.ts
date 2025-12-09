import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWork } from './dto/WorkDTO';

@Injectable()
export class WorkService {
    constructor(private prismaService:PrismaService){}

    //public async createWork(@Body() ):Promise<CreateWork>
}
