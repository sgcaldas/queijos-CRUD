import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CheesesService } from '../../services/cheeses.service';
import { Component, ViewChild } from '@angular/core';
import { Cheese } from '../../model/cheese';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheesePage } from '../../model/cheese-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cheeses',
  templateUrl: './cheeses.component.html',
  styleUrl: './cheeses.component.scss',
})
export class CheesesComponent {

  cheeses$: Observable<CheesePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private CheesesService: CheesesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10 }) {
    this.cheeses$ = this.CheesesService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError((error) => {
        this.onError('Erro ao carregar queijos.');
        return of({ cheeses: [], totalElements: 0, totalPages: 0 });
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(cheese: Cheese) {
    this.router.navigate(['edit', cheese._id], { relativeTo: this.route });
  }

  onRemove(cheese: Cheese) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Quer mesmo remover este queijo?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.CheesesService.remove(cheese._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Queijo removido com sucesso!', 'x', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar remover queijo.')
        );
      }
    });
  }
}
