import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTransactionDialogComponent } from './add-new-transaction-dialog.component';

describe('AddNewTransactionDialogComponent', () => {
  let component: AddNewTransactionDialogComponent;
  let fixture: ComponentFixture<AddNewTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTransactionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
