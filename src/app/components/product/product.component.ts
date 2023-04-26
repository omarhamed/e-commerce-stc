import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { Rating } from 'src/app/common/rating';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = new Product(0, '', 0, '', '', '', new Rating(0, 0));
  currentCategoryName: any;
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'image',
    'view',
    'update',
    'delete',
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const hasCategoryName: boolean =
      this.route.snapshot.paramMap.has('category');

    if (hasCategoryName) {
      this.currentCategoryName = this.route.snapshot.paramMap.get('category');
    } else {
      this.currentCategoryName = null;
    }

    this.productService.getProductList(this.currentCategoryName).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
