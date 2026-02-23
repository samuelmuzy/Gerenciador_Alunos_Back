import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { createContent } from './dto/ContentDTO';
import { ContentService } from './content.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) { }

    @Roles(Role.TEACHER)
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    public async createContent(
        @Body() body: createContent,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
                    new FileTypeValidator({
                        fileType: /(image\/jpeg|image\/png|image\/webp|application\/pdf)/,
                    })
                ],
            }),
        ) file: Express.Multer.File
    ) {
        return await this.contentService.createContent(body, file)
    };
}
