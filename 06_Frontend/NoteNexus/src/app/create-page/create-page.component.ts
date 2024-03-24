import { Component, ViewChild, ElementRef } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.css',
})
export class CreatePageComponent {
  blogContent: string = '';
  postSaved: boolean = false;

  constructor(
    private markdownService: MarkdownService,
    private http: HttpClient
  ) {}

  insertMarkdown(prefix: string, helperText: string, suffix: string) {
    const textareaEl = document.querySelector('textarea');

    if (textareaEl) {
      const textarea = textareaEl as HTMLTextAreaElement;
      // Start represents the index of textarea before selection
      const start = textarea.selectionStart;
      // End represents the index of textarea after selection
      const end = textarea.selectionEnd;

      const selectedText = this.blogContent.substring(start, end);

      // If some text is selected, ignore helper
      if (selectedText) {
        const newText = `${prefix}${selectedText}${suffix}`;
        this.blogContent =
          this.blogContent.substring(0, start) +
          newText +
          this.blogContent.substring(end);
      }
      // Else add Helper
      else {
        this.blogContent =
          this.blogContent.substring(0, start) +
          prefix +
          helperText +
          suffix +
          this.blogContent.substring(end);
      }

      textarea.selectionStart = textarea.selectionEnd = start + prefix.length;
      textarea.focus();
    }
  }
  savePost() {
    const url = 'http://localhost:3000/pages/add';
    const token: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    if (!token) {
      console.error('JWT token not found in local storage');
      return; // Exit function if token is not available
    }
    const userId: string | null = localStorage.getItem('userID');

    const payload = {
      userId: userId,
      content: this.blogContent,
      status: 'draft', // Assuming you want to set a default status of 'draft'
    };

    this.http.post<any>(url, payload, { headers }).subscribe({
      next: (response) => {
        this.postSaved = true;
        this.blogContent = ''; // Clearing the input field on success
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  openFileInput() {
    console.log('File input opened');
  }

  handleImageUpload() {
    console.log('File input opened');
  }
}
