import { All, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { CatsService } from './cats.service';
import type { Request, Response } from 'express';

interface ICat {
  id: string;
  name: string;
}

interface ICatsResponse {
  message: string;
  data: ICat;
}

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll(): string {
    return 'This action returns all cats';
  }

 
  @HttpCode(200)
  @Get(':id')
  getOneCat(@Res({ passthrough: true }) response:Response): ICatsResponse {
    // response.status(201).json({message: "This action returns one cat by id", data:{name: 'Barsik', id: '1'}}) // with @Res(), { passthrough: true } for @Next()
    return {message: "This action returns one cat by id", data:{name: 'Barsik', id: '1'}}
  }

  @Post()
  createCat(@Req() req: Request): ICatsResponse{
    return {message: "This action returns created cat", data:req.body}
  }

  @All()
  handleAllMethods(): void {
    console.log("Methods has been processing!");
  }
}
