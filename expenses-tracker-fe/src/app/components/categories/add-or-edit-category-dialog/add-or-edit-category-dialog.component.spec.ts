import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCategoryDialogComponent } from './add-or-edit-category-dialog.component';

describe('AddNewCategoryDialogComponent', () => {
  let component: AddOrEditCategoryDialogComponent;
  let fixture: ComponentFixture<AddOrEditCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditCategoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
