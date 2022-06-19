import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { Block } from './entities/block.entity';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post()
  async create(@Response() response, @Body() block: Block) {
    const newblock = await this.blocksService.create(block);
    return response.status(HttpStatus.CREATED).json({ block: newblock });
  }

  @Get()
  async findAll(@Response() response) {
    const blocks = await this.blocksService.findAll();
    return response.status(HttpStatus.OK).json({ blocks });
  }
}
