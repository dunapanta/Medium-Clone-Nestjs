import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  // Constructor define all our services that we want to use inside this controlles
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): string[] {
    return this.tagService.findAll();
  }
}
