import {Routes} from '@angular/router';
import {
  TransactionsDashboardComponent
} from './components/transactions/transactions-dashboard/transactions-dashboard.component';
import {
  CategoriesDashboardComponent
} from './components/categories/categories-dashboard/categories-dashboard.component';
import {
  DataVisualizationDashboardComponent
} from './components/data-visualization/data-visualization-dashboard/data-visualization-dashboard.component';

export const routes: Routes = [
  {path: 'transactions', component: TransactionsDashboardComponent},
  {path: 'categories', component: CategoriesDashboardComponent},
  {path: 'data-visualization', component: DataVisualizationDashboardComponent},
  {path: '**', component: TransactionsDashboardComponent},
];
