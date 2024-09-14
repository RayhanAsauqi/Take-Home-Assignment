import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() taskName: string = '';
  @Input() taskDescription: string = ''; // Added taskDescription
  @Input() isVisible: boolean = false;
  @Output() save = new EventEmitter<{ name: string, description: string }>(); // Updated to emit an object
  @Output() cancel = new EventEmitter<void>();
  error: string = '';

  handleInputChange(event: Event, field: 'name' | 'description'): void { // Updated to handle both fields
    const input = event.target as HTMLInputElement;
    if (field === 'name') {
      this.taskName = input.value;
    } else {
      this.taskDescription = input.value;
    }
  }

  handleSaveClick(): void {
    if (this.taskName.trim() === '') {
      this.error = 'Task name cannot be empty';
      return;
    }
    this.save.emit({ name: this.taskName, description: this.taskDescription }); // Updated to emit an object
  }

  handleCancelClick(): void {
    this.cancel.emit();
  }
}
