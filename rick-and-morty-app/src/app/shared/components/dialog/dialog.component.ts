import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @Input() visible: boolean = false;
  @Input() header: string = '';
  @Input() modal: boolean = true;
  @Input() dismissableMask: boolean = true;
  @Input() closable: boolean = true;
  @Input() styleClass: string = '';
  @Output() visibleChange = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.visible && this.closable) {
      this.close();
    }
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onMaskClick(): void {
    if (this.dismissableMask) {
      this.close();
    }
  }

  onDialogClick(event: Event): void {
    event.stopPropagation();
  }
}