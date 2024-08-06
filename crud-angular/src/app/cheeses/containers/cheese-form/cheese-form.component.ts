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
import { FormUtilsService } from '../../../shared/form/form-utils.service';

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
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
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
      name: [cheese.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),],
      ], category: [cheese.category, [
        Validators.required]],
      brands: this.formBuilder.array(this.retrieveBrands(cheese),
        Validators.required
      ),
    });
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
      name: [brand.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),],],
      youtubeUrl: [brand.youtubeUrl, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),]],
    });
  }

  getBrandsFormArray() {
    return (<UntypedFormArray>this.form.get('brands')).controls;
  }

  addNewBrand() {
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
        result => this.onSuccess(),
        error => this.onError()
      );
    } else {
      this.formUtils.validateAllFormFields(this.form);
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
}
