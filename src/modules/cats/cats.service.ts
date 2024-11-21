import { Injectable } from '@nestjs/common';
import type { ICat } from 'src/types/cats.interfaces';

@Injectable()
export class CatsService {
    private readonly cats: ICat[] = [];

    create(cat: ICat): ICat {
        this.cats.push(cat);
        return cat;
    }

    getAll(): ICat[] {
        return this.cats;
    }
}
