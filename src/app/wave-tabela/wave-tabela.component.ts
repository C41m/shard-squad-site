import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-wave-tabela',
  templateUrl: './wave-tabela.component.html',
  styleUrls: ['./wave-tabela.component.scss']
})
export class WaveTabelaComponent {
  partidasProcessadas: any[] = [];
  dataSource = new MatTableDataSource<any>();
  quantidadeWaves: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wave', 'quantidade'];

  constructor(private homeComponent: HomeComponent) {}

  ngOnInit(): void {
    this.homeComponent.tabelaProcessada$.subscribe(tabela => {
      this.partidasProcessadas = tabela;
      console.log('Tabela Itens montada:', this.partidasProcessadas);
      this.calcularQuantidade();
    });
  }

  calcularQuantidade(): void {
    // Cria um mapa para contar a frequência de cada wave
    const waveCounts: { [wave: number]: number } = {};
  
    // Itera sobre as partidas processadas e conta cada wave
    this.partidasProcessadas.forEach(partida => {
      const wave = partida.wave;
      waveCounts[wave] = (waveCounts[wave] || 0) + 1;
    });
  
    // Converte o mapa para um array utilizável na tabela
    this.quantidadeWaves = Object.keys(waveCounts).map(waveStr => {
      const wave = Number(waveStr);
      return {
        wave: wave, // Valor da wave
        quantidade: waveCounts[wave] // Quantidade de ocorrências
      };
    });
    
    this.dataSource.data = this.quantidadeWaves;
  }
  
  
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
