import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsByCategoriesComponent } from './transactions-by-categories.component';

describe('TransactionsByCategoriesComponent', () => {
  let component: TransactionsByCategoriesComponent;
  let fixture: ComponentFixture<TransactionsByCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsByCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsByCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
