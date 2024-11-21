// Recommendation to use classes for DTO instead interfaces from NestJs Doc https://docs.nestjs.com/controllers#request-payloads
export class CreateCatDto {
  name!: string;
  age!: number;
  breed!: string;
}

export class UpdateCatDto {
  name!: string;
  age!: number;
  breed!: string;
}

export class ListAllEntities {
  limit!: string;
}