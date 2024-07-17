import { IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  query: string;
}
