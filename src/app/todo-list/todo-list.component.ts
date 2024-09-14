import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService, TodoItem } from '../todo.service'; // Import TodoItem from the service
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  newTask: string = '';
  selectedTaskId: number | null = null;
  taskName: string = '';
  taskDescription: string = ''; // Added taskDescription
  showModal: boolean = false;
  showAlert: boolean = false;
  newTaskDescription: string = '';
  @ViewChild('todoText') todoInputRef: ElementRef<HTMLInputElement> = null!;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe((data: TodoItem[]) => {
      console.log('Fetched Todos:', data);
      this.todoList = data.slice(0, 10).sort((a, b) => b.id - a.id);
    });
  }

  getNextId(): number {
    const lastId = localStorage.getItem('lastTodoId');
    const newId = lastId ? Number(lastId) + 1 : 1;
    localStorage.setItem('lastTodoId', newId.toString());
    return newId;
  }

  addTask(title: string, description: string): void {
    if (title.trim() === '') {
      this.showAlert = true;
      return;
    }
    this.showAlert = false;

    const newTodoItem: TodoItem = {
      id: this.getNextId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    this.todoService.postTodos(newTodoItem).subscribe({
      next: (todo: TodoItem) => {
        console.log('Posted Todo:', todo);
        this.todoList.unshift(todo);
        this.todoInputRef.nativeElement.value = '';
        this.newTaskDescription = '';
      },
      error: (error) => {
        console.error('Error posting todo:', error);
        alert('Failed to add the new task. Please try again.');
      },
    });
  }

  deleteTask(id: number): void {
    this.todoService.deleteTodos(id).subscribe({
      next: () => {
        this.todoList = this.todoList.filter((item) => item.id !== id);
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
        alert('Failed to delete the task. Please try again.');
      },
    });
  }

  editTask(id: number, updateTitle: string, updateDescription: string): void { // Updated to accept description
    const updatedTodo: Partial<TodoItem> = { title: updateTitle, description: updateDescription };
    this.todoService.updateTodo(id, updatedTodo).subscribe({
      next: (todo: TodoItem) => {
        const index = this.todoList.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.todoList[index] = todo;
        }
      },
      error: (error) => {
        console.log('Error updating todo:', error);
        alert('Failed to update the task. Please try again.');
      },
    });
    this.showModal = false;
  }

  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find((item) => item.id === id);
    if (todoItem) {
      const updatedTodo: Partial<TodoItem> = { completed: !todoItem.completed };

      // Update the todo item on the server
      this.todoService.updateTodo(id, updatedTodo).subscribe({
        next: (updatedTodoItem: TodoItem) => {
          // Update the todo item in the local list
          const index = this.todoList.findIndex((item) => item.id === id);
          if (index !== -1) {
            this.todoList[index] = updatedTodoItem;
          }
        },
        error: (error) => {
          console.error('Error updating todo:', error);
          alert('Failed to update the task. Please try again.');
        },
      });
    }
  }

  showEditModal(id: number, title: string, description: string): void { // Updated to accept description
    this.selectedTaskId = id;
    this.taskName = title;
    this.taskDescription = description; // Set taskDescription
    this.showModal = true;
  }

  handleSaveTask(updatedTask: { name: string, description: string }): void { // Updated to accept an object
    if (this.selectedTaskId !== null) {
      this.editTask(this.selectedTaskId, updatedTask.name, updatedTask.description);
    }
  }

  handleCancelEdit(): void {
    this.showModal = false;
  }
}
