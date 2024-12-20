import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {Transaction} from '../../../types/types';
import {CurrencyPipe, DatePipe, KeyValuePipe, NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {AddNewTransactionDialogComponent} from '../add-new-transaction-dialog/add-new-transaction-dialog.component';
import {TransactionsFacadeService} from "../../../services/transactions-facade.service";
import {TransactionValuePipe} from "../../../utils/transaction-value.pipe";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, DatePipe, NgClass, TransactionValuePipe, KeyValuePipe],
  providers: [CurrencyPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);
  dialog: MatDialog = inject(MatDialog);

  @Input() transactions: Transaction[] = [];
  displayedColumns: string[] = [
    'name',
    'date',
    'description',
    'value',
    'category',
  ];

  openAddNewTransactionDialog(): void {
    this.dialog.open(AddNewTransactionDialogComponent);
  }

  loadSampleData(): void {
    this.transactionsFacadeService.generateSampleData();
  }
}
