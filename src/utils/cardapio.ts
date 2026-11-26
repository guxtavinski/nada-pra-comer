import { receitas, buscarReceita } from '../data/recipes';
import { Plano, Receita, Refeicao, Slot } from '../types';

const NIVEL: Record<string, number> = { Onívoro: 0, Vegetariano: 1, Vegano: 2 };
const ORDEM: Refeicao[] = ['Café da manhã', 'Almoço', 'Lanche', 'Jantar'];

export const moeda = (valor: number) => `R$ ${valor.toFixed(2).replace('.', ',')}`;

export const custoReceita = (r: Receita, pessoas: number) => (r.custo * pessoas) / r.porcoes;

export const custoTotal = (slots: Slot[], pessoas: number) =>
  slots.reduce((soma, s) => {
    const r = buscarReceita(s.receitaId);
    return r ? soma + custoReceita(r, pessoas) : soma;
  }, 0);

function compativeis(plano: Plano, refeicao: Refeicao, relaxarDieta: boolean): Receita[] {
  const nivelUsuario = NIVEL[plano.padrao] ?? 0;
  return receitas.filter(
    (r) =>
      r.refeicoes.includes(refeicao) &&
      NIVEL[r.padrao] >= nivelUsuario &&
      !r.alergenos.some((a) => plano.alergias.includes(a)) &&
      r.eletrodomesticos.every((e) => plano.eletrodomesticos.includes(e)) &&
      (relaxarDieta || plano.dieta === 'Equilibrada' || r.dietas.includes(plano.dieta))
  );
}

// Respeita padrão, alergias e eletrodomésticos sempre. A dieta só é relaxada se não sobrar opção.
function candidatas(plano: Plano, refeicao: Refeicao): Receita[] {
  const estrita = compativeis(plano, refeicao, false);
  return estrita.length ? estrita : compativeis(plano, refeicao, true);
}

const sortear = <T,>(lista: T[]): T => lista[Math.floor(Math.random() * lista.length)];

function montar(plano: Plano): Slot[] {
  const slots: Slot[] = [];
  const usadas = new Set<string>();
  const refeicoes = ORDEM.filter((r) => plano.refeicoes.includes(r));

  for (let dia = 1; dia <= plano.dias; dia++) {
    for (const refeicao of refeicoes) {
      const pool = candidatas(plano, refeicao);
      if (!pool.length) continue;
      const novas = pool.filter((r) => !usadas.has(r.id));
      const escolhida = sortear(novas.length ? novas : pool);
      usadas.add(escolhida.id);
      slots.push({ id: `${dia}-${refeicao}`, dia, refeicao, receitaId: escolhida.id });
    }
  }
  return slots;
}

// Tenta algumas combinações e devolve a primeira dentro do orçamento (ou a mais barata).
export function gerarCardapio(plano: Plano): Slot[] {
  const limite = Number(plano.orcamento.replace(',', '.'));
  let melhor: Slot[] = [];
  let melhorCusto = Infinity;

  for (let i = 0; i < 20; i++) {
    const tentativa = montar(plano);
    const custo = custoTotal(tentativa, plano.pessoas);
    if (tentativa.length && custo <= limite) return tentativa;
    if (tentativa.length && custo < melhorCusto) {
      melhor = tentativa;
      melhorCusto = custo;
    }
  }
  return melhor;
}

// Troca somente o slot escolhido. Devolve null se não houver outra receita compatível.
export function trocarReceita(plano: Plano, cardapio: Slot[], slotId: string): Slot[] | null {
  const slot = cardapio.find((s) => s.id === slotId);
  if (!slot) return null;

  const pool = candidatas(plano, slot.refeicao).filter((r) => r.id !== slot.receitaId);
  if (!pool.length) return null;

  const emUso = new Set(cardapio.map((s) => s.receitaId));
  const novas = pool.filter((r) => !emUso.has(r.id));
  const nova = sortear(novas.length ? novas : pool);

  return cardapio.map((s) => (s.id === slotId ? { ...s, receitaId: nova.id } : s));
}
