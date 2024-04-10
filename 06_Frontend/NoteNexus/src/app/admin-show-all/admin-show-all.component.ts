import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-show-all',
  templateUrl: './admin-show-all.component.html',
  styleUrls: ['./admin-show-all.component.css'],
})
export class AdminShowAllComponent implements OnInit {
  pages: any[] = [];
  token: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('userToken');

    this.fetchPublishedPages();
  }

  fetchPublishedPages(): void {
    const url = `http://localhost:3000/admin/published-pages`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    this.http.get<any[]>(url, { headers }).subscribe({
      next: (response) => {
        this.pages = response;
        console.log(this.pages);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
