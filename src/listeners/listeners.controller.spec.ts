import { Test, TestingModule } from '@nestjs/testing';
import { ListenersController } from './listeners.controller';
import { ListenersService } from './listeners.service';

describe('ListenersController', () => {
  let controller: ListenersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListenersController],
      providers: [ListenersService],
    }).compile();

    controller = module.get<ListenersController>(ListenersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
