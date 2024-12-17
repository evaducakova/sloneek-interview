import {inject, Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Transaction} from '../types/types';
import {TransactionsState} from '../store/transactions.reducer';
import {Observable} from 'rxjs';
import {addTransaction, loadTransactionsFromLocalStorage,} from '../store/transactions.actions';
import {transactionSelectors} from '../store/transaction.selector';

@Injectable({
  providedIn: 'root',
})
export class TransactionsFacadeService {
  private store = inject(Store<TransactionsState>);

  addTransaction(transaction: Transaction): void {
    this.store.dispatch(addTransaction({transaction}));
  }

  loadTransactions(): void {
    this.store.dispatch(loadTransactionsFromLocalStorage());
  }

  selectTransactions(): Observable<Transaction[]> {
    return this.store.pipe(select(transactionSelectors.selectTransactions));
  }
}
