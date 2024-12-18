import {Component, Input} from '@angular/core';
import {TransactionBalance} from "../../types/types";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-balance-card',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.scss'
})
export class BalanceCardComponent {
  @Input() balance: TransactionBalance = {incomes: 0, expenses: 0, balance: 0};
}
