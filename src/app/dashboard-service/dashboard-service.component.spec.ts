import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardServiceComponent } from './dashboard-service.component';

describe('DashboardServiceComponent', () => {
  let component: DashboardServiceComponent;
  let fixture: ComponentFixture<DashboardServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardServiceComponent]
    });
    fixture = TestBed.createComponent(DashboardServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
