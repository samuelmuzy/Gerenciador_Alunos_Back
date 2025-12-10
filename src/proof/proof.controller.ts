import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { PeriodusService } from 'src/periodus/periodus.service';
import { CreateProofDto } from './dto/ProofDTO';
import { ProofService } from './proof.service';

@Controller('proof')
export class ProofController {
    constructor(private proofService:ProofService){}

    @Roles(Role.TEACHER)
    @Post('')
    public async createProof(@Body() body:CreateProofDto):Promise<CreateProofDto>{
        return await this.proofService.createProof(body);
    }
}
