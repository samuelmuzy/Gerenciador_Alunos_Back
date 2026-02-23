import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createContent } from './dto/ContentDTO';
import { uploadImagemBuffer } from 'src/common/utils/UploadImage';

@Injectable()
export class ContentService {
    constructor(private prismaService: PrismaService) {}

    public async createContent(data: createContent, file: Express.Multer.File) {
        const buffer: Buffer = file?.buffer;

        const verifyStepExist = await this.prismaService.etapa.findUnique({
            where: {
                id: data.id_etapa
            }
        })

        if (!verifyStepExist) {
            throw new NotFoundException('Etapa não encontrada');
        }

        if (!file) {
            throw new BadRequestException('File não informado');
        }

        const { url, publicId } = await uploadImagemBuffer(buffer, 'Trabalhos');


        const newContent = await this.prismaService.conteudo.create({
            data: {
                nome: data.nome,
                data_liberacao: data.data_liberacao,
                descricao: data.descricao,
                public_id: publicId,
                url_documento: url,
                id_etapa: data.id_etapa
            }
        });

        return newContent;

    }


}
