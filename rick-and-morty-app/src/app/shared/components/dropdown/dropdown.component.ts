import { Component, Input, Output, EventEmitter, HostListener, ElementRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() placeholder: string = 'Seleccionar';
  @Input() disabled: boolean = false;
  @Output() change = new EventEmitter<any>();

  isOpen = false;
  selectedValue: any = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: any): void {
    const value = this.optionValue ? option[this.optionValue] : option;
    this.selectedValue = value;
    this.onChange(value);
    this.change.emit({ value });
    this.isOpen = false;
    this.onTouched();
  }

  getSelectedLabel(): string {
    if (this.selectedValue === null || this.selectedValue === undefined || this.selectedValue === '') {
      return this.placeholder;
    }

    const selected = this.options.find(opt => {
      const optValue = this.optionValue ? opt[this.optionValue] : opt;
      return optValue === this.selectedValue;
    });

    if (selected) {
      return this.optionLabel ? selected[this.optionLabel] : selected;
    }

    return this.placeholder;
  }

  isSelected(option: any): boolean {
    const optValue = this.optionValue ? option[this.optionValue] : option;
    return optValue === this.selectedValue;
  }
}