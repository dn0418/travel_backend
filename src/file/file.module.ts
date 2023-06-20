import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Awss3Service } from './awss3.service';
import { FileController } from './file.controller';
import { FileService } from './file.service';
// import { FileController } from './file.controller';

@Module({
  imports: [],
  providers: [FileService, Awss3Service],
  controllers: [FileController],
  exports: [FileService]
})
export class FileModule { }
