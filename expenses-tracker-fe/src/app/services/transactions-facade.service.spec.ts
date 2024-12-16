import { TestBed } from '@angular/core/testing';

import { TransactionsFacadeService } from './transactions-facade.service';

describe('TransactionsFacadeService', () => {
  let service: TransactionsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
