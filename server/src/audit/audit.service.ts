import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepository: Repository<Audit>,
  ) {}

  async create(auditData: Partial<Audit>): Promise<Audit> {
    const audit = new Audit();
    audit.entityId = auditData.entityId;
    audit.action = auditData.action;
    audit.newState = auditData.newState;
    audit.oldState = auditData.oldState;
    await this.auditRepository.save(audit);

    // const auditLog = this.auditRepository.create(auditData);

    return audit;
  }
  async findAll() {
    return await this.auditRepository.find();
  }

  // async remove(id: number): Promise<void> {
  //   const task = await this.auditRepository.find();

  //   await this.auditRepository.clear();
  // }
}
