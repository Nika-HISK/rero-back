import { PartialType } from '@nestjs/mapped-types';
import { CreateListenerDto } from './create-listener.dto';

export class UpdateListenerDto extends PartialType(CreateListenerDto) {}