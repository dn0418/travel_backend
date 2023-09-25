import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
dotenv.config();


@Injectable()
export class Awss3Service {
    async uploadPublicFile(dataBuffer: Buffer, filename: string, contentType: string) {
        const s3 = new S3();

        const uploadResult = await s3.upload({
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`,
            'ContentType': contentType
        })
            .promise()
            .then(response => response)
            .catch(error => {
                console.log(error)
                throw new InternalServerErrorException("Something went wrong while uploading this asset.")
            });
        return uploadResult;
    }

    // Download file from Amazon S3 bucket
    async downloadPublicFile(key: string) {
        const s3 = new S3();
        const downloadResult = await s3.getObject({
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Key: key
        })
            .promise()
            .then(response => response)
            .catch(error => {
                console.log(error)
                throw new InternalServerErrorException("Something went wrong while downloading this asset.")
            });
        return downloadResult;
    }
}
