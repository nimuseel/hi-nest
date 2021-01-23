import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;

  // each: true 옵션은 모든 요소를 하나씩 검사한다.
  // genres의 모든 요소들을 검사한다.
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
