import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService, UiError } from '../error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-presenter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-presenter.component.html',
  styleUrl: './error-presenter.component.css',
})
export class ErrorPresenterComponent {
  private readonly errorService = inject(ErrorService);
  readonly error$: Observable<UiError | null> = this.errorService.error$;

  clear(): void {
    this.errorService.clear();
  }
}
