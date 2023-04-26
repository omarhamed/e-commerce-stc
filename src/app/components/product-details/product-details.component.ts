import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs';
import { Product } from 'src/app/common/product';
import { Rating } from 'src/app/common/rating';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product(0, '', 0, '', '', '', new Rating(0, 0));
  productId: any;
  starRating = 0;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductById(this.productId);
  }
  getProductById(productId: any) {
    this.productService.getProductById(productId).subscribe((response) => {
      this.product = response;
    });
  }
}
