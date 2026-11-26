import React, { createContext, useContext, useState } from 'react';
import { Plano, Slot } from '../types';
import { gerarCardapio, trocarReceita } from '../utils/cardapio';

const inicial: Plano = {
  pessoas: 2,
  dias: 3,
  refeicoes: ['Almoço', 'Jantar'],
  orcamento: '',
  alimentosCasa: [],
  padrao: 'Onívoro',
  dieta: 'Equilibrada',
  alergias: [],
  eletrodomesticos: ['Fogão'],
};

interface PlanContextData {
  plano: Plano;
  atualizar: (parcial: Partial<Plano>) => void;
  reiniciar: () => void;
  cardapio: Slot[];
  gerar: () => void;
  trocar: (slotId: string) => boolean;
  comprados: string[];
  alternarComprado: (chave: string) => void;
}

const PlanContext = createContext<PlanContextData | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plano, setPlano] = useState<Plano>(inicial);
  const [cardapio, setCardapio] = useState<Slot[]>([]);
  const [comprados, setComprados] = useState<string[]>([]);

  const atualizar = (parcial: Partial<Plano>) => setPlano((atual) => ({ ...atual, ...parcial }));

  const reiniciar = () => {
    setPlano(inicial);
    setCardapio([]);
    setComprados([]);
  };

  const gerar = () => {
    setCardapio(gerarCardapio(plano));
    setComprados([]);
  };

  const trocar = (slotId: string) => {
    const novo = trocarReceita(plano, cardapio, slotId);
    if (!novo) return false;
    setCardapio(novo);
    setComprados([]); // a lista de compras muda com a troca
    return true;
  };

  const alternarComprado = (chave: string) =>
    setComprados((atual) => (atual.includes(chave) ? atual.filter((c) => c !== chave) : [...atual, chave]));

  return (
    <PlanContext.Provider value={{ plano, atualizar, reiniciar, cardapio, gerar, trocar, comprados, alternarComprado }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlan deve ser usado dentro de PlanProvider');
  return ctx;
}
