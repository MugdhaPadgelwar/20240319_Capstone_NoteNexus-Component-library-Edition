import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrl: './sub-nav.component.css',
})
export class SubNavComponent {
  constructor(private router: Router, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
