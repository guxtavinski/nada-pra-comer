export type Refeicao = 'Café da manhã' | 'Almoço' | 'Lanche' | 'Jantar';
export type Padrao = 'Onívoro' | 'Vegetariano' | 'Vegano';
export type Unidade = 'g' | 'ml' | 'un';
export type Categoria =
  | 'Carnes e proteínas'
  | 'Hortifruti'
  | 'Laticínios'
  | 'Mercearia'
  | 'Temperos'
  | 'Outros';

export interface Plano {
  pessoas: number;
  dias: number;
  refeicoes: Refeicao[];
  orcamento: string;
  alimentosCasa: string[];
  padrao: string;
  dieta: string;
  alergias: string[];
  eletrodomesticos: string[];
}

export interface Ingrediente {
  nome: string;
  quantidade: number; // para a quantidade de porções da receita
  unidade: Unidade;
  categoria: Categoria;
}

export interface Receita {
  id: string;
  nome: string;
  imagem: number; // retorno do require()
  refeicoes: Refeicao[];
  tempo: number; // minutos
  custo: number; // R$ para "porcoes" porções
  porcoes: number;
  padrao: Padrao; // padrão mais restritivo que a receita atende
  dietas: string[]; // além de "Equilibrada", que serve para todas
  alergenos: string[];
  eletrodomesticos: string[]; // necessários
  ingredientes: Ingrediente[];
  preparo: string[];
  nutricao: { kcal: number; proteina: number; carbo: number; gordura: number }; // por porção
}

export interface Slot {
  id: string;
  dia: number;
  refeicao: Refeicao;
  receitaId: string;
}
