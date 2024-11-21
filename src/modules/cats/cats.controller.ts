import { All, Body, Controller, Get, HttpCode, HttpStatus,Param, Post, Req, Res, Query, Put, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import type { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './create-cat.dto';
import type { ICat, ICatsResponse } from 'src/types/cats.interfaces';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  ////// Work with CatService /////
  @Get()
  async getAllCats(): Promise<ICat[]> {
    return this.catsService.getAll();
  }

  @Post()
  async createCatWithService(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  ///////// Without CatService //////
  // Synchronous for fast response without async operations
  @Get()
  getAll(): string {
    return 'This action returns all cats';
  }

  // Asynchronous For query to DB
  @Get('async')
  async getAllAsync(): Promise<any[]> {
    return ["async"];
  }

  // Reactive for real-time
  @Get('observ')
  getAllObserver(): Observable<any[]> {
    return of(['observ']);
  }
 
  @HttpCode(200)
  @Get(':id')
  getOneCat(@Res({ passthrough: true }) response: Response, @Param() params: string, @Param('id') id: string): ICatsResponse {
    console.log(params, id);
    // response.status(201).json({message: "This action returns one cat by id", data:{name: 'Barsik', id: '1'}}) // with @Res(), { passthrough: true } for @Next()
    // HttpStatus: CREATED, OK, ... - Library approach (Should be used with caution, platform dependent) https://docs.nestjs.com/controllers#library-specific-approach
    // response.status(HttpStatus.CREATED).json({message: "This action returns one cat by id", data:{name: 'Barsik', id: '1'}})
    return { message: "This action returns one cat by id", data: { name: 'Barsik', age: 1, breed: 'American Bobtail' } }
  }

  @Post()
  createCat(@Req() req: Request, @Body() body: ICat, @Body('name') name: string): ICatsResponse{
    console.log(body, name);
    return {message: "This action returns created cat", data:req.body}
  }

  @Post("asyncpost")
  async createCatAsync(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }

  @All()
  handleAllMethods(): void {
    console.log("Methods has been processing!");
  }

  ///////// Nest Doc ///////

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
