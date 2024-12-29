import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMenorTempoComponent } from './ranking-menor-tempo.component';

describe('RankingMenorTempoComponent', () => {
  let component: RankingMenorTempoComponent;
  let fixture: ComponentFixture<RankingMenorTempoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingMenorTempoComponent]
    });
    fixture = TestBed.createComponent(RankingMenorTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
