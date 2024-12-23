import {Component, inject} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {TransactionsFacadeService} from "../../../services/transactions-facade.service";
import {Observable} from "rxjs";
import {Category, TransactionType} from "../../../types/types";
import {MatDialog, MatDialogTitle} from "@angular/material/dialog";
import {AsyncPipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {
  AddOrEditCategoryDialogComponent
} from "../add-or-edit-category-dialog/add-or-edit-category-dialog.component";
import {CategoryTableComponent} from "../category-table/category-table.component";

@Component({
  selector: 'app-categories-dashboard',
  standalone: true,
  imports: [
    MatListModule,
    MatDialogTitle,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    CategoryTableComponent
  ],
  templateUrl: './categories-dashboard.component.html',
  styleUrl: './categories-dashboard.component.scss'
})
export class CategoriesDashboardComponent {
  readonly transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);
  readonly dialog: MatDialog = inject(MatDialog);

  incomeCategories$: Observable<Category[]>;
  expenseCategories$: Observable<Category[]>;

  constructor() {
    this.incomeCategories$ = this.transactionsFacadeService.selectIncomeCategories();
    this.expenseCategories$ = this.transactionsFacadeService.selectExpenseCategories();
  }

  openAddNewCategory(transactionType: TransactionType): void {
    this.dialog.open(AddOrEditCategoryDialogComponent, {
      data: {
        transactionType,
      },
      width: '500px'
    });
  }
}
