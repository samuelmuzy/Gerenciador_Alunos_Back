import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreateWork } from './dto/WorkDTO';
import { WorkService } from './work.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) { }

  @Roles(Role.TEACHER)
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  public async createWork(@Body() body: CreateWork): Promise<CreateWork> {
    return await this.workService.createWork(body);
  }

  
  @Roles(Role.TEACHER)
  @Post('s')
  @UseInterceptors(FileInterceptor('file'))
  public async createWorks(
    @Body() body: CreateWork,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    ) file: Express.Multer.File
  ): Promise<CreateWork> {
    return await this.workService.createWork(body);
  }
}
