/**
 * Pessoas de exemplo. Sao as mesmas do handoff (apelido e iniciais batem com
 * as 24 telas), para que a navegacao fique identica ao desenho enquanto nao
 * existe banco de dados.
 */
export type Pessoa = {
  id: string;
  nome: string;
  /** Como os colegas veem a pessoa na fila. */
  apelido: string;
  iniciais: string;
  email?: string;
  admin?: boolean;
  /** Fora da fila e fora da mesa — pode ser convidada. */
  disponivel?: boolean;
};

export const pessoas: Record<string, Pessoa> = {
  rafa: {
    id: 'rafa',
    nome: 'Rafael Antunes',
    apelido: 'Rafa',
    iniciais: 'RA',
    email: 'rafael.antunes@gmail.com',
  },
  tati: { id: 'tati', nome: 'Tatiana Braga', apelido: 'Tati', iniciais: 'TB', disponivel: true },
  cris: { id: 'cris', nome: 'Cristina Paes', apelido: 'Cris', iniciais: 'CP' },
  tom: { id: 'tom', nome: 'Tomás Freire', apelido: 'Tom', iniciais: 'TF' },
  gu: { id: 'gu', nome: 'Gustavo Rocha', apelido: 'Gu', iniciais: 'GR' },
  vivi: { id: 'vivi', nome: 'Viviane Matos', apelido: 'Vivi', iniciais: 'VM' },
  leo: { id: 'leo', nome: 'Leonardo Bastos', apelido: 'Léo', iniciais: 'LB' },
  mel: { id: 'mel', nome: 'Melissa Kern', apelido: 'Mel', iniciais: 'MK' },
  bea: { id: 'bea', nome: 'Beatriz Lemos', apelido: 'Bea', iniciais: 'BL' },
  duda: { id: 'duda', nome: 'Eduarda Serra', apelido: 'Duda', iniciais: 'ES' },
  nino: { id: 'nino', nome: 'Marcos Nino', apelido: 'Nino', iniciais: 'MN' },
  sam: { id: 'sam', nome: 'Samuel Dias', apelido: 'Sam', iniciais: 'SD' },
  marina: {
    id: 'marina',
    nome: 'Marina Couto',
    apelido: 'Marina',
    iniciais: 'MC',
    admin: true,
    disponivel: true,
  },
  bruno: { id: 'bruno', nome: 'Bruno Caldas', apelido: 'Bruno', iniciais: 'BC', disponivel: true },
  joana: { id: 'joana', nome: 'Joana Reis', apelido: 'Joana', iniciais: 'JR', disponivel: true },
};

/** Quem usa o app na navegacao de exemplo. */
export const EU = pessoas.rafa;

export function nomeDaDupla(a: Pessoa, b: Pessoa) {
  return `${a.apelido} & ${b.apelido}`;
}
