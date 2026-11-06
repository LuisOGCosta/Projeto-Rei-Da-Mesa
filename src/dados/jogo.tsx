import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { EstadoDaMesa } from './mesa';

type Jogo = {
  estado: EstadoDaMesa;
  definirEstado: (estado: EstadoDaMesa) => void;
};

const Contexto = createContext<Jogo | null>(null);

/**
 * Estado da mesa durante a revisao visual, no lugar do tempo real do
 * backend. Deixa percorrer o fluxo inteiro: formar dupla → fila → chamada →
 * partida → resultado.
 */
export function ProvedorDeJogo({ children }: { children: ReactNode }) {
  const [estado, definirEstado] = useState<EstadoDaMesa>('fila');
  const valor = useMemo(() => ({ estado, definirEstado }), [estado]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useJogo() {
  const valor = useContext(Contexto);
  if (!valor) throw new Error('useJogo precisa estar dentro de <ProvedorDeJogo>.');
  return valor;
}
