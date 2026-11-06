/**
 * Pessoas de exemplo. Apelidos, iniciais e nomes completos sao os mesmos do
 * handoff, para que as telas fiquem identicas ao desenho enquanto nao existe
 * banco de dados.
 */
export type Pessoa = {
  id: string;
  nome: string;
  /** Como os colegas veem a pessoa na fila. */
  apelido: string;
  iniciais: string;
  email?: string;
  admin?: boolean;
  /** Por que nao pode ser convidada agora. Vazio = disponivel. */
  indisponivel?: string;
};

export const pessoas = {
  rafa: {
    id: 'rafa',
    nome: 'Rafael Antunes',
    apelido: 'Rafa',
    iniciais: 'RA',
    email: 'rafael.antunes@gmail.com',
  },
  tati: { id: 'tati', nome: 'Tatiana Bueno', apelido: 'Tati', iniciais: 'TB' },
  leo: { id: 'leo', nome: 'Leonardo Brito', apelido: 'Léo', iniciais: 'LB' },
  mel: { id: 'mel', nome: 'Melissa Kwan', apelido: 'Mel', iniciais: 'MK' },
  cris: { id: 'cris', nome: 'Cristina Paes', apelido: 'Cris', iniciais: 'CP' },
  tom: { id: 'tom', nome: 'Tomás Freire', apelido: 'Tom', iniciais: 'TF' },
  gu: { id: 'gu', nome: 'Gustavo Rocha', apelido: 'Gu', iniciais: 'GR' },
  vivi: { id: 'vivi', nome: 'Viviane Matos', apelido: 'Vivi', iniciais: 'VM' },
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
  },
} satisfies Record<string, Pessoa>;

/** Quem usa o app na navegacao de exemplo. */
export const EU = pessoas.rafa;

/** Administradora do escritorio. */
export const ADMIN = pessoas.marina;

export function nomeDaDupla(a: Pessoa, b: Pessoa) {
  return `${a.apelido} & ${b.apelido}`;
}

/**
 * Lista de "Disponiveis" da tela de escolher parceiro. A ordem e o motivo de
 * indisponibilidade vem do handoff.
 */
export const parceirosPossiveis: { pessoa: Pessoa; meta: string; indisponivel?: boolean }[] = [
  { pessoa: pessoas.tati, meta: 'Tatiana Bueno · disponível' },
  { pessoa: pessoas.leo, meta: 'Leonardo Brito · disponível' },
  { pessoa: pessoas.mel, meta: 'Melissa Kwan · disponível' },
  { pessoa: pessoas.cris, meta: 'já está na fila', indisponivel: true },
  { pessoa: pessoas.bea, meta: 'jogando agora', indisponivel: true },
];
