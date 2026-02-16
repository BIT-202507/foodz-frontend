import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { HttpCategory } from '../../../../core/services/http-category';
import { Category } from '../../../../core/interfaces/category';

@Component({
  selector: 'app-category-list',
  imports: [ ReactiveFormsModule, RouterLink, AsyncPipe ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private categoryService = inject(HttpCategory);

  // Stream de datos que alimentará la vista
  public categories$: Observable<Category[]> = new Observable<Category[]>();

  ngOnInit(): void {
    this.loadCategories();
  }

  /**
   * Inicia la carga de categorías.
   * No nos suscribimos aquí, solo definimos el stream.
   */
  loadCategories() {
    this.categories$ = this.categoryService.getCategories().pipe(
      tap(data => console.log('List loaded:', data))
    );
  }

  /**
   * Método auxiliar para obtener el nombre de la categoría padre de forma segura.
   * Maneja el tipo unión 'string | Category' del modelo.
   */
  getParentName(cat: Category): string | undefined {
    if (cat.parent_id && typeof cat.parent_id !== 'string') {
      return (cat.parent_id as Category).name;
    }
    return undefined;
  }

  /**
   * Elimina una categoría tras confirmar con el usuario.
   * IMPORTANTE: Al eliminar, debemos recargar la lista para que el Observable
   * emita los nuevos datos y el AsyncPipe actualice la tabla.
   */
  deleteCategory(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          console.log('Categoría eliminada con éxito');
          // Volvemos a cargar las categorías para actualizar la vista
          this.loadCategories();
        },
        error: (err) => {
          console.error('Error al eliminar categoría:', err);
          alert('Hubo un error al eliminar la categoría.');
        }
      });
    }
  }
}
