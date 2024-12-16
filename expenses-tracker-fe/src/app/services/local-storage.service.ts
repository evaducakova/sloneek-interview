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
    value: Array<Transaction | Category>
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
    return new Observable<Transaction[]>((observer) => {
      try {
        const transactions = this.getLocalStorageItem('transactions');
        observer.next(transactions ? JSON.parse(transactions) : []);
        observer.complete();
      } catch (error) {
        observer.error(
          'Failed to retrieve transactions from localStorage: ' + error
        );
      }
    });
  }

  loadCategories(): Observable<Category[]> {
    return new Observable<Category[]>((observer) => {
      try {
        const categories = this.getLocalStorageItem('categories');
        observer.next(categories ? JSON.parse(categories) : []);
        observer.complete();
      } catch (error) {
        observer.error(
          'Failed to retrieve categories from localStorage: ' + error
        );
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
