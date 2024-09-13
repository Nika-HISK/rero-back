import { Test, TestingModule } from '@nestjs/testing';
import { ShuffleService } from './shuffle.service';

describe('ShuffleService', () => {
  let service: ShuffleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShuffleService],
    }).compile();

    service = module.get<ShuffleService>(ShuffleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
