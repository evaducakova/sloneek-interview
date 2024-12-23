import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TransactionsFacadeService} from "./services/transactions-facade.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);

  constructor() {
    this.transactionsFacadeService.loadTransactions();
    this.transactionsFacadeService.loadIncomeCategories();
    this.transactionsFacadeService.loadExpenseCategories();
  }
}
