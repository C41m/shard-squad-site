import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDadosComponent } from './filtro-dados.component';

describe('FiltroDadosComponent', () => {
  let component: FiltroDadosComponent;
  let fixture: ComponentFixture<FiltroDadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroDadosComponent]
    });
    fixture = TestBed.createComponent(FiltroDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
