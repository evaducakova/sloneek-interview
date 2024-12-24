import {Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {Transaction} from '../../../types/types';
import * as Highcharts from 'highcharts';
import {PointOptionsObject} from 'highcharts';
import {isPlatformBrowser} from '@angular/common';
import {HighchartsChartModule} from 'highcharts-angular';
import {TransactionsUtil} from '../../../utils/transactions.util';

@Component({
  selector: 'app-transactions-by-category-value',
  standalone: true,
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './transactions-by-category-value.component.html',
  styleUrl: './transactions-by-category-value.component.scss'
})
export class TransactionsByCategoryValueComponent implements OnChanges {
  @Input() transactions: Transaction[] | null = [];
  @Input() chartTitle: string = '';
  @Input() chartLabel: string = '';

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformBrowser(this.platformId)) {
      if (changes['transactions'] && this.transactions) {
        const groupedData: PointOptionsObject[] = TransactionsUtil.groupTransactionsByCategoryValue(this.transactions);
        this.chartOptions = {
          chart: {
            type: 'bar',
            backgroundColor: '#F0E9E0',
          },
          title: {
            text: this.chartTitle
          },
          xAxis: {
            type: 'category',
            title: {
              text: 'Category'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Total Value'
            }
          },
          series: [{
            name: this.chartLabel,
            data: groupedData,
            type: 'bar',
          }],
          tooltip: {
            pointFormat: '<b>€{point.y:.2f}</b>'
          },
        };
      }
    }
  }
}
