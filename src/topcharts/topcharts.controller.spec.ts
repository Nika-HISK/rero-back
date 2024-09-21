import { Test, TestingModule } from '@nestjs/testing';
import { TopchartsController } from './topcharts.controller';
import { TopchartsService } from './topcharts.service';

describe('TopchartsController', () => {
  let controller: TopchartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopchartsController],
      providers: [TopchartsService],
    }).compile();

    controller = module.get<TopchartsController>(TopchartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
