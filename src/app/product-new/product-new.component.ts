import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../product-home.service';
import { Category } from '../Models/Category';
import { CategoriesService } from '../category.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  categories: any = [];
  stockStatus: string = 'En stock';

  category: Category = new Category();
  name: string;
  stock: number;
  price: number;
  active: boolean = false;
  date_added: Date;


  constructor(private router: Router, private productsService: ProductsService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.loadCategories();
  }

  newProduct(){
    const product = {
      name: this.name,
      stock: this.stock,
      price: this.price,
      active: this.active,
      date_added: this.date_added,
      category: this.category
    }

    this.productsService.newProduct(product);
    this.navigateToHome();
  }

  loadCategories(){
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  cancelInsert(){
    this.navigateToHome();
  }

  navigateToHome(){
    this.router.navigate(['/products']);
  }

  getStatusText(): string {
    return this.stockStatus;
  }
}
