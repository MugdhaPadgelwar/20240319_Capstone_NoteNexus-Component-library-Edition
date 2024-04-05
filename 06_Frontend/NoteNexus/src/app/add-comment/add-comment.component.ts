import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent {
  editorComment: string = '';
  pageId: string = '';
  token: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit() {
    // Extract the ID from the URL query parameter
    this.route.queryParams.subscribe((params) => {
      this.pageId = params['id'];
    });
  }

  saveComment(): void {
    // Construct the URL for updating a page by ID
    const url = `http://localhost:3000/admin/pages/comments?id=${this.pageId}`;

    // HTTP headers including the authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    // Request body containing the updated content and status
    const body = {
      comments: this.editorComment,
    };

    // HTTP POST request to update the page
    this.http.put<any>(url, body, { headers }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}