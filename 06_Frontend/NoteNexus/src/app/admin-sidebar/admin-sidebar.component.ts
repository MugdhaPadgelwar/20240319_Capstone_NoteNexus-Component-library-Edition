import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  constructor(private router: Router) {} // Corrected syntax for constructor

  logout() {
    // Function name should start with lowercase according to convention
    localStorage.clear();
    this.router.navigate(['/']);
    alert('Logged out'); // Assuming you want to navigate to the root path
  }
}
