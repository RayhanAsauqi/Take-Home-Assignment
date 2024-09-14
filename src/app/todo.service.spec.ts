import { TestBed } from '@angular/core/testing';

import { TodoItem, TodoService } from './todo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

function createTodoItem(overrides: Partial<TodoItem> = {}): TodoItem {
  return {
    id: 1,
    title: 'Default Title',
    completed: false,
    ...overrides,
  };
}

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TodoService],
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve todos from the Mock Api via GET', () => {
    const dummyTodos: TodoItem[] = [
      createTodoItem({ id: 1, title: 'Todo 1', completed: false }),
      createTodoItem({ id: 2, title: 'Todo 2', completed: true }),
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(dummyTodos);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodos);
  });

  it('should add a new todo via POST', () => {
    const newTodo: Partial<TodoItem> = {
      title: 'Test Post Todo',
      completed: false,
    };
    const returnedTodo = createTodoItem({ id: 3, ...newTodo });
    spyOn(service, 'postTodos').and.returnValue(of(returnedTodo));
    service.postTodos(newTodo).subscribe((todo) => {
      expect(todo).toEqual(returnedTodo);
    });
  });

  it('should update an existing todo via PUT', () => {
    const updateData: Partial<TodoItem> = {
      title: 'Updated Todo',
      completed: true,
    };
    const updatedTodo = createTodoItem({ id: 1, ...updateData });

    service.updateTodo(1, updateData).subscribe((todo) => {
      expect(todo).toEqual(updatedTodo);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateData);
    req.flush(updatedTodo);
  });

  it('should delete an existing todo via DELETE', () => {
    const deletedTodo = createTodoItem({ id: 1 });

    service.deleteTodos(1).subscribe((todo) => {
      expect(todo).toEqual(deletedTodo);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedTodo);
  });
});
