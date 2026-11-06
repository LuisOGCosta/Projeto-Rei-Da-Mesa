import { JogadorNoCampo } from '@/componentes/CampoDeFutebol';

/**
 * Estados da mesa, como no handoff:
 *
 *  vazia       mesa livre e fila vazia
 *  aguardando  uma dupla pronta, falta a segunda para a primeira chamada
 *  livre       partida em andamento, voce fora da fila
 *  fila        partida em andamento, voce na fila
 *  jogando     voce esta jogando agora
 */
export type EstadoDaMesa = 'vazia' | 'aguardando' | 'livre' | 'fila' | 'jogando';

export type DuplaNaFila = {
  posicao: string;
  a: string;
  b: string;
  nome: string;
  meta: string;
  souEu?: boolean;
};

export type ConteudoDaMesa = {
  /** Bloco de status com o relogio (mesa livre / aguardando). */
  status?: { titulo: string; texto: string };
  /** Linha "Partida em andamento há X". */
  assistindo?: { decorrido: string; numero: string };
  /** Bloco grande de quem esta jogando. */
  jogando?: { cronometro: string; decorrido: string };
  esquerda: JogadorNoCampo[];
  direita: JogadorNoCampo[];
  nomeEsquerda: string;
  nomeDireita: string;
  /** Cartao "Sua dupla na fila". */
  minhaPosicao?: { posicao: string; texto: string };
  fila: DuplaNaFila[];
  rotuloDaFila: string;
  notaDoProximo?: string;
  acao: { rotulo: string; variante: 'primario' | 'secundario' };
};

const colega = (iniciais: string): JogadorNoCampo => ({ iniciais, variante: 'colega' });
const eu = (iniciais: string): JogadorNoCampo => ({ iniciais, variante: 'eu' });
const vaga = (): JogadorNoCampo => ({ variante: 'vaga' });

const dupla = (
  posicao: number,
  a: string,
  b: string,
  nome: string,
  meta: string,
  souEu = false
): DuplaNaFila => ({ posicao: String(posicao), a, b, nome, meta, souEu });

/** Conteudo de cada estado, igual ao do handoff. */
export function conteudoDaMesa(estado: EstadoDaMesa): ConteudoDaMesa {
  if (estado === 'vazia') {
    return {
      status: {
        titulo: 'Mesa livre',
        texto:
          'Ninguém jogando agora. Assim que duas duplas confirmarem, a chamada sai automaticamente.',
      },
      esquerda: [vaga(), vaga()],
      direita: [vaga(), vaga()],
      nomeEsquerda: 'Vaga livre',
      nomeDireita: 'Vaga livre',
      fila: [],
      rotuloDaFila: '0 duplas',
      acao: { rotulo: 'Formar dupla', variante: 'primario' },
    };
  }

  if (estado === 'aguardando') {
    return {
      status: {
        titulo: 'Aguardando jogadores',
        texto:
          'Cris e Tom estão prontos. Falta mais uma dupla confirmada para começar a primeira partida.',
      },
      esquerda: [colega('CP'), colega('TF')],
      direita: [vaga(), vaga()],
      nomeEsquerda: 'Cris & Tom',
      nomeDireita: 'Aguardando dupla',
      fila: [dupla(1, 'CP', 'TF', 'Cris & Tom', 'confirmada às 14:20')],
      rotuloDaFila: '1 dupla',
      notaDoProximo:
        'Com a próxima dupla confirmada, os quatro são chamados e têm 1 minuto para confirmar.',
      acao: { rotulo: 'Formar dupla', variante: 'primario' },
    };
  }

  if (estado === 'jogando') {
    return {
      jogando: { cronometro: '06:12', decorrido: 'Partida em andamento\nhá 6 min · tempo decorrido' },
      esquerda: [eu('RA'), colega('TB')],
      direita: [colega('CP'), colega('TF')],
      nomeEsquerda: 'Rafa & Tati',
      nomeDireita: 'Cris & Tom',
      fila: [
        dupla(1, 'GR', 'VM', 'Gu & Vivi', 'confirmada às 14:22'),
        dupla(2, 'LB', 'MK', 'Léo & Mel', 'confirmada às 14:27'),
      ],
      rotuloDaFila: '2 duplas',
      notaDoProximo:
        'Ao registrar o vencedor, Gu & Vivi e Léo & Mel são chamados automaticamente.',
      acao: { rotulo: 'Registrar vencedor', variante: 'primario' },
    };
  }

  // "livre" e "fila" dividem a mesma partida em andamento; muda a fila e a ação.
  const souDaFila = estado === 'fila';
  const fila = [
    dupla(1, 'CP', 'TF', 'Cris & Tom', 'confirmada às 14:20'),
    dupla(2, 'GR', 'VM', 'Gu & Vivi', 'confirmada às 14:22'),
  ];
  if (souDaFila) {
    fila.push(
      dupla(3, 'RA', 'TB', 'Rafa & Tati', 'confirmada às 14:26', true),
      dupla(4, 'LB', 'MK', 'Léo & Mel', 'confirmada às 14:27')
    );
  }

  return {
    assistindo: { decorrido: '6 min', numero: 'n.º 412' },
    esquerda: [colega('BL'), colega('ES')],
    direita: [colega('MN'), colega('SD')],
    nomeEsquerda: 'Bea & Duda',
    nomeDireita: 'Nino & Sam',
    minhaPosicao: souDaFila
      ? {
          posicao: '3.ª',
          texto:
            'Você e Tati veem a mesma posição. Vocês jogam na chamada seguinte à próxima.',
        }
      : undefined,
    fila,
    rotuloDaFila: `${fila.length} duplas`,
    notaDoProximo: 'Ao fim desta partida, as duplas 1 e 2 são chamadas automaticamente.',
    acao: souDaFila
      ? { rotulo: 'Sair da fila', variante: 'secundario' }
      : { rotulo: 'Formar dupla', variante: 'primario' },
  };
}
