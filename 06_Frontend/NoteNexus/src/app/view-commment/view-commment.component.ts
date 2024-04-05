import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // You're using `route` but you haven't imported `ActivatedRoute` yet.

@Component({
  selector: 'app-view-commment',
  templateUrl: './view-commment.component.html',
  styleUrls: ['./view-commment.component.css'], // <-- Corrected property name
})
export class ViewCommmentComponent implements OnInit {
  content: any;
  pageId: any;
  token: any;
  userId: any;
  highlighted: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {} // <- Added ActivatedRoute here

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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

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
  convertArrayToString(comments: string[]): string {
    return comments.join('\n'); // Join comments with a new line
  }
}
