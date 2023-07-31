import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Product } from '../product';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-product-add-forms2',
  templateUrl: './product-add-forms2.component.html',
  styleUrls: ['./product-add-forms2.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddForms2Component implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private protectService: ProductService,
    private alertifySercice: AlertifyService) { }


  productAddForm!: FormGroup;
  product: Product = new Product();
  categories!: Category[];

  createproductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      imageUrl: ["", Validators.required],
      price: ["", Validators.required],
      categoryId: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.createproductAddForm();
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
    });
  }


  add() {
    if (this.productAddForm.valid) { //form geçerli ise
      this.product = Object.assign({}, this.productAddForm.value)
    }

    this.protectService.addProduct(this.product).subscribe(data => {
      this.alertifySercice.success(data.name + "başarıyla eklendi");
    });
  }

}
