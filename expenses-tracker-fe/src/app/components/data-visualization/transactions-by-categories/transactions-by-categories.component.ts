import {Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {Transaction} from '../../../types/types';
import * as Highcharts from 'highcharts';
import {PointOptionsObject} from 'highcharts';
import {HighchartsChartModule} from 'highcharts-angular';
import {isPlatformBrowser} from '@angular/common';
import {TransactionsUtil} from '../../../utils/transactions.util';

@Component({
  selector: 'app-transactions-by-categories',
  standalone: true,
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './transactions-by-categories.component.html',
})
export class TransactionsByCategoriesComponent implements OnChanges {
  @Input() transactions: Transaction[] | null = [];
  @Input() chartTitle: string = 'Transactions By Category';

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformBrowser(this.platformId)) {
      if (changes['transactions'] && this.transactions) {
        const data: PointOptionsObject[] = TransactionsUtil.groupTransactionsByCategory(this.transactions);
        this.chartOptions = {
          chart: {
            type: 'pie',
            backgroundColor: '#F0E9E0'
          },
          title: {
            text: this.chartTitle
          },
          tooltip: {
            pointFormat: '<b>€{point.y:.2f}</b>'
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: €{point.y:.2f}'
              }
            }
          },
          series: [{
            name: 'Value',
            data: data,
            type: 'pie'
          }]
        };
      }
    }
  }
}
