import { BadRequestException, Injectable } from '@nestjs/common';
import { expectedMimeTypes } from 'src/config/mime-type-config';
import { Awss3Service } from './awss3.service';
@Injectable()
export class FileService {
    constructor(
        private awss3Service: Awss3Service,
    ) { }

    private formatFileName(fileName: string): string {
        const invalidCharacters = [" ", "(", ")", "{", "}",]
        let fileNameArr = []
        for (let i = 0; i < fileName.length; i++) {
            if (!invalidCharacters.includes(fileName[i])) {
                fileNameArr.push(fileName[i])
            }
        }
        return fileNameArr.join("")
    }

    async uploadFile(file: any) {

        const availableMimeTypes = Object.values(expectedMimeTypes);
        if (file && file.size > 10485760) throw new BadRequestException("Maximum file size exceeded, (Accept upto 10 MB)");
        if (file && file.buffer && file.mimetype && availableMimeTypes.includes(file.mimetype)) {
            let fileName: string = "school-asset"
            if (file.originalname) {
                fileName = this.formatFileName(file.originalname)
            }
            return await this.awss3Service.uploadPublicFile(file.buffer, fileName, file.mimetype);
        }

        throw new BadRequestException("Invalid file format!")
    }

    async downloadFile(key: string) {
        const data = await this.awss3Service.downloadPublicFile(key);
        console.log(data)
        return {
            data: data.Body,
        }
    }
}
