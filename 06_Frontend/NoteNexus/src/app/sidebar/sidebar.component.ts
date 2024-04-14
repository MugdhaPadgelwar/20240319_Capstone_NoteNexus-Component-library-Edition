import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router, private messageService: MessageService) {}

  logout() {
    localStorage.clear();

    this.show();
    setTimeout(() => {
      this.navigateShowPost();
    }, 2000);
  }

  show() {
    this.messageService.add({
      severity: 'custom',
      summary: 'Success',
      detail: 'Logged Out!!',
      icon: 'pi-file',
    });
  }
  navigateShowPost() {
    this.router.navigate(['/']);
  }
}
