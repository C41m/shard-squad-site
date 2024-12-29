import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveTabelaComponent } from './wave-tabela.component';

describe('WaveTabelaComponent', () => {
  let component: WaveTabelaComponent;
  let fixture: ComponentFixture<WaveTabelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaveTabelaComponent]
    });
    fixture = TestBed.createComponent(WaveTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
