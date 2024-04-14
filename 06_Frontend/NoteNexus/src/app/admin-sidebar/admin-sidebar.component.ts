import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  constructor(private router: Router, private messageService: MessageService) {}

  logout() {
    this.show('Logged out!!');
    localStorage.clear();
    setTimeout(() => {
      this.navigateShowPost();
    }, 2000);
  }

  show(msg: string) {
    this.messageService.add({
      severity: 'custom',
      summary: 'Success',
      detail: `${msg}`,
    });
  }
  navigateShowPost() {
    this.router.navigate(['/']);
  }
}
