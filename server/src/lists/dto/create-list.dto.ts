import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateListDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  nameList: string;
}
