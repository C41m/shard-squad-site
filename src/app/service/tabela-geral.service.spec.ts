import { TestBed } from '@angular/core/testing';

import { TabelaGeralService } from './tabela-geral.service';

describe('TabelaGeralService', () => {
  let service: TabelaGeralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaGeralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
