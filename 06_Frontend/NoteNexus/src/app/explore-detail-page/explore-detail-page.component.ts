import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HighlightServiceService } from '../highlight-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-detail-page',
  templateUrl: './explore-detail-page.component.html',
  styleUrls: ['./explore-detail-page.component.css'], // <-- Corrected property name
})
export class ExploreDetailPageComponent implements OnInit, AfterViewChecked {
  pageId: any;
  content: any;
  token: any;
  userId: any;
  highlighted: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private highlightService: HighlightServiceService,
    private router: Router
  ) {}

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
      complete: () => {
        this.highlightService.highlightAll();
      },
    });
  }

  ngAfterViewChecked() {
    if (this.content && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
