import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from './entities/block.entity';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  create(block: Block) {
    return this.blockRepository.save(block);
  }

  findAll() {
    return this.blockRepository.find({
      order: { index: 'ASC' },
      // relations: ['image'],
    });
  }
}
