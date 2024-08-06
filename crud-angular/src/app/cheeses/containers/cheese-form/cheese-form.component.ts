import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Cheese } from '../../model/cheese';
import { CheesesService } from '../../services/cheeses.service';
import { Brand } from '../../model/brand';

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
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: [''],
      category: [''],
    });
  }

  ngOnInit(): void {
    const cheese: Cheese = this.route.snapshot.data['cheese'];
    this.form = this.formBuilder.group({
      _id: [cheese._id],
      name: [
        cheese.name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      category: [cheese.category, [Validators.required]],
      brands: this.formBuilder.array(
        this.retrieveBrands(cheese),
        Validators.required
      ),
    });
    console.log(this.form);
    console.log(this.form.value);
  }

  private retrieveBrands(cheese: Cheese) {
    const brands = [];
    if (cheese?.brands) {
      cheese.brands.forEach((brand) => brands.push(this.createBrand(brand)));
    } else {
      brands.push(this.createBrand());
    }
    return brands;
  }

  private createBrand(brand: Brand = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [brand.id],
      name: [
        brand.name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      youtubeUrl: [brand.youtubeUrl, [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),]],
    });
  }

  getBrandsFormArray() {
    return (<UntypedFormArray>this.form.get('brands')).controls;
  }

  addNewLesson() {
    const brands = this.form.get('brands') as UntypedFormArray;
    brands.push(this.createBrand());
  }

  removeBrand(index: number) {
    const brands = this.form.get('brands') as UntypedFormArray;
    brands.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        (result) => this.onSuccess(),
        (error) => this.onError()
      );
    } else {
      alert('form inválido');
      //this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Queijo salvo com sucesso! :D', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar queijo :(', '', { duration: 5000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 4;
      return `Desconheço queijos com menos de ${requiredLength} letras!`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 50;
      return `São mais de ${requiredLength} letras. Isso é um queijo?`;
    }

    return 'Campo inválido!';
  }

  isFormArrayRequired() {
    const brands = this.form.get('brands') as UntypedFormArray;
    return !brands.valid && brands.hasError('required') && brands.touched;
  }
}
