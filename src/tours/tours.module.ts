import { Module } from '@nestjs/common';
import { ParentTourService } from './parenttour.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [ParentTourService],
})
export class ToursModule {}
