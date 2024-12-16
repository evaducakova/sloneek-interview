import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Transaction } from '../../types/types';
import { TransactionsFacadeService } from '../../services/transactions-facade.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';

@Component({
  selector: 'app-add-new-transaction-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './add-new-transaction-dialog.component.html',
  styleUrl: './add-new-transaction-dialog.component.scss',
})
export class AddNewTransactionDialogComponent {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionsFacadeService: TransactionsFacadeService,
    private dialogRef: MatDialogRef<AddNewTransactionDialogComponent>
  ) {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  saveTransaction(): void {
    const newTransaction: Transaction = this.transactionForm.value;
    this.transactionsFacadeService.addTransaction(newTransaction);
    this.dialogRef.close();
  }
}
