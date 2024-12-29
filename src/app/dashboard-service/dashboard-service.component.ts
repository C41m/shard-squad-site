import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { GameData } from '../models/game-data.model';
import { Personagem } from '../models/personagem.model';
import { Item } from '../models/game-data.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrlPartidas = '/partidas/';
  private apiUrlPersonagens = '/personagens/';
  private apiUrlItens = '/itens/';

  constructor(private http: HttpClient) {}

  // Método para pegar todas as partidas, considerando múltiplas páginas
  getTodasPartidas(): Observable<GameData[]> {
    let allPartidas: GameData[] = [];
    let page = 1;

    // Função recursiva para pegar as partidas página por página
    const fetchPage = (page: number): Observable<GameData[]> => {
      const url = `${this.apiUrlPartidas}?page=${page}`;
      return this.http.get<GameData[]>(url).pipe(
        tap((data: GameData[]) => {
          if (data.length > 0) {
            // Se houver dados, adiciona ao array allPartidas
            allPartidas = [...allPartidas, ...data];
          }
        }),
        map((data: GameData[]) => data), // Retorna os dados (não booleano)
        catchError((error) => {
          console.error('Erro ao buscar partidas:', error);
          return of([]); // Retorna um array vazio em caso de erro
        })
      );
    };

    // Chamada recursiva para continuar buscando enquanto houver mais páginas
    const getAllPages = (page: number): Observable<GameData[]> => {
      return fetchPage(page).pipe(
        switchMap((data) => {
          if (data.length > 0) {
            // Se houver dados, busque a próxima página
            return getAllPages(page + 1);
          } else {
            // Se não houver mais dados, retorna todos os dados
            return of(allPartidas);
          }
        })
      );
    };

    // Inicia a chamada recursiva
    return getAllPages(page);
  }

  getPersonagens(): Observable<Personagem[]> {
    return this.http.get<Personagem[]>(this.apiUrlPersonagens);
  }

  getItens(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrlItens);
  }
}
