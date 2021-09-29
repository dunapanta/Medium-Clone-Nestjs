import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';


// Aditional Configuration for the module
@Module({
    controllers: [TagController]
})
export class TagModule {}
