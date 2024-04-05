import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommmentComponent } from './view-commment.component';

describe('ViewCommmentComponent', () => {
  let component: ViewCommmentComponent;
  let fixture: ComponentFixture<ViewCommmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCommmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCommmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
