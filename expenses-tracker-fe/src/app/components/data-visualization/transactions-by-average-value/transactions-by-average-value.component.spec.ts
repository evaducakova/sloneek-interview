import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsByAverageValueComponent } from './transactions-by-average-value.component';

describe('TransactionsByAverageValueComponent', () => {
  let component: TransactionsByAverageValueComponent;
  let fixture: ComponentFixture<TransactionsByAverageValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsByAverageValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsByAverageValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
