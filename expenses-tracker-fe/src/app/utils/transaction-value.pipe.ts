import {inject, Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Pipe({
  name: 'transactionValue',
  standalone: true
})
export class TransactionValuePipe implements PipeTransform {
  currencyPipe: CurrencyPipe = inject(CurrencyPipe);

  transform(value: number, type: string): string {
    const formattedValue: string | null = this.currencyPipe.transform(value, 'EUR', 'symbol', '1.2-2');
    return type === 'expense' ? `\u2212 ${formattedValue ?? '0'}` : (formattedValue ?? '0');
  }
}
