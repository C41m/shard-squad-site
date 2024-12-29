import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-itens-tabela',
  templateUrl: './itens-tabela.component.html',
  styleUrls: ['./itens-tabela.component.scss']
})
export class ItensTabelaComponent {

  partidasProcessadas: any[] = [];
  quantidadeItens: any[] = []; 
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private homeComponent: HomeComponent) { }

  displayedColumns: string[] = ['item', 'quantidade' ];

  
  ngOnInit(): void {
    this.homeComponent.tabelaProcessada$.subscribe(tabela => {
      this.partidasProcessadas = tabela;
      console.log('Tabela Itens montada:', this.partidasProcessadas);
      this.dataSource.data = tabela; 
      this.calcularQuantidade();
    });
  }

  calcularQuantidade(): void {
    const agrupamento: { [item: string]: { somaLevel: number } } = {};
  
    this.partidasProcessadas.forEach(partida => {
      const itensNome = partida.itensNome; // Lista de nomes dos itens
      const itens = partida.itens; // Lista de níveis dos itens
  
      itensNome.forEach((item: string, index: number) => {
        const level = itens[index]?.level || 0; // Nível correspondente ao item (ou 0 se não existir)
  
        if (!agrupamento[item]) {
          agrupamento[item] = { somaLevel: 0 };
        }
  
        agrupamento[item].somaLevel += level; // Soma o nível ao item correspondente
      });
    });
  
    // Transformar o agrupamento em uma lista com os resultados
    this.quantidadeItens = Object.keys(agrupamento).map(item => ({
      item,
      somaLevel: agrupamento[item].somaLevel
    }));
  
    this.dataSource.data = this.quantidadeItens; // Atualiza o dataSource para exibir na tabela
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
} 

