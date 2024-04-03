import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateListDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  nameList: string;
}
