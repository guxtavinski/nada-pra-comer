import { buscarReceita } from '../data/recipes';
import { Categoria, Plano, Slot, Unidade } from '../types';

export const CATEGORIAS: Categoria[] = [
  'Carnes e proteínas', 'Hortifruti', 'Laticínios', 'Mercearia', 'Temperos', 'Outros',
];

export interface ItemLista {
  chave: string;
  nome: string;
  quantidade: number;
  unidade: Unidade;
  categoria: Categoria;
}

// Soma os ingredientes das receitas (ajustados ao nº de pessoas) e remove o que já existe em casa.
export function gerarLista(plano: Plano, cardapio: Slot[]): ItemLista[] {
  const mapa = new Map<string, ItemLista>();

  for (const slot of cardapio) {
    const receita = buscarReceita(slot.receitaId);
    if (!receita) continue;
    const fator = plano.pessoas / receita.porcoes;

    for (const ing of receita.ingredientes) {
      if (plano.alimentosCasa.includes(ing.nome)) continue;
      const chave = `${ing.nome}|${ing.unidade}`;
      const atual = mapa.get(chave);
      if (atual) atual.quantidade += ing.quantidade * fator;
      else mapa.set(chave, { chave, nome: ing.nome, quantidade: ing.quantidade * fator, unidade: ing.unidade, categoria: ing.categoria });
    }
  }
  return [...mapa.values()].sort((a, b) => a.nome.localeCompare(b.nome));
}

export function formatarQuantidade(q: number, unidade: Unidade): string {
  if (unidade === 'un') return `${Math.ceil(q - 0.001)} un`;
  if (q >= 1000) return `${(q / 1000).toFixed(1).replace('.', ',').replace(',0', '')} ${unidade === 'g' ? 'kg' : 'L'}`;
  return `${Math.max(5, Math.round(q / 5) * 5)} ${unidade}`;
}
