import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HighlightServiceService } from '../highlight-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit, AfterViewChecked {
  pageId: any;
  content: any;
  token: any;
  userId: any;
  highlighted: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private highlightService: HighlightServiceService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('userToken');
    this.userId = localStorage.getItem('userID');

    this.route.queryParams.subscribe((params) => {
      this.pageId = params['_id'];
      if (this.pageId) {
        this.fetchPageContent();
      } else {
        console.error('Page ID not found');
      }
    });
  }

  fetchPageContent(): void {
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
      complete: () => {
        this.highlightService.highlightAll();
      },
    });
  }

  deletePost(): void {
    const url = `http://localhost:3000/pages/delete?id=${this.pageId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    this.http.delete<any>(url, { headers }).subscribe({
      next: (response) => {
        this.show('Component Deleted!!');
        setTimeout(() => {
          this.navigateShowPost();
        }, 2000);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  publishPost(): void {
    const url = `http://localhost:3000/pages/update?id=${this.pageId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    const body = {
      content: this.content,
      status: 'published',
    };

    this.http.put<any>(url, body, { headers }).subscribe({
      next: (response) => {
        console.log(response);
        this.show('Component Published!!');
        setTimeout(() => {
          this.navigateShowPost();
        }, 2000);
      },
      error: (error) => {
        this.showError(error);
      },
    });
  }

  show(msg: string) {
    this.messageService.add({
      severity: 'custom',
      summary: 'Success',
      detail: `${msg}`,
    });
  }

  showError(msg: any) {
    this.messageService.add({
      severity: 'custom',
      summary: 'Success',
      detail: `${msg}`,
    });
  }
  navigateShowPost() {
    this.router.navigate(['/showpost']);
  }

  ngAfterViewChecked() {
    if (this.content && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
