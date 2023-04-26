import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss'],
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: string[] = [];
  constructor(private productServcie: ProductService) {}

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productServcie.getProductCategories().subscribe(
      (response) => {
        this.productCategories = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
