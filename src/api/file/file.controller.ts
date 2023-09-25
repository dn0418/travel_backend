import {
  Controller,
  Get,
  Post,
  Query,
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

  /**
 * res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');
res.setHeader('Content-Length', data.ContentLength);
res.send(data.Body);
 */

  // Download file
  @Get("/download")
  async downloadFile(@Query("key") key: string) {
    return await this.fileService.downloadFile(key);
  }
}
