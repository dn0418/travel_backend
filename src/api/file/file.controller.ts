import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller("file")
export class FileController {
  constructor(private fileService: FileService) { }
  @Post("/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile("file") file: Express.Multer.File) {
    return await this.fileService.uploadFile(file);
  }
}
