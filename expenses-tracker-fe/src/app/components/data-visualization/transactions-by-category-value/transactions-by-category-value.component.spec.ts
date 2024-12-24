import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsByCategoryValueComponent } from './transactions-by-category-value.component';

describe('TransactionsByCategoryValueComponent', () => {
  let component: TransactionsByCategoryValueComponent;
  let fixture: ComponentFixture<TransactionsByCategoryValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsByCategoryValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsByCategoryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
