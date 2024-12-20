import {Component, inject} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {TransactionsFacadeService} from "../../../services/transactions-facade.service";
import {Observable} from "rxjs";
import {Category} from "../../../types/types";
import {MatDialogTitle} from "@angular/material/dialog";
import {AsyncPipe, KeyValuePipe} from "@angular/common";

@Component({
  selector: 'app-categories-dashboard',
  standalone: true,
  imports: [
    MatListModule,
    MatDialogTitle,
    AsyncPipe,
    KeyValuePipe
  ],
  templateUrl: './categories-dashboard.component.html',
  styleUrl: './categories-dashboard.component.scss'
})
export class CategoriesDashboardComponent {
  transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);

  incomeCategories$: Observable<Category>;
  expenseCategories$: Observable<Category>;

  constructor() {
    this.transactionsFacadeService.loadIncomeCategories();
    this.transactionsFacadeService.loadExpenseCategories();
    this.incomeCategories$ = this.transactionsFacadeService.selectIncomeCategories();
    this.expenseCategories$ = this.transactionsFacadeService.selectExpenseCategories();
  }
}
