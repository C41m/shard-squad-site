import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TabelaGeralService } from '../service/tabela-geral.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private tabelaProcessadaSubject = new BehaviorSubject<any[]>([]);
  tabelaProcessada$ = this.tabelaProcessadaSubject.asObservable();
  nomeTabela: any[] = [];
  constructor(private tabelaGeralService: TabelaGeralService) {}
  
  partidasProcessadas: any[] = []; // Dados originais
  tabelaFiltrada: any[] = [];
  dataSource = new MatTableDataSource<any>(); // DataSource para a tabela

  ngOnInit(): void {
    this.tabelaGeralService.tabelaProcessada$.subscribe(tabela => {
      this.partidasProcessadas = tabela; // Armazena os dados originais para filtragem
      this.dataSource.data = tabela; // Atualiza o dataSource com os dados recebidos
      this.getTabelaProcessada(this.partidasProcessadas)
    });
  }  

  aplicarFiltro(filtro: any): void {
    const dadosFiltrados = this.partidasProcessadas.filter(item => {
      // Verificar se "*" (Todas) está selecionado ou se o filtro está vazio
      const winMatch = 
        filtro.vitoriaDerrota.includes('*') || // Se "Todas" foi selecionado
        filtro.vitoriaDerrota.length === 0 || 
        filtro.vitoriaDerrota.includes(item.win ? 'Vitória' : 'Derrota');
      
      const versaoMatch = 
        filtro.versoes.includes('*') || // Se "Todas" foi selecionado
        filtro.versoes.length === 0 || 
        filtro.versoes.includes(item.versao);
  
      return winMatch && versaoMatch;
    });
  
    // Atualizar o dataSource com os dados filtrados
    this.dataSource.data = dadosFiltrados; 
    this.tabelaFiltrada = this.dataSource.data;
  
    // Atualizar tabela processada, se necessário
    this.getTabelaProcessada(this.tabelaFiltrada);
  }
    getTabelaProcessada(nomeTabela: any): void {
    this.tabelaProcessadaSubject.next(nomeTabela);
  }
  
}
