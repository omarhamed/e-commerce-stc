import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { Rating } from 'src/app/common/rating';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss'],
})
export class ProductNewComponent implements OnInit {
  newProduct: Product = new Product(0, '', 0, '', '', '', new Rating(0, 0));
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}
  productForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(4)]],
    price: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    category: ['', [Validators.required, Validators.minLength(4)]],
    ratingCount: ['', [Validators.required, Validators.minLength(4)]],
    ratingRate: ['', [Validators.required, Validators.minLength(4)]],
  });
  hide: boolean = false;

  ngOnInit(): void {}

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.productForm.value);
    this.newProduct.id = this.productForm.get('id')?.value;
    this.newProduct.title = this.productForm.get('title')?.value;
    this.newProduct.price += this.productForm.get('price')?.value;
    this.newProduct.description = this.productForm.get('description')?.value;
    this.newProduct.category = this.productForm.get('category')?.value;
    this.newProduct.image = this.productForm.get('image')?.value;
    this.newProduct.rating.count = this.productForm.get('ratingCount')?.value;
    this.newProduct.rating.rate = this.productForm.get('ratingRate')?.value;
    this.productService.insertNewProduct(this.newProduct).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSaveClick() {
    if (!this.productForm.valid) {
      return;
    }
    console.log(this.productForm.value);
    this.productService.insertNewProduct(this.newProduct).subscribe(
      (response) => {
        //Add Project to Grid
        var p: Product = new Product(0, '', 0, '', '', '', new Rating(0, 0));
        p.id = response.id;
        p.title = response.title;
        p.price += response.price;
        p.description = response.description;
        p.category = response.category;
        p.image = response.image;
        p.rating.count = response.rating.count;
        p.rating.rate = response.rating.rate;
        //Clear New Project Dialog - TextBoxes
        this.newProduct.id = 0;
        this.newProduct.title = '';
        this.newProduct.price += 0;
        this.newProduct.description = '';
        this.newProduct.category = '';
        this.newProduct.image = '';
        this.newProduct.rating.count = 0;
        this.newProduct.rating.rate = 0;
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
