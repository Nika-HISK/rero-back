import { Test, TestingModule } from '@nestjs/testing';
import { ListenersService } from './listeners.service';

describe('ListenersService', () => {
  let service: ListenersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenersService],
    }).compile();

    service = module.get<ListenersService>(ListenersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
