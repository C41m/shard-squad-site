export interface Statistics {
    startTime: string;   // Tempo em que o dado foi registrado
    character: string;   // ID do personagem
    characterName: string;  // Nome do personagem
    damage: number;      // Dano causado
    damageBoss: number;  // Dano causado ao boss
    dps: number;         // Dano por segundo
    level: number;       // Nível do personagem
  }
  
  export interface Recipe {
    id: number;  // ID da receita
    level: number;  // Nível da receita
  }
  
  export interface Item {
    id: number;  // ID do item
    level: number;  // Nível do item
  }
  
  export interface GameData {
    versao: string;      // Versão do jogo
    win: boolean;        // Status de vitória
    nome: string;        // Nome do jogador
    start_time: string;  // Hora de início
    end_time: string;    // Hora de término
    final_level: number; // Nível final
    stage: number;       // Estágio
    relics_id: number[]; // IDs das relíquias
    statistics: Statistics[];  // Estatísticas dos personagens
    recipes: Recipe[];   // Receitas adquiridas
    itens: Item[];       // Itens adquiridos
    nome_pc: string;     // Nome do PC
    damage_taken: number;  // Dano recebido
    damage_healed: number; // Dano curado
    wave: number;          // Ondas vencidas
    enemies_quantity: number; // Quantidade de inimigos
    id: number;            // ID do jogo
    [key: string]: any; // Para outras propriedades desconhecidas

  }
  