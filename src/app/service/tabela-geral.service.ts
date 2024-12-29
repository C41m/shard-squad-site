import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { DashboardService } from '../dashboard-service/dashboard-service.component';
import { GameData } from '../models/game-data.model';
import { MatTableDataSource } from '@angular/material/table';
@Injectable({
  providedIn: 'root'
})
export class TabelaGeralService  {
  private tabelaProcessadaSubject = new BehaviorSubject<any[]>([]);
  tabelaProcessada$ = this.tabelaProcessadaSubject.asObservable();
  
  dataSource = new MatTableDataSource<any>();
  partidas: any[] = [];
  personagens: any[] = [];
  itens: any[] = [];
  partidasProcessadas: any[] = []; // Adicione esta linha
  versoes: string[] = [];
  vitoriaDerrotaDisponiveis: string[] = [];

  constructor(private dashboardService: DashboardService) {
    forkJoin({
        partidas: this.dashboardService.getTodasPartidas(),
        personagens: this.dashboardService.getPersonagens(),
        itens: this.dashboardService.getItens()
    }).subscribe(results => {
        this.partidas = results.partidas;
        this.personagens = results.personagens;
        this.itens = results.itens;
        console.log(this.partidas);
        this.processarDados();
    });
}

processarDados(): void {
  if (this.partidas.length > 0 && this.personagens.length > 0 && this.itens.length > 0) {
    this.partidasProcessadas = this.partidas.map((partida: GameData) => {
      const statistics = partida.statistics || []; // Garantir que seja um array
      const itens = partida.itens || [];  

      const heroiObj = this.personagens.find(
        p => p.id_personagem === +statistics[0]?.character
      );

      const heroiImagem = heroiObj
        ? `assets/imagens/${heroiObj.id_personagem}.png`
        : 'sem-imagem'; // Imagem padrão

      // Herói é o primeiro da lista
      const heroi = this.personagens.find(
        p => p.id_personagem === +statistics[0]?.character
      )?.nome_personagem || 'Desconhecido';

      // Suportes são os demais
      const suportes = statistics.slice(1).map(stat => {
        return this.personagens.find(
          p => p.id_personagem === +stat.character
        )?.nome_personagem || 'Desconhecido';
      });

      // Adicionar o nome de personagem diretamente dentro de cada estatística
      const statisticsComNome = statistics.map(stat => {
        const nomePersonagem = this.personagens.find(
          p => p.id_personagem === +stat.character
        )?.nome_personagem || 'Desconhecido';

        return {
          ...stat,  // Manter todas as outras propriedades
          characterName: nomePersonagem  // Adicionar o nome do personagem diretamente
        };
      });

      // Adicionar os nomes dos itens
      const itensNome = itens.map(item =>
        this.itens.find(i => i.id_item === item?.id)
        ?.nome_item || 'Desconhecido'
      );

      return {
        ...partida,
        heroi,
        heroiImagem, // Adicionar a propriedade da imagem
        statistics: statisticsComNome, // Agora com characterName já incluído em cada estatística
        suportes, // A lista de suportes com seus respectivos nomes
        itensNome
      };
    });

    this.versoes = [...new Set(this.partidas.map(partida => partida.versao))];
    this.vitoriaDerrotaDisponiveis = [...new Set(this.partidas.map(partida => partida.win))]; // Extrair valores únicos da coluna "win"
    
    this.partidasProcessadas = this.partidasProcessadas.map(partida => ({
      ...partida,
      start_time: this.validaData(partida.start_time) ? new Date(partida.start_time) : null
    }));
    
    this.dataSource.data = this.partidasProcessadas; 
    // Enviar tabela para esse serviço
    this.getTabelaProcessada();
  }
}



    
  validaData(date: any): boolean {
    // Tenta converter para uma data válida
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  private tableDataSubject = new BehaviorSubject<any[]>([]);
  
  tableData$ = this.tableDataSubject.asObservable();
  
  getTabelaProcessada(): void {
    this.tabelaProcessadaSubject.next(this.partidasProcessadas);
  }
}