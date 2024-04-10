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
    this.route.queryParams.subscribe((params) => {
      this.pageId = params['id'];
    });
  }

  saveComment(): void {
    const url = `http://localhost:3000/admin/pages/comments?id=${this.pageId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    const body = {
      comments: this.editorComment,
    };

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
