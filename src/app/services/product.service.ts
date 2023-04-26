import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { baseURL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProductList(currentCategoryName: any): Observable<Product[]> {
    if (currentCategoryName) {
      return this.httpClient
        .get<Product[]>(`${baseURL}/products/category/${currentCategoryName}`)
        .pipe(map((response) => response));
    } else {
      return this.httpClient
        .get<Product[]>(`${baseURL}/products`)
        .pipe(map((response) => response));
    }
  }

  getProductCategories(): Observable<string[]> {
    return this.httpClient
      .get<string[]>(`${baseURL}/products/categories`)
      .pipe(map((response) => response));
  }

  getProductById(productId: any) {
    return this.httpClient
      .get<Product>(`${baseURL}/products/${productId}`)
      .pipe(map((response) => response));
  }

  insertNewProduct(product: Product) {
    return this.httpClient.post<Product>(`${baseURL}/products`, product);
  }
}
