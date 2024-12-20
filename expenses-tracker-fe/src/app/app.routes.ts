import {Routes} from '@angular/router';
import {TransactionsDashboardComponent} from "./components/transactions/transactions-dashboard/transactions-dashboard.component";
import {CategoriesDashboardComponent} from "./components/categories/categories-dashboard/categories-dashboard.component";

export const routes: Routes = [
  {path: 'transactions', component: TransactionsDashboardComponent},
  {path: 'categories', component: CategoriesDashboardComponent},
  {path: '**', component: TransactionsDashboardComponent},
];
