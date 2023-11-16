import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../product-home.service';
import { ActivatedRoute, Router } from '@angular/router'; 



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.productsService.getProduct(this.route.snapshot.params['id']).subscribe(data =>{
      this.product = data;
    });
  }

  editProduct() {
    this.router.navigate(['/product/update', this.product.id]);
  }


  closeProduct() {
    this.router.navigate(['/products']);
  }

  editProductDetail(product:any) {
    this.router.navigate(['/product/update', product]);
  }
  
}

