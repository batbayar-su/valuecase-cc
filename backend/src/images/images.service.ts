import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  public static TMP_IMAGE_DIR = './tmp/images';

  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  private createTmpDirIfNeeded(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const exists = fs.existsSync(ImagesService.TMP_IMAGE_DIR);

      if (!exists) {
        fs.mkdir(ImagesService.TMP_IMAGE_DIR, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }

      resolve();
    });
  }

  public async saveFile(file: Express.Multer.File): Promise<{ id: number }> {
    await this.createTmpDirIfNeeded();

    // made this change because it was failing when file name has spaces
    const ext = (file.filename ?? file.originalname).split('.').splice(-1);
    const filename = `${randomUUID()}.${ext}`;
    const mimetype = file.mimetype;

    await new Promise<void>((resolve) => {
      fs.writeFile(
        ImagesService.TMP_IMAGE_DIR + '/' + filename,
        file.buffer,
        {},
        () => {
          resolve();
        },
      );
    });

    const result = await this.imagesRepository.save({
      filename: filename,
      mimetype: mimetype,
    });

    return {
      id: result.id,
    };
  }

  public async getFileAndData(id: number): Promise<Image> {
    const image = await this.imagesRepository.findOneBy({ id: id });
    if (!image) throw new Error('Image not found');

    return image;
  }
}
