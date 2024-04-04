import { AuditService } from 'src/audit/audit.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { Audit } from './entities/audit.entity';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}
  @Post()
  create(@Body() auditData: Partial<Audit>): Promise<Audit> {
    return this.auditService.create(auditData);
  }

  @Get()
  findAll() {
    return this.auditService.findAll();
  }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.auditService.remove(id);
  // }
}
