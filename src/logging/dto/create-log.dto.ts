import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  user: string;
  @IsNotEmpty()
  request: any;

  @IsNotEmpty()
  at: string;
}
