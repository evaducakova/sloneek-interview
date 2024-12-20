import {inject, Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Category, Transaction, TransactionBalance} from '../types/types';
import {TransactionsState} from '../store/transactions.reducer';
import {Observable} from 'rxjs';
import {
  addSampleData,
  addTransaction,
  loadExpenseCategoriesFromLocalStorage,
  loadIncomeCategoriesFromLocalStorage,
  loadTransactionsFromLocalStorage,
} from '../store/transactions.actions';
import {transactionSelectors} from '../store/transaction.selector';
import {TransactionsUtil} from "../utils/transactions.util";

@Injectable({
  providedIn: 'root',
})
export class TransactionsFacadeService {
  private store = inject(Store<TransactionsState>);

  loadTransactions(): void {
    this.store.dispatch(loadTransactionsFromLocalStorage());
  }

  loadIncomeCategories(): void {
    this.store.dispatch(loadIncomeCategoriesFromLocalStorage());
  }

  loadExpenseCategories(): void {
    this.store.dispatch(loadExpenseCategoriesFromLocalStorage());
  }

  selectTransactions(): Observable<Transaction[]> {
    return this.store.pipe(select(transactionSelectors.selectTransactions));
  }

  selectIncomeCategories(): Observable<Category> {
    return this.store.pipe(select(transactionSelectors.selectIncomeCategories));
  }

  selectExpenseCategories(): Observable<Category> {
    return this.store.pipe(select(transactionSelectors.selectExpenseCategories));
  }

  addTransaction(transaction: Transaction): void {
    this.store.dispatch(addTransaction({transaction}));
  }

  generateSampleData(): void {
    const {transactions, incomeCategories, expenseCategories} = TransactionsUtil.generateSampleTransactions();
    this.store.dispatch(addSampleData({transactions, incomeCategories, expenseCategories}));
  }

  calculateBalance(): Observable<TransactionBalance> {
    return this.store.pipe(select(transactionSelectors.calculateBalance));
  }

}
