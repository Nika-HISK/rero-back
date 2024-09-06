import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dtos/search-query.dto';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { Role } from 'src/auth/guard/enum/role.enum';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  async search(@Query() searchQueryDto: SearchQueryDto) {
    const results = await this.searchService.search(searchQueryDto.query);
    return results;
  }
}
