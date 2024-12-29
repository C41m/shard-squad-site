import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { TabelaGeralService } from '../service/tabela-geral.service';

@Component({
  selector: 'app-filtro-dados',
  templateUrl: './filtro-dados.component.html',
  styleUrls: ['./filtro-dados.component.scss']
})
export class FiltroDadosComponent implements OnInit {
  
  @Output() filtrosAplicados = new EventEmitter<{ versoes: string[], vitoriaDerrota: string[] }>();

  versoesDisponiveis: string[] = [];
  vitoriaDerrotaDisponiveis: string[] = [];
  
  selectedVersoes: string[] = [];
  selectedVitoriaDerrota: string[] = [];
  partidasProcessadas: any[] = [];
  
  constructor(private tabelaGeralService: TabelaGeralService) {}

  ngOnInit(): void {
    this.tabelaGeralService.tabelaProcessada$.subscribe(tabela => {
      console.log('Tabela montada:', tabela);
      this.partidasProcessadas = tabela;
      this.processarOpcoesDeFiltro(tabela);
    });
  }

  processarOpcoesDeFiltro(tabela: any[]): void {
    // Gera as opções únicas para os filtros
    this.versoesDisponiveis = Array.from(new Set(tabela.map(item => item.versao)));
    this.vitoriaDerrotaDisponiveis = Array.from(new Set(tabela.map(item => item.win ? 'Vitória' : 'Derrota')));
  }

  emitirFiltros(): void {
    // Emite os filtros aplicados
    this.filtrosAplicados.emit({
      versoes: this.selectedVersoes.length ? this.selectedVersoes : this.versoesDisponiveis,
      vitoriaDerrota: this.selectedVitoriaDerrota.length ? this.selectedVitoriaDerrota : this.vitoriaDerrotaDisponiveis
    });
  }
}


