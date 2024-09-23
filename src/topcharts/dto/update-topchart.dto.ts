import { PartialType } from '@nestjs/mapped-types';
import { CreateTopchartDto } from './create-topchart.dto';

export class UpdateTopchartDto extends PartialType(CreateTopchartDto) {}
