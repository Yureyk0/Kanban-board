import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  nameBoard: string;
}
