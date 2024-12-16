import { Component } from '@angular/core';
import { TransactionsDashboardComponent } from './components/transactions-dashboard/transactions-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionsDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
