import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id','versao', 'nome', 'nomePc','win','start_time', 'end_time', 'final_level', 'wave', 'damage_taken', 'damage_healed', 'enemies_quantity', 'heroi', 'suporte1', 'suporte2', 'suporte3', 'suporte4', 'Speed','Hp Regen', 'Magnet','Cooldown','Critical', 'heroiImg'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private homeComponent: HomeComponent) {}

  versoes: string[] = [];
  vitoriaDerrotaDisponiveis: string[] = [];
  partidasProcessadas: any[] = [];

  ngOnInit(): void {
    this.homeComponent.tabelaProcessada$.subscribe(tabela => {
      // console.log('Tabela montada no dashboard:', tabela);
      this.partidasProcessadas = tabela; // Armazena a tabela original
      this.dataSource.data = tabela; // Atualiza o dataSource com os dados recebidos
    });
  }
    
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  

  
}
  
