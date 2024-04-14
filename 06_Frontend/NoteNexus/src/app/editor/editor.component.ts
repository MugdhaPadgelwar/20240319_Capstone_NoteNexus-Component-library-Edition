import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';

interface PostPayload {
  userId: string;
  html_code: string;
  css_code?: string;
  javascript_code?: string;
  status: 'draft' | 'published';
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';
  postSaved: boolean = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  run() {
    const result = document.querySelector('#result') as HTMLIFrameElement;
    if (result.contentDocument) {
      result.contentDocument.body.innerHTML =
        `<style>${this.cssCode}</style>` + this.htmlCode;

      const executeJS = new Function(this.jsCode);
      executeJS();
    } else {
      console.error('contentDocument is null.');
    }
  }

  savePost() {
    const url = 'http://localhost:3000/pages/add';
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

    const payload: PostPayload = {
      userId: userId,
      html_code: this.htmlCode,
      css_code: this.cssCode,
      javascript_code: this.jsCode,
      status: 'draft',
    };

    this.http.post<any>(url, payload, { headers }).subscribe({
      next: (response) => {
        this.postSaved = true;

        this.show();
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      error: (error) => {
        this.showError(error);
      },
    });
  }

  show() {
    this.messageService.add({
      severity: 'custom',
      summary: 'Success',
      detail: 'Component added!! ',
    });
  }

  showError(error: any) {
    this.messageService.add({
      severity: 'custom',
      summary: `${error}`,
      detail: 'Component added!! ',
    });
  }
}
