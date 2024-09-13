import { Test, TestingModule } from '@nestjs/testing';
import { ShuffleController } from './shuffle.controller';
import { ShuffleService } from './shuffle.service';

describe('ShuffleController', () => {
  let controller: ShuffleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShuffleController],
      providers: [ShuffleService],
    }).compile();

    controller = module.get<ShuffleController>(ShuffleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
