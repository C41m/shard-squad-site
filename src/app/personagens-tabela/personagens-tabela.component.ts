import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HomeComponent } from '../home/home.component';
import { Statistics } from '../models/game-data.model';

@Component({
  selector: 'app-personagens-tabela',
  templateUrl: './personagens-tabela.component.html',
  styleUrls: ['./personagens-tabela.component.scss']
})
export class PersonagensTabelaComponent  {  
  
  partidasProcessadas: any[] = [];
  mediaPorHeroi: any[] = []; // Resultado das médias agrupadas por herói
  mediaPorSuportes: any[] = [];

  dataSourceHeroi = new MatTableDataSource<any>();
  dataSourceSuporte = new MatTableDataSource<any>();
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('sortHeroi') sortHeroi!: MatSort;
  @ViewChild('sortSuporte') sortSuporte!: MatSort;
  
  constructor(private homeComponent: HomeComponent) { }

  colunasTabelaHeroi: string[] = ['heroi', 'qntPartidasHeroi', 'mediaDamageHeroi', 'mediaDamageBossHeroi', 'mediaDpsHeroi', ];
  colunasTabelaSuporte: string[] = ['suporte', 'qntPartidasSuporte', 'mediaDamageSuporte', 'mediaDamageBossSuporte', 'mediaDpsSuporte', ];

  ngOnInit(): void {
    this.homeComponent.tabelaProcessada$.subscribe(tabela => {
      this.partidasProcessadas = tabela;

      console.log('Tabela Personagens montada:', this.partidasProcessadas);
      this.calcularMedias();
    });
  }

  calcularMedias(): void {
    const heroiAgrupamento: { [heroi: string]: { somaDamage: number, somaDamageBoss: number, somaDps: number, quantidade: number } } = {};
    const suportesAgrupamento: { [suporte: string]: { somaDamage: number, somaDamageBoss: number, somaDps: number, quantidade: number } } = {};
  
    this.partidasProcessadas.forEach(partida => {
      const heroi = partida.heroi; // O nome do herói principal
      const stats: Statistics[] = partida.statistics;  // Estatísticas de todos os personagens, incluindo o herói e os suportes
      
      // Calcula as médias para o herói principal
      const heroiStats = stats[0]; // O herói sempre será o primeiro
      if (!heroiAgrupamento[heroi]) {
        heroiAgrupamento[heroi] = { somaDamage: 0, somaDamageBoss: 0, somaDps: 0, quantidade: 0 };
      }
      heroiAgrupamento[heroi].somaDamage += heroiStats.damage || 0;
      heroiAgrupamento[heroi].somaDamageBoss += heroiStats.damageBoss || 0;
      heroiAgrupamento[heroi].somaDps += heroiStats.dps || 0;
      heroiAgrupamento[heroi].quantidade += 1;
  
      // Calcula as médias para os suportes (começando do segundo item)
      stats.slice(1).forEach((suporteStats: Statistics) => {
        const suporte = suporteStats.characterName;  // Agora o "characterName" já está na estatística
  
        if (!suportesAgrupamento[suporte]) {
          suportesAgrupamento[suporte] = { somaDamage: 0, somaDamageBoss: 0, somaDps: 0, quantidade: 0 };
        }
  
        suportesAgrupamento[suporte].somaDamage += suporteStats.damage || 0;
        suportesAgrupamento[suporte].somaDamageBoss += suporteStats.damageBoss || 0;
        suportesAgrupamento[suporte].somaDps += suporteStats.dps || 0;
        suportesAgrupamento[suporte].quantidade += 1;
      });
    });
  
    // Preencher os dados nas propriedades `mediaPorHeroi` e `mediaPorSuportes`
    this.mediaPorHeroi = Object.keys(heroiAgrupamento).map(heroi => ({
      heroi,
      qntPartidas: heroiAgrupamento[heroi].quantidade,
      mediaDamage: heroiAgrupamento[heroi].somaDamage / heroiAgrupamento[heroi].quantidade,
      mediaDamageBoss: heroiAgrupamento[heroi].somaDamageBoss / heroiAgrupamento[heroi].quantidade,
      mediaDps: heroiAgrupamento[heroi].somaDps / heroiAgrupamento[heroi].quantidade
    }));

    this.mediaPorSuportes = Object.keys(suportesAgrupamento).map(suporte => ({
      suporte,
      qntPartidas: suportesAgrupamento[suporte].quantidade,
      mediaDamage: suportesAgrupamento[suporte].somaDamage / suportesAgrupamento[suporte].quantidade,
      mediaDamageBoss: suportesAgrupamento[suporte].somaDamageBoss / suportesAgrupamento[suporte].quantidade,
      mediaDps: suportesAgrupamento[suporte].somaDps / suportesAgrupamento[suporte].quantidade
    }));

    // Atualizando o dataSource
    this.dataSourceHeroi.data = this.mediaPorHeroi;
    this.dataSourceSuporte.data = this.mediaPorSuportes;
    }
    ngAfterViewInit(): void {
      this.dataSourceHeroi.sort = this.sortHeroi;
      this.dataSourceSuporte.sort = this.sortSuporte; 
    }
    
    
  
}
