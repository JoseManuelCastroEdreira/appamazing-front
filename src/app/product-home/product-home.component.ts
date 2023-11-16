import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../product-home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-home',
  styleUrls: ['./product-home.component.css'],
  templateUrl: './product-home.component.html',
})

export class ProductHomeComponent implements OnInit{
  products: any = [];
  

  constructor(private productsService: ProductsService, private router: Router){}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data =>{
      this.products = data;
    })
  }

  openDetailForm(row: any){
    this.router.navigate(['/product', row.id]);
  }

  editProductDetail(product:any) {
    this.router.navigate(['/product/update', product]);
  }


 displayedColumns: string[] = ['id', 'name', 'stock', 'price', 'active', 'date_added', 'actions'];
}
