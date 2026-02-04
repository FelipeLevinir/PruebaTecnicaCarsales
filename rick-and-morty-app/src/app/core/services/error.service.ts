import { Injectable, signal } from '@angular/core';

export type ErrorMessage = {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  timestamp: Date;
};

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private readonly errors = signal<ErrorMessage[]>([]);

  readonly currentErrors = this.errors.asReadonly();

  showError(message: string): void {
    this.addMessage(message, 'error');
  }

  showWarning(message: string): void {
    this.addMessage(message, 'warning');
  }

  showInfo(message: string): void {
    this.addMessage(message, 'info');
  }

  showSuccess(message: string): void {
    this.addMessage(message, 'success');
  }

  private addMessage(message: string, type: ErrorMessage['type']): void {
    const error: ErrorMessage = {
      id: crypto.randomUUID(),
      message,
      type,
      timestamp: new Date(),
    };

    this.errors.update((current) => [...current, error]);

    // Auto-remove after 5 seconds
    setTimeout(() => this.removeError(error.id), 5000);
  }

  removeError(id: string): void {
    this.errors.update((current) => current.filter((e) => e.id !== id));
  }

  clearAll(): void {
    this.errors.set([]);
  }
}