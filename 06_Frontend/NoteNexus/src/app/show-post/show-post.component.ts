import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css'],
})
export class ShowPostComponent implements OnInit {
  userId: any;
  pages: any[] = [];
  token: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve token and user ID from local storage
    this.token = localStorage.getItem('userToken');
    console.log(this.token);
    this.userId = localStorage.getItem('userID');
    console.log(this.userId);

    if (this.userId) {
      this.fetchPagesByUserId(this.userId);
    } else {
      console.error('User ID not found');
    }
  }

  fetchPagesByUserId(userId: string): void {
    // Construct the URL for fetching pages by user ID
    const url = `http://localhost:3000/pages/user?userId=${userId}`;
    console.log(url);

    // Set up the HTTP headers including the authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    // Make the HTTP GET request to fetch pages
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
