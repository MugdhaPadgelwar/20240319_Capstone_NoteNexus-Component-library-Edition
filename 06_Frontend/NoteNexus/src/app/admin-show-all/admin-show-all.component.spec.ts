import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowAllComponent } from './admin-show-all.component';

describe('AdminShowAllComponent', () => {
  let component: AdminShowAllComponent;
  let fixture: ComponentFixture<AdminShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShowAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
