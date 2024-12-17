import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LocalStorageService} from '../services/local-storage.service';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  addTransaction,
  loadTransactionsFailure,
  loadTransactionsFromLocalStorage,
  loadTransactionsSuccess,
  saveToLocalStorageFailure,
  saveToLocalStorageSuccess,
} from './transactions.actions';
import {Transaction} from '../types/types';
import {select, Store} from '@ngrx/store';
import {transactionSelectors} from "./transaction.selector";

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
            of(loadTransactionsFailure({error: error.message}))
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
            map(() => saveToLocalStorageSuccess({transactions})),
            catchError((error) =>
              of(saveToLocalStorageFailure({error: error.message}))
            )
          );
      })
    )
  );
}
