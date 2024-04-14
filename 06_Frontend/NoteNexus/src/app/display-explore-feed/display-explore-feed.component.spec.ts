import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayExploreFeedComponent } from './display-explore-feed.component';

describe('DisplayExploreFeedComponent', () => {
  let component: DisplayExploreFeedComponent;
  let fixture: ComponentFixture<DisplayExploreFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayExploreFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayExploreFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
