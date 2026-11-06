/**
 * Conteudo de exemplo das telas. Todos os textos, horarios e numeros vem do
 * handoff, para que a navegacao reproduza as 24 telas do desenho.
 *
 * Quando o backend entrar, cada bloco daqui vira uma consulta; as telas que
 * consomem estes tipos nao mudam.
 */
import { pessoas } from './pessoas';

/* ─── Perfil ─────────────────────────────────────────────────────────── */

export type TipoDeMarca = 'vitoria' | 'derrota' | 'revertida';

export type LinhaDeHistorico = {
  /** Letra da marca. Em "revertida" usamos o ícone, não uma letra. */
  marca: string;
  tipo: TipoDeMarca;
  titulo: string;
  detalhe: string;
  pontos: string;
};

export const historico: LinhaDeHistorico[] = [
  { marca: 'V', tipo: 'vitoria', titulo: 'Vitória · com Tati', detalhe: 'hoje 14:58 · contra Cris & Tom', pontos: '+1' },
  { marca: 'D', tipo: 'derrota', titulo: 'Derrota · com Bea', detalhe: 'hoje 11:40 · contra Gu & Vivi', pontos: '0' },
  { marca: 'V', tipo: 'vitoria', titulo: 'Vitória · com Duda', detalhe: 'ontem 17:42 · contra Nino & Sam', pontos: '+1' },
  { marca: '', tipo: 'revertida', titulo: 'Vitória revertida · com Sam', detalhe: 'ter 16:05 · corrigida pelo admin', pontos: '0' },
  { marca: 'V', tipo: 'vitoria', titulo: 'Vitória · com Léo', detalhe: 'ter 15:36 · contra Tati & Mel', pontos: '+1' },
  { marca: 'D', tipo: 'derrota', titulo: 'Derrota · com Cris', detalhe: 'seg 18:12 · contra Bea & Tom', pontos: '0' },
];

export const numerosDoPerfil = {
  posicao: '2.º',
  posicaoNota: 'no ranking\n(empatado)',
  vitorias: 12,
  partidas: 19,
};

/* ─── Ranking ────────────────────────────────────────────────────────── */

export const periodoAtual = {
  mes: 'Novembro',
  intervalo: '30 out – 29 nov',
  renovaEm: '30 nov, 00:00',
};

/** Pontuacao bruta do periodo: 1 ponto por vitoria. */
const pontuacao: { id: keyof typeof pessoas; pontos: number }[] = [
  { id: 'bea', pontos: 14 },
  { id: 'duda', pontos: 12 },
  { id: 'rafa', pontos: 12 },
  { id: 'nino', pontos: 10 },
  { id: 'sam', pontos: 10 },
  { id: 'cris', pontos: 9 },
  { id: 'tati', pontos: 8 },
  { id: 'gu', pontos: 7 },
  { id: 'tom', pontos: 6 },
];

export type LinhaDeRanking = {
  id: string;
  iniciais: string;
  nome: string;
  pontos: number;
  /** "2.º". Empates dividem a posicao. */
  posicao: string;
  posicaoNumero: number;
  meta: string;
  empatado: boolean;
  souEu: boolean;
};

/**
 * Monta a classificacao com posicoes compartilhadas: quem tem a mesma
 * pontuacao fica na mesma posicao, e a seguinte pula o numero correspondente
 * (14, 12, 12, 10 → 1.º, 2.º, 2.º, 4.º).
 */
export function montarRanking(euId = 'rafa'): LinhaDeRanking[] {
  let posicao = 0;

  return pontuacao.map((linha, i) => {
    if (i === 0 || pontuacao[i - 1].pontos !== linha.pontos) posicao = i + 1;
    const empatado = pontuacao.some((o, j) => j !== i && o.pontos === linha.pontos);
    const pessoa = pessoas[linha.id];
    const souEu = pessoa.id === euId;

    return {
      id: pessoa.id,
      iniciais: pessoa.iniciais,
      nome: souEu ? `${pessoa.apelido} (você)` : pessoa.apelido,
      pontos: linha.pontos,
      posicao: `${posicao}.º`,
      posicaoNumero: posicao,
      meta: `${linha.pontos} vitórias${empatado ? ' · empate' : ''}`,
      empatado,
      souEu,
    };
  });
}

export const ranking = montarRanking();

export type PeriodoAnterior = {
  mes: string;
  intervalo: string;
  campeao: string;
  meuResultado: string;
  nota?: string;
};

export const periodosAnteriores: PeriodoAnterior[] = [
  {
    mes: 'Outubro',
    intervalo: '30 set – 29 out',
    campeao: 'Bea · 31 pts',
    meuResultado: 'você 4.º · 22',
    nota: 'Atualizado em 30 out, 01:12: correção de partida de 29 out.',
  },
  { mes: 'Setembro', intervalo: '30 ago – 29 set', campeao: 'Duda · 28 pts', meuResultado: 'você 2.º · 25' },
  { mes: 'Agosto', intervalo: '30 jul – 29 ago', campeao: 'Bea e Rafa · 26 pts', meuResultado: 'você 1.º · 26' },
  { mes: 'Julho', intervalo: '30 jun – 29 jul', campeao: 'Nino · 24 pts', meuResultado: 'você 3.º · 19' },
  { mes: 'Março', intervalo: '28 fev – 29 mar', campeao: 'Cris · 21 pts', meuResultado: 'você 5.º · 14' },
];

/* ─── Chamada ────────────────────────────────────────────────────────── */

export type Convocado = {
  iniciais: string;
  nome: string;
  confirmou: boolean;
  souEu?: boolean;
};

/** 12 Chamada: ninguem da nossa dupla confirmou ainda. */
export const chamadaInicial: Convocado[] = [
  { iniciais: 'RA', nome: 'Rafa', confirmou: false, souEu: true },
  { iniciais: 'TB', nome: 'Tati', confirmou: true },
  { iniciais: 'GR', nome: 'Gu', confirmou: true },
  { iniciais: 'VM', nome: 'Vivi', confirmou: false },
];

/** 13 Chamada aguardando: so a Vivi falta. */
export const chamadaAguardando: Convocado[] = [
  { iniciais: 'RA', nome: 'Rafa', confirmou: true, souEu: true },
  { iniciais: 'TB', nome: 'Tati', confirmou: true },
  { iniciais: 'GR', nome: 'Gu', confirmou: true },
  { iniciais: 'VM', nome: 'Vivi', confirmou: false },
];

/* ─── Admin ──────────────────────────────────────────────────────────── */

export type ResultadoRecente = {
  numero: number;
  registradoAs: string;
  registradoPor: string;
  vencedores: string;
  perdedores: string;
  /** Pedido de revisao, quando houver. */
  sinalizacao?: string;
  /** Texto do prazo restante. */
  prazo: string;
  /** Quanto resta do prazo de 2 h, de 0 a 1. */
  fracaoRestante: number;
  podeReverter: boolean;
};

export const resultadosRecentes: ResultadoRecente[] = [
  {
    numero: 413,
    registradoAs: '14:58',
    registradoPor: 'Tati',
    vencedores: 'Rafa & Tati',
    perdedores: 'Cris & Tom',
    sinalizacao: 'Revisão pedida por Cris às 15:02',
    prazo: 'Restam 1 h 47 min para corrigir',
    fracaoRestante: 0.89,
    podeReverter: true,
  },
  {
    numero: 412,
    registradoAs: '14:38',
    registradoPor: 'Nino',
    vencedores: 'Bea & Duda',
    perdedores: 'Nino & Sam',
    prazo: 'Restam 1 h 27 min para corrigir',
    fracaoRestante: 0.73,
    podeReverter: true,
  },
  {
    numero: 408,
    registradoAs: '12:50',
    registradoPor: 'Gu',
    vencedores: 'Gu & Vivi',
    perdedores: 'Léo & Mel',
    prazo: 'Prazo encerrado às 14:50',
    fracaoRestante: 0,
    podeReverter: false,
  },
];

/* ─── Motivos de revisao ─────────────────────────────────────────────── */

export const motivosDeRevisao = [
  'Vencedor registrado errado',
  'A partida não terminou',
  'Outro motivo',
];
