import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  pageId: any;
  content: any;
  token: any;
  userId: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve token and user ID from local storage
    this.token = localStorage.getItem('userToken');
    this.userId = localStorage.getItem('userID');

    // Subscribe to query parameters to get the page ID
    this.route.queryParams.subscribe((params) => {
      this.pageId = params['_id'];
      if (this.pageId) {
        this.fetchPageContent(); // Fetch page content if page ID is available
      } else {
        console.error('Page ID not found');
      }
    });
  }

  fetchPageContent(): void {
    // Construct the URL for fetching page content by ID
    const url = `http://localhost:3000/pages/get?id=${this.pageId}`;

    // Set up the HTTP headers including the authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    // Make the HTTP GET request to fetch page content
    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        this.content = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
