import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-ranking-menor-tempo',
  templateUrl: './ranking-menor-tempo.component.html',
  styleUrls: ['./ranking-menor-tempo.component.scss']
})
export class RankingMenorTempoComponent {
  partidasProcessadas: any[] = [];
  dataSource = new MatTableDataSource<any>();
  tabelaMenorTempo: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['jogador', 'tempo'];

  constructor(private homeComponent: HomeComponent) {}

  ngOnInit(): void {
    this.homeComponent.tabelaProcessada$.subscribe(tabela => {
      this.partidasProcessadas = tabela; // Armazena a tabela original
    // Ordena as partidas pelo tempo (em segundos) e seleciona os 20 menores
    const menoresTempos = this.partidasProcessadas
      .sort((a, b) => this.tempoEmSegundos(a.end_time) - this.tempoEmSegundos(b.end_time))
      .slice(0, 10);

    this.dataSource.data = menoresTempos; // Atualiza o dataSource com os menores tempos
  });
}

// Função para converter o tempo (MM:SS.sss) em segundos
tempoEmSegundos(tempo: string): number {
  const [minutos, resto] = tempo.split(':').map(parseFloat);
  return minutos * 60 + resto;
}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

