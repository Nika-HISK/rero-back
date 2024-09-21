import { Test, TestingModule } from '@nestjs/testing';
import { TopchartsService } from './topcharts.service';

describe('TopchartsService', () => {
  let service: TopchartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopchartsService],
    }).compile();

    service = module.get<TopchartsService>(TopchartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
