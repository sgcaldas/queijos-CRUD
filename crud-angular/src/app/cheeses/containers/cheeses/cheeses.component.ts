import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CheesesService } from '../../services/cheeses.service';
import { Component } from '@angular/core';
import { Cheese } from '../../model/cheese';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cheeses',
  templateUrl: './cheeses.component.html',
  styleUrl: './cheeses.component.scss',
})
export class CheesesComponent {
  cheeses$: Observable<Cheese[]> | null = null;
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private CheesesService: CheesesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.cheeses$ = this.CheesesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar queijos.');
        return of([]);
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
            this.snackBar.open('Queijo removido com sucesso!', 'X', {
              duration: 5000,
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
