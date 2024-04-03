import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  nameBoard: string;
}
