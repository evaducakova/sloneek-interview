import {TransactionValuePipe} from './transaction-value.pipe';

describe('TransactionValuePipe', () => {
  let pipe: TransactionValuePipe;

  beforeEach(() => {
    pipe = new TransactionValuePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format positive transaction value correctly', () => {
    const result = pipe.transform(100, 'income');
    expect(result).toBe('€100.00');
  });

  it('should format negative transaction value correctly', () => {
    const result = pipe.transform(100, 'expense');
    expect(result).toBe('-€100.00');
  });

  it('should handle null value correctly', () => {
    const result = pipe.transform(NaN, 'income');
    expect(result).toBe('€0');
  });
});
