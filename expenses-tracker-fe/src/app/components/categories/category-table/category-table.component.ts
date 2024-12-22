import {Component, inject, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {Category, TransactionType} from "../../../types/types";
import {MatDialog} from "@angular/material/dialog";
import {AddOrEditCategoryDialogComponent} from "../add-or-edit-category-dialog/add-or-edit-category-dialog.component";
import {KeyValuePipe} from "@angular/common";
import {TransactionsFacadeService} from "../../../services/transactions-facade.service";

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    KeyValuePipe
  ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.scss'
})
export class CategoryTableComponent {
  readonly transactionsFacadeService: TransactionsFacadeService = inject(TransactionsFacadeService);
  readonly dialog: MatDialog = inject(MatDialog);

  @Input() categories: Category[] = [];
  @Input() transactionType!: TransactionType;

  openEditCategory(category: Category): void {
    this.dialog.open(AddOrEditCategoryDialogComponent, {
      data: {
        transactionType: this.transactionType,
        category
      },
      width: '500px'
    });
  }

  deleteCategory(category: Category): void {
    this.transactionsFacadeService.removeCategory(this.transactionType, category.id);
  }
}
