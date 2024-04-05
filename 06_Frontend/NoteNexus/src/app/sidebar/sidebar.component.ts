import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // Note: Correct property name is 'styleUrls'
})
export class SidebarComponent {
  constructor(private router: Router) {} // Corrected syntax for constructor

  logout() {
    // Function name should start with lowercase according to convention
    localStorage.clear();
    this.router.navigate(['/']);
    alert('Logged out'); // Assuming you want to navigate to the root path
  }
}
