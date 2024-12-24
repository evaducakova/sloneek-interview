import {TransactionValuePipe} from './transaction-value.pipe';
import {TestBed} from '@angular/core/testing';
import {CurrencyPipe} from '@angular/common';

describe('TransactionValuePipe', () => {
  let pipe: TransactionValuePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionValuePipe,
        {provide: CurrencyPipe, useValue: {transform: (value: number) => `€${value.toFixed(2)}`}}
      ]
    });
    pipe = TestBed.inject(TransactionValuePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format income transaction value correctly', () => {
    const result = pipe.transform(100, 'income');
    expect(result).toBe('€100.00');
  });

  it('should format expense transaction value correctly', () => {
    const result = pipe.transform(100, 'expense');
    expect(result).toBe('− €100.00');
  });
});
