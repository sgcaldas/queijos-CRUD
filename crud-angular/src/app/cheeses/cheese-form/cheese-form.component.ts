import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Cheese } from '../model/cheese';
import { CheesesService } from '../services/cheeses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cheese-form',
  templateUrl: './cheese-form.component.html',
  styleUrl: './cheese-form.component.scss',
})
export class CheeseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CheesesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit(): void {}

  //   ngOnInit(): void {
  //     const cheese: Cheese = this.route.snapshot.data['cheese'];
  //     this.form = this.formBuilder.group({
  //       _id: [cheese._id],
  //       name: [
  //         cheese.name,
  //         [
  //           Validators.required,
  //           Validators.minLength(5),
  //           Validators.maxLength(100),
  //         ],
  //       ],
  //       category: [cheese.category, [Validators.required]],
  //     });
  //   }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        (result) => this.onSuccess(),
        (error) => this.onError()
      );
    } else {
      //this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    console.log('OnCancel');
    // this.Location.back();
  }

  private onSuccess() {
    this.snackBar.open('Queijo salvo com sucesso! :D', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar queijo :(', '', { duration: 5000 });
  }
}
