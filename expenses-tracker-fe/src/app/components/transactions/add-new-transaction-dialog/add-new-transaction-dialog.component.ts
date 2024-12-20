import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {Category, Transaction} from '../../../types/types';
import {TransactionsFacadeService} from '../../../services/transactions-facade.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import {Observable} from "rxjs";

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
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
  templateUrl: './add-new-transaction-dialog.component.html',
  styleUrl: './add-new-transaction-dialog.component.scss',
})
export class AddNewTransactionDialogComponent {
  transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);
  formBuilder: FormBuilder = inject(FormBuilder);
  transactionForm: FormGroup;

  incomeCategories$: Observable<Category>;
  expenseCategories$: Observable<Category>;

  constructor(
    private dialogRef: MatDialogRef<AddNewTransactionDialogComponent>
  ) {
    this.transactionForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      value: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.incomeCategories$ = this.transactionsFacadeService.selectIncomeCategories();
    this.expenseCategories$ = this.transactionsFacadeService.selectExpenseCategories();
  }

  saveTransaction(): void {
    const newTransaction: Transaction = this.transactionForm.value;
    this.transactionsFacadeService.addTransaction(newTransaction);
    this.dialogRef.close();
  }
}
