import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeatilPageComponent } from './admin-deatil-page.component';

describe('AdminDeatilPageComponent', () => {
  let component: AdminDeatilPageComponent;
  let fixture: ComponentFixture<AdminDeatilPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDeatilPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDeatilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
