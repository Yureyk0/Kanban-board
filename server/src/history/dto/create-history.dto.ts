import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  historyContent: string;

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  taskId: string;
}
