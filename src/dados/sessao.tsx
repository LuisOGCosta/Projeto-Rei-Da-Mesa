import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { EU, Pessoa } from './pessoas';

type Sessao = {
  usuario: Pessoa;
  /** Mostra a quarta aba e as telas de revisao. */
  admin: boolean;
  alternarAdmin: () => void;
};

const Contexto = createContext<Sessao | null>(null);

/**
 * Sessao de exemplo, sem login nem banco de dados.
 *
 * Existe para que a navegacao funcione de ponta a ponta na revisao visual:
 * quando o Google e o backend entrarem, este provedor e trocado pelo estado
 * real de autenticacao e as telas continuam como estao.
 */
export function ProvedorDeSessao({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState(false);

  const valor = useMemo<Sessao>(
    () => ({ usuario: EU, admin, alternarAdmin: () => setAdmin((v) => !v) }),
    [admin]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useSessao() {
  const valor = useContext(Contexto);
  if (!valor) throw new Error('useSessao precisa estar dentro de <ProvedorDeSessao>.');
  return valor;
}
