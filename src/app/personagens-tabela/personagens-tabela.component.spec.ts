import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonagensTabelaComponent } from './personagens-tabela.component';

describe('PersonagensTabelaComponent', () => {
  let component: PersonagensTabelaComponent;
  let fixture: ComponentFixture<PersonagensTabelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonagensTabelaComponent]
    });
    fixture = TestBed.createComponent(PersonagensTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
