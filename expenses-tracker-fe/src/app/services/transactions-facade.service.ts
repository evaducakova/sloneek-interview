import {inject, Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Transaction} from '../types/types';
import {TransactionsState} from '../store/transactions.reducer';
import {Observable} from 'rxjs';
import {addSampleTransactions, addTransaction, loadTransactionsFromLocalStorage,} from '../store/transactions.actions';
import {transactionSelectors} from '../store/transaction.selector';
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: 'root',
})
export class TransactionsFacadeService {
  private store = inject(Store<TransactionsState>);

  loadTransactions(): void {
    this.store.dispatch(loadTransactionsFromLocalStorage());
  }

  selectTransactions(): Observable<Transaction[]> {
    return this.store.pipe(select(transactionSelectors.selectTransactions));
  }

  addTransaction(transaction: Transaction): void {
    this.store.dispatch(addTransaction({transaction}));
  }

  generateSampleTransactions(): void {
    const sampleTransactions: Transaction[] = [];
    for (let i = 0; i < 20; i++) {
      sampleTransactions.push({
        id: uuidv4(),
        name: `Transaction ${i + 1}`,
        date: new Date().toISOString().split('T')[0],
        type: i % 2 === 0 ? 'income' : 'expense',
        description: `Description for transaction ${i + 1}`,
        value: parseFloat((Math.random() * 100).toFixed(2)),
        category: i % 2 === 0 ? 'income' : 'food',
      });
    }

    this.store.dispatch(addSampleTransactions({transactions: sampleTransactions}));
  }
}
