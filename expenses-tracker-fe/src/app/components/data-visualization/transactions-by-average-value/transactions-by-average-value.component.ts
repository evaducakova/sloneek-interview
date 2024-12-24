import {Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {HighchartsChartModule} from 'highcharts-angular';
import {Transaction} from '../../../types/types';
import {isPlatformBrowser} from '@angular/common';
import * as Highcharts from 'highcharts';
import {PointOptionsObject} from 'highcharts';
import {TransactionsUtil} from '../../../utils/transactions.util';

@Component({
  selector: 'app-transactions-by-average-value',
  standalone: true,
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './transactions-by-average-value.component.html',
  styleUrl: './transactions-by-average-value.component.scss'
})
export class TransactionsByAverageValueComponent implements OnChanges {
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
        const groupedData: PointOptionsObject[] = TransactionsUtil.groupTransactionsByCategoryAverageValue(this.transactions);
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
