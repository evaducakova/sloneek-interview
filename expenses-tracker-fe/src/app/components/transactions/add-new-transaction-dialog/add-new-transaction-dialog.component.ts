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
import {AsyncPipe, NgTemplateOutlet} from "@angular/common";

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
    AsyncPipe,
    NgTemplateOutlet,

  ],
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
  templateUrl: './add-new-transaction-dialog.component.html',
  styleUrl: './add-new-transaction-dialog.component.scss',
})
export class AddNewTransactionDialogComponent {
  readonly transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);
  readonly dialogRef: MatDialogRef<AddNewTransactionDialogComponent> = inject(MatDialogRef<AddNewTransactionDialogComponent>)
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  transactionForm: FormGroup;

  incomeCategories$: Observable<Category[]>;
  expenseCategories$: Observable<Category[]>;

  constructor() {
    this.transactionForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      value: ['', Validators.required],
      mainCategory: ['', Validators.required],
      subcategory: ['', Validators.required],
    });

    this.incomeCategories$ = this.transactionsFacadeService.selectIncomeCategories();
    this.expenseCategories$ = this.transactionsFacadeService.selectExpenseCategories();
  }

  getMainCategories(categories: Category[]): Array<{ id: string, name: string }> {
    return categories.map(category => ({
      id: category.id,
      name: Object.keys(category.value)[0]
    }))
  }

  getSubcategories(categories: Category[]): string[] {
  const mainCategory = this.transactionForm.get('mainCategory')?.value;
  const category = categories.find(cat => Object.keys(cat.value).includes(mainCategory));
  return category ? category.value[mainCategory] : [];
}

  saveTransaction(): void {
    const formValue = this.transactionForm.value;
    const newTransaction: Transaction = {
      ...formValue,
      category: {[formValue.mainCategory]: formValue.subcategory}
    };
    this.transactionsFacadeService.addTransaction(newTransaction);
    this.dialogRef.close();
  }
}
