import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TodoItem, TodoService } from '../todo.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let httpMock: HttpTestingController;
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TodoService],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch todos on init', () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo 1', description: 'Description 1', completed: false },
      { id: 2, title: 'Test Todo 2', description: 'Description 2', completed: true },
    ];

    component.ngOnInit();
    const req = httpMock.expectOne(
      'https://66e3e84ed2405277ed1246be.mockapi.io/api/v1/todos'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);

    expect(component.todoList).toEqual(mockTodos.slice(0, 10));
  });
});
