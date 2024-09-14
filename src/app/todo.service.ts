import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://66e3e84ed2405277ed1246be.mockapi.io/api/v1/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }
  postTodos(todos: Partial<TodoItem>): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, todos);
  }

  updateTodo(id: number, todo: Partial<TodoItem>): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/${id}`, todo);
  }
  deleteTodos(id: number): Observable<TodoItem> {
    return this.http.delete<TodoItem>(`${this.apiUrl}/${id}`);
  }
}
