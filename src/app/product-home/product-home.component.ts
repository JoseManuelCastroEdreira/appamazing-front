import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../product-home.service';
import { Router } from '@angular/router';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-home',
  styleUrls: ['./product-home.component.css'],
  templateUrl: './product-home.component.html',
})

export class ProductHomeComponent implements OnInit{
  products: any = [];

  

  constructor(private productsService: ProductsService, private router: Router, public dialog: MatDialog){}

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

  openDeleteDialog(productId: number): void{
    this.dialog.open(ProductDeleteComponent, {data:{productId: productId}});
  }


 displayedColumns: string[] = ['id', 'name', 'stock', 'price', 'active', 'date_added', 'actions'];
}
