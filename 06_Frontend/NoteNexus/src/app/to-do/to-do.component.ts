import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  todos: any[] | undefined;
  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  newTodoText: string = '';
  todoSaved: boolean = false;

  ngOnInit(): void {
    this.getTodos();
  }

  saveTodo() {
    const url = 'http://localhost:3000/todos/add';
    const token: string | null = localStorage.getItem('userToken');
    const userId: string | null = localStorage.getItem('userID');

    if (!token || !userId) {
      console.error('JWT token or userID not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const todoObj = {
      userId: userId,
      title: this.newTodoText,
      status: 'pending',
    };

    this.http.post<any>(url, todoObj, { headers }).subscribe({
      next: (response) => {
        console.log('Todo added successfully:', response);

        this.todoSaved = true;

        this.newTodoText = '';
        this.getTodos();
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  getTodos() {
    const userId: string | null = localStorage.getItem('userID');
    const token: string | null = localStorage.getItem('userToken');

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `http://localhost:3000/todos/get?userId=${userId}`;
    this.http.get<any[]>(url, { headers }).subscribe({
      next: (response) => {
        this.todos = response;
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
      },
    });
  }

  deleteTodo(todoId: string) {
    const url = `http://localhost:3000/todos/delete?todoId=${todoId}`;
    const token: string | null = localStorage.getItem('userToken');

    if (!token) {
      console.error('JWT token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.delete<any>(url, { headers }).subscribe({
      next: (response) => {
        this.show();

        this.getTodos();
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  updateTodoStatus(todoId: string) {
    const url = `http://localhost:3000/todos/update?todoId=${todoId}`;
    const token: string | null = localStorage.getItem('userToken');

    if (!token) {
      console.error('JWT token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const updatedTodo = {
      status: 'completed',
    };

    this.http.put<any>(url, updatedTodo, { headers }).subscribe({
      next: (response) => {
        console.log('Todo status updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating todo status:', error);
      },
    });
  }

  show() {
    this.messageService.add({
      severity: 'custom',
      summary: 'Success',
      detail: 'Todo Deleted',
    });
  }
  goHome(): void {
    this.router.navigate(['/']);
  }
}
