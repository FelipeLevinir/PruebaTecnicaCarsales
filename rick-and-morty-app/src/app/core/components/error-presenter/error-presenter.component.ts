import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error-presenter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-presenter.component.html',
  styleUrl: './error-presenter.component.css',
})
export class ErrorPresenterComponent {
  private readonly errorService = inject(ErrorService);

  readonly errors = this.errorService.currentErrors;

  removeError(id: string): void {
    this.errorService.removeError(id);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'success': return 'success';
      case 'info': return 'info';
      default: return '•';
    }
  }
}