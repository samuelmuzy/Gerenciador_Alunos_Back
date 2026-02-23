import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentService {
    constructor(private prismaService: PrismaService) {}


    
}
