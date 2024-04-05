import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreDetailPageComponent } from './explore-detail-page.component';

describe('ExploreDetailPageComponent', () => {
  let component: ExploreDetailPageComponent;
  let fixture: ComponentFixture<ExploreDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
