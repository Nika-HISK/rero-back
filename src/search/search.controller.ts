import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dtos/search-query.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('query') searchQueryDto: SearchQueryDto) {
    const results = await this.searchService.search(searchQueryDto.query);
    return results;
  }
}
