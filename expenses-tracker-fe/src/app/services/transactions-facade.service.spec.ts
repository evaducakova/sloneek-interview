import {TestBed} from '@angular/core/testing';

import {TransactionsFacadeService} from './transactions-facade.service';
import {Store} from '@ngrx/store';

describe('TransactionsFacadeService', () => {
  let service: TransactionsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsFacadeService,
        { provide: Store, useValue: {} }
      ]
    });
    service = TestBed.inject(TransactionsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
