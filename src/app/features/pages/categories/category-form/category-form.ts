import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  private formBuilder = inject( FormBuilder );
  private route = inject( ActivatedRoute );
  private router = inject( Router );

  public categoryForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: [''],
  });
  public categoryId: string | null = null;
  public isEditMode: boolean = false;
  public loading: any = false;

  constructor() {}

  ngOnInit(): void {
    // Obtener datos de la ruta para determinar si es modo edición y cargar datos existentes si es necesario
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.categoryId;
  }

  onSubmit() {
    // Handle form submission logic here
    if( this.categoryForm.valid ) {
      this.loading = true;

      const categoryData = this.categoryForm.value;

      if( this.isEditMode && this.categoryId ) {
        // Update existing category
        console.log('Updating category:', categoryData);
      } else {
        // Create new category
        console.log('Creating new category:', categoryData);
      }

      this.categoryForm.reset();
      this.loading = false;
      //this.router.navigate(['/dashboard/categories']);
    }
    else {
      console.log('Form is invalid');
      this.categoryForm.markAllAsTouched();
    }
  }
  onReset() {
    // Handle form reset logic here
    this.categoryForm.reset();
    this.router.navigate(['/dashboard/categories']);
  }
}
