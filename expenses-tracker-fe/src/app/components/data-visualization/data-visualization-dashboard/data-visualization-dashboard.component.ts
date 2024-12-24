import {Component, inject} from '@angular/core';
import {TransactionsFacadeService} from '../../../services/transactions-facade.service';
import {TransactionsByCategoriesComponent} from '../transactions-by-categories/transactions-by-categories.component';
import {AsyncPipe} from '@angular/common';
import {
  TransactionsByCategoryValueComponent
} from '../transactions-by-category-value/transactions-by-category-value.component';
import {
  TransactionsByAverageValueComponent
} from '../transactions-by-average-value/transactions-by-average-value.component';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-data-visualization-dashboard',
  standalone: true,
  imports: [
    TransactionsByCategoriesComponent,
    AsyncPipe,
    TransactionsByCategoryValueComponent,
    TransactionsByAverageValueComponent,
    MatDividerModule
  ],
  templateUrl: './data-visualization-dashboard.component.html',
  styleUrl: './data-visualization-dashboard.component.scss'
})
export class DataVisualizationDashboardComponent {
  readonly transactionFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);

  incomeTransactions$ = this.transactionFacadeService.selectIncomeTransactions();
  expenseTransactions$ = this.transactionFacadeService.selectExpenseTransactions();
}
