import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Transaction, TransactionBalance} from '../../../types/types';
import {TransactionsFacadeService} from '../../../services/transactions-facade.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {TransactionsComponent} from '../transactions-table/transactions.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BalanceCardComponent} from '../balance-card/balance-card.component';

@Component({
  selector: 'app-transactions-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    TransactionsComponent,
    AsyncPipe,
    BalanceCardComponent,
  ],
  templateUrl: './transactions-dashboard.component.html',
  styleUrl: './transactions-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsDashboardComponent {
  transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);

  transactions$: Observable<Transaction[]>;
  balance$: Observable<TransactionBalance>;

  constructor() {
    this.transactionsFacadeService.loadTransactions();
    this.transactions$ = this.transactionsFacadeService.selectTransactions();
    this.balance$ = this.transactionsFacadeService.calculateBalance();
  }
}
