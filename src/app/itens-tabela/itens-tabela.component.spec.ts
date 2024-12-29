import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensTabelaComponent } from './itens-tabela.component';

describe('ItensTabelaComponent', () => {
  let component: ItensTabelaComponent;
  let fixture: ComponentFixture<ItensTabelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItensTabelaComponent]
    });
    fixture = TestBed.createComponent(ItensTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
