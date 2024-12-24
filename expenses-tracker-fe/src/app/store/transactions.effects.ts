import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LocalStorageService} from '../services/local-storage.service';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  addOrEditExpenseCategory,
  addOrEditIncomeCategory,
  addSampleData,
  addTransaction,
  loadDataFailure,
  loadExpenseCategoriesFromLocalStorage,
  loadExpenseCategoriesSuccess,
  loadIncomeCategoriesFromLocalStorage,
  loadIncomeCategoriesSuccess,
  loadTransactionsFromLocalStorage,
  loadTransactionsSuccess,
  removeExpenseCategory,
  removeIncomeCategory,
  saveToLocalStorageFailure,
  saveToLocalStorageSuccess,
} from './transactions.actions';
import {Category, Transaction} from '../types/types';
import {select, Store} from '@ngrx/store';
import {transactionSelectors} from './transaction.selector';

@Injectable()
export class TransactionsEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store);
  private localStorageService = inject(LocalStorageService);

  loadTransactionsFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTransactionsFromLocalStorage),
      mergeMap(() =>
        this.localStorageService.loadTransactions().pipe(
          map((transactions: Transaction[]) =>
            loadTransactionsSuccess({transactions})
          ),
          catchError((error) =>
            of(loadDataFailure({error: error.message}))
          )
        )
      )
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTransaction),
      withLatestFrom(this.store$.pipe(select(transactionSelectors.selectTransactions))),
      switchMap(([_, transactions]) => {
        return this.localStorageService
          .saveToLocalStorage('transactions', transactions)
          .pipe(
            map(() => saveToLocalStorageSuccess({data: transactions})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );

  addSampleTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSampleData),
      withLatestFrom(
        this.store$.pipe(select(transactionSelectors.selectTransactions)),
      ),
      switchMap(([_, transactions]) => {
        return this.localStorageService
          .saveToLocalStorage('transactions', transactions)
          .pipe(
            map(() => saveToLocalStorageSuccess({data: transactions})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );

  addSampleIncomeCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSampleData),
      withLatestFrom(
        this.store$.pipe(select(transactionSelectors.selectIncomeCategories)),
      ),
      switchMap(([_, incomeCategories]) => {
        return this.localStorageService
          .saveToLocalStorage('incomeCategories', incomeCategories)
          .pipe(
            map(() => saveToLocalStorageSuccess({data: incomeCategories})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );

  addSampleExpenseCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSampleData),
      withLatestFrom(
        this.store$.pipe(select(transactionSelectors.selectExpenseCategories)),
      ),
      switchMap(([_, expenseCategories]) => {
        return this.localStorageService
          .saveToLocalStorage('expenseCategories', expenseCategories)
          .pipe(
            map(() => saveToLocalStorageSuccess({data: expenseCategories})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );

  loadIncomeCategoriesFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIncomeCategoriesFromLocalStorage),
      mergeMap(() =>
        this.localStorageService.loadIncomeCategories().pipe(
          map((categories: Category[]) =>
            loadIncomeCategoriesSuccess({categories})
          ),
          catchError((error) =>
            of(loadDataFailure({error: error.message}))
          )
        )
      )
    )
  );

  loadExpenseCategoriesFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExpenseCategoriesFromLocalStorage),
      mergeMap(() =>
        this.localStorageService.loadExpenseCategories().pipe(
          map((categories: Category[]) =>
            loadExpenseCategoriesSuccess({categories})
          ),
          catchError((error) =>
            of(loadDataFailure({error: error.message}))
          )
        )
      )
    )
  );

  addOrEditIncomeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrEditIncomeCategory),
      withLatestFrom(this.store$.pipe(select(transactionSelectors.selectIncomeCategories))),
      switchMap(([_, categories]) => {
        return this.localStorageService
          .saveToLocalStorage('incomeCategories', categories)
          .pipe(
            map(() => saveToLocalStorageSuccess({data: categories})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );

  addOrEditExpenseCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrEditExpenseCategory),
      withLatestFrom(this.store$.pipe(select(transactionSelectors.selectExpenseCategories))),
      switchMap(([_, categories]) => {
        return this.localStorageService
          .saveToLocalStorage('expenseCategories', categories)
          .pipe(
            map(() => saveToLocalStorageSuccess({data: categories})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );

  removeIncomeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeIncomeCategory),
      withLatestFrom(this.store$.pipe(select(transactionSelectors.selectIncomeCategories))),
      switchMap(([_, categories]) => {
        return this.localStorageService
          .saveToLocalStorage('incomeCategories', categories)
          .pipe(
            map(() => saveToLocalStorageSuccess({data: categories})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );

  removeExpenseCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeExpenseCategory),
      withLatestFrom(this.store$.pipe(select(transactionSelectors.selectExpenseCategories))),
      switchMap(([_, categories]) => {
        return this.localStorageService
          .saveToLocalStorage('expenseCategories', categories)
          .pipe(
            map(() => saveToLocalStorageSuccess({data: categories})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );
}
