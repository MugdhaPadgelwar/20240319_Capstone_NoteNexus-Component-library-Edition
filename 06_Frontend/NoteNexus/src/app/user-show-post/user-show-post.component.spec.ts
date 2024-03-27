import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowPostComponent } from './user-show-post.component';

describe('UserShowPostComponent', () => {
  let component: UserShowPostComponent;
  let fixture: ComponentFixture<UserShowPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserShowPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserShowPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
