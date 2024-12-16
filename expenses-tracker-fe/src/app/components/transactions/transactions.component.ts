import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Transaction } from '../../types/types';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTransactionDialogComponent } from '../add-new-transaction-dialog/add-new-transaction-dialog.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, MatButtonModule, MatIconModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  @Input() dataSource: Transaction[] = [];
  displayedColumns: string[] = [
    'name',
    'date',
    'type',
    'description',
    'value',
    'category',
  ];

  constructor(private dialog: MatDialog) {}

  openAddNewTransactionDialog(): void {
    this.dialog.open(AddNewTransactionDialogComponent);
  }
}
