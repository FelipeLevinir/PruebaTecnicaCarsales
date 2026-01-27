import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UiError = {
  title: string;
  detail: string;
  traceId?: string;
};

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private readonly errorSubject = new BehaviorSubject<UiError | null>(null);
  readonly error$ = this.errorSubject.asObservable();

  setError(error: UiError): void {
    this.errorSubject.next(error);
  }

  clear(): void {
    this.errorSubject.next(null);
  }
}
// Migrar a signals