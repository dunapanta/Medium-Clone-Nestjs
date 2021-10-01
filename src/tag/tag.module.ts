import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';


// Aditional Configuration for the module
@Module({
    controllers: [TagController],
    providers: [TagService]
})
export class TagModule {}
