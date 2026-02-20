import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { Category } from '../../../../core/interfaces/category';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-category-edit-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export default class CategoryForm {
  // Inyección de dependencias moderna
  private fb = inject(FormBuilder);
  private categoryService = inject(HttpCategory);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Inyectamos ActivatedRoute

  /**
   * Definición del formulario reactivo.
   * - name: Obligatorio.
   * - description: Opcional, máximo 500 caracteres.
   * - parent_id: Opcional, para subcategorías.
   * - isActive: Por defecto true.
   */
  public formData: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.maxLength(500)]],
    parent_id: [null],
    isActive: [true]
  });

  // Estado de carga para bloquear el botón de guardado
  public loading = false;
  // Bandera para saber si estamos en modo edición
  public isEditMode = false;
  // ID de la categoría que se está editando
  private categoryId: string | null = null;

  // Observable que contendrá la lista de categorías para el desplegable.
  // Usamos Observable + AsyncPipe en lugar de suscribirnos manualmente (Best Practice).
  public availableCategories$: Observable<Category[]> = new Observable<Category[]>();

  ngOnInit(): void {
    // 1. Cargar lista de categorías (para el select de padre)
    this.loadCategories();

    // 2. Verificar si hay un ID en la ruta (Modo Edición)
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.isEditMode = true;
      this.loadCategoryData(this.categoryId);
    }
  }

  /**
   * Carga las categorías disponibles desde el servicio.
   * Asigna el observable directamente a la propiedad pública para que el template lo consuma con | async.
   */
  loadCategories() {
    this.availableCategories$ = this.categoryService.getCategories().pipe(
      // tap permite realizar efectos secundarios (como logs) sin alterar el flujo de datos
      tap(data => console.log('Categories loaded:', data))
    );
  }

  /**
   * Carga los datos de la categoría a editar y parchea el formulario.
   */
  loadCategoryData(id: string) {
    console.log('📥 Loading category ID:', id);
    this.loading = true;
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        // Ajustamos el parent_id: si es un objeto populated, tomamos su _id, sino lo dejamos como está
        let parentValue = category.parent_id;
        if (parentValue && typeof parentValue !== 'string') {
          parentValue = (parentValue as Category)._id;
        }

        this.formData.patchValue({
          name: category.name,
          description: category.description,
          parent_id: parentValue,
          isActive: category.isActive
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading category:', err);
        this.loading = false;
        // Podríamos redirigir o mostrar un toast de error
        this.router.navigate(['/dashboard/categories']);
      }
    });
  }

  // Getters para acceder fácilmente a los controles desde el HTML y mostrar errores
  get name() { return this.formData.get('name'); }
  get description() { return this.formData.get('description'); }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.formData.valid) {
      this.loading = true;
      const categoryData = this.formData.value;
      console.log('📋 Form Data:', categoryData, 'Edit Mode:', this.isEditMode, 'ID:', this.categoryId);

      let request$: Observable<Category>;

      if (this.isEditMode && this.categoryId) {
        // En modo edición, llamamos a update
        console.log('🔄 Updating category ID:', this.categoryId);
        request$ = this.categoryService.updateCategory(this.categoryId, categoryData);
      } else {
        // En modo creación, llamamos a create
        console.log('➕ Creating new category');
        request$ = this.categoryService.createCategory(categoryData);
      }

      request$.subscribe({
        next: (res) => {
          console.log('✅ Operation successful:', res);
          this.loading = false;
          // Navegación tras éxito
          this.router.navigate(['/dashboard/categories'])
            .then(success => console.log('Navigation result:', success))
            .catch(err => console.error('Navigation error:', err));
        },
        error: (err) => {
          console.error('❌ Error saving category:', err);
          this.loading = false;
        }
      });
    } else {
      // Si el formulario no es válido, marcamos todos los campos como "tocados" para mostrar los errores visuales
      console.log('Form invalid:', this.formData.errors); // DEBUG
      Object.keys(this.formData.controls).forEach(key => {
        const control = this.formData.get(key);
        if (control?.invalid) {
          console.log(`Field ${key} is invalid:`, control.errors);
        }
      });
      this.formData.markAllAsTouched();
    }
  }
}
