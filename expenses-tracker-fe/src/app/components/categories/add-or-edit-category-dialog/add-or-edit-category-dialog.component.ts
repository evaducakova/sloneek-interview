import {Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {Category, TransactionType} from "../../../types/types";
import {TransactionsFacadeService} from "../../../services/transactions-facade.service";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-add-new-category-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './add-or-edit-category-dialog.component.html',
  styleUrl: './add-or-edit-category-dialog.component.scss'
})
export class AddOrEditCategoryDialogComponent implements OnInit {
  readonly transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);
  readonly dialogRef: MatDialogRef<AddOrEditCategoryDialogComponent> = inject(MatDialogRef<AddOrEditCategoryDialogComponent>);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly data: { transactionType: TransactionType, category?: Category } = inject<{
    transactionType: TransactionType,
    category?: Category
  }>(MAT_DIALOG_DATA);
  categoryForm: FormGroup | undefined;

  get subcategories(): FormArray {
    return this.categoryForm?.get('subcategories') as FormArray;
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [this.data.category ? Object.keys(this.data.category.value)[0] : '', Validators.required],
      subcategories: this.formBuilder.array(
        this.data.category ?
          this.data.category.value[Object.keys(this.data.category.value)[0]].map((sub: string) => this.createSubcategoryWithData(sub)) :
          [this.createSubcategory()]
      )
    });
  }

  addSubcategory(): void {
    this.subcategories.push(this.createSubcategory());
  }

  deleteSubcategory(index: number): void {
    this.subcategories.removeAt(index);
  }

  saveCategory(): void {
    const formValue = this.categoryForm?.value;
    const category: Category = {
      id: this.data.category ? this.data.category.id : uuidv4(),
      value: {
        [formValue.name]: formValue.subcategories.map((sub: { subCategory: string }) => sub.subCategory)
      }
    };
    this.transactionsFacadeService.addOrEditCategory(this.data.transactionType, category);
    this.dialogRef.close();
  }

  private createSubcategory(): FormGroup {
    return this.formBuilder.group({
      subCategory: ['']
    });
  }

  private createSubcategoryWithData(sub: string): FormGroup {
    return this.formBuilder.group({
      subCategory: [sub, Validators.required]
    });
  }
}
