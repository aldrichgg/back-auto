import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('compliance')
@Controller('compliance')
export class ComplianceController {}
