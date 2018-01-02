import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryServices: CategoryService,
    private productService: ProductService) {
      this.categories$ = this.categoryServices.getCategory();
      this.id = this.route.snapshot.paramMap.get('id');
      // tslint:disable-next-line:curly
      if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  save(product): void {
    if (this.id) this.productService.update(this.id, product); // якщо є ід обновлюємо, якщо нема тоді створюжмо
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit() {
  }

}
