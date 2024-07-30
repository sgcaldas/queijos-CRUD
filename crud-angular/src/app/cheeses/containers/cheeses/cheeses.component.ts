import { CheesesService } from '../../services/cheeses.service';
import { Component } from '@angular/core';
import { Cheese } from '../../model/cheese';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cheeses',
  templateUrl: './cheeses.component.html',
  styleUrl: './cheeses.component.scss'
})
export class CheesesComponent {

  cheeses$: Observable<Cheese[]>;
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private CheesesService: CheesesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cheeses$ = this.CheesesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar queijos.')
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
