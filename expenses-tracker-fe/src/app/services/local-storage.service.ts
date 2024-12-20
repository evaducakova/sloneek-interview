import { Injectable } from '@angular/core';
import { Category, Transaction } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveToLocalStorage(
    key: string,
    value: Array<Transaction> | Category
  ): Observable<void> {
    return new Observable<void>((observer) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(key, JSON.stringify(value));
          observer.next();
          observer.complete();
        }
      } catch (error) {
        observer.error('Failed to save to localStorage: ' + error);
      }
    });
  }

  loadTransactions(): Observable<Transaction[]> {
    return this.loadFromLocalStorage<Transaction[]>('transactions', []);
  }

  loadIncomeCategories(): Observable<Category> {
    return this.loadFromLocalStorage<Category>('incomeCategories', {});
  }

  loadExpenseCategories(): Observable<Category> {
    return this.loadFromLocalStorage<Category>('expenseCategories', {});
  }

  private loadFromLocalStorage<T>(key: string, defaultValue: T): Observable<T> {
    return new Observable<T>((observer) => {
      try {
        const item = this.getLocalStorageItem(key);
        observer.next(item ? JSON.parse(item) : defaultValue);
        observer.complete();
      } catch (error) {
        observer.error(`Failed to retrieve ${key} from localStorage: ${error}`);
      }
    });
  }

  private getLocalStorageItem(item: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(item);
      }
    } catch (error) {
      console.error('Failed to retrieve from localStorage:', error);
    }
    return null;
  }
}
