import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Adicione esta linha
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import {FormsModule } from '@angular/forms';
import { PersonagensTabelaComponent } from './personagens-tabela/personagens-tabela.component';
import { FiltroDadosComponent } from './filtro-dados/filtro-dados.component';
import { HomeComponent } from './home/home.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ItensTabelaComponent } from './itens-tabela/itens-tabela.component';
import { WaveTabelaComponent } from './wave-tabela/wave-tabela.component';
import { RankingMenorTempoComponent } from './ranking-menor-tempo/ranking-menor-tempo.component';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PersonagensTabelaComponent,
    FiltroDadosComponent,
    HomeComponent,
    ItensTabelaComponent,
    WaveTabelaComponent,
    RankingMenorTempoComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    FormsModule,
    MatSortModule 
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
