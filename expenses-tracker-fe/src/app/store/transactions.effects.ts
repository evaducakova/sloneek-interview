import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '../services/local-storage.service';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  addTransaction,
  loadTransactionsFailure,
  loadTransactionsFromLocalStorage,
  loadTransactionsSuccess,
} from './transactions.actions';
import { Transaction } from '../types/types';
import { Store } from '@ngrx/store';

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
            loadTransactionsSuccess({ transactions })
          ),
          catchError((error) =>
            of(loadTransactionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTransaction),
      withLatestFrom(this.store$.select('transactions')),
      mergeMap(([action, transactions]) => {
        const { transaction } = action;
        return this.localStorageService
          .saveToLocalStorage('transactions', [...transactions, transaction])
          .pipe(
            map(() => addTransaction({ transaction })),
            catchError((error) =>
              of(loadTransactionsFailure({ error: error.message }))
            )
          );
      })
    )
  );
}
