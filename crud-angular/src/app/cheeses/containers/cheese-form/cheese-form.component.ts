// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Component } from '@angular/core';
// import { Location } from '@angular/common';
// import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';

// import { Cheese } from '../../model/cheese';
// import { CheesesService } from '../../services/cheeses.service';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatOptionModule } from '@angular/material/core';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';

// @Component({
//   selector: 'app-cheese-form',
//   templateUrl: './cheese-form.component.html',
//   styleUrl: './cheese-form.component.scss',
//   imports: [MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule]
// })

// export class CheeseFormComponent {

//   form!: FormGroup;

// constructor(private formBuilder: NonNullableFormBuilder,
//   private service: CheesesService,
//   private snackBar: MatSnackBar,
//   private location: Location,
//   private route: ActivatedRoute) {
// }

// ngOnInit(): void {
//   const cheese: Cheese = this.route.snapshot.data['cheese'];
//   this.form = this.formBuilder.group({
//     _id: [cheese._id],
//     name: [cheese.name, [Validators.required,
//     Validators.minLength(5),
//     Validators.maxLength(100)]],
//     category: [cheese.category, [Validators.required]],
//   });
// }

// onSubmit() {
//   if (this.form.valid) {
//     this.service.save(this.form.value)
//       .subscribe(result => this.onSuccess(), error => this.onError());
//   } else {
//     //this.formUtils.validateAllFormFields(this.form);
//   }
// }

// onCancel() {
//   this.location.back();
// }

// private onSuccess() {
//   this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
//   this.onCancel();
// }

// private onError() {
//   this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
// }
// }
