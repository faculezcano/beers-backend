import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateBeerDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  ingredients: Array<Object>;
}
