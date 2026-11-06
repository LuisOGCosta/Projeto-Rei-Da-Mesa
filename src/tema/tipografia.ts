import { TextStyle } from 'react-native';

import { cores } from './tokens';

/**
 * Familias tipograficas. As chaves sao as mesmas passadas ao useFonts em
 * src/app/_layout.tsx, por isso valem como fontFamily direto no estilo.
 *
 * Titulos: Cormorant Garamond. Corpo e interface: Lora.
 * O handoff pede para evitar negrito: o peso maximo e 600.
 */
export const fonte = {
  tituloRegular: 'CormorantGaramond_400Regular',
  tituloItalico: 'CormorantGaramond_400Regular_Italic',
  tituloSemi: 'CormorantGaramond_600SemiBold',
  corpoRegular: 'Lora_400Regular',
  corpoItalico: 'Lora_400Regular_Italic',
  corpoMedio: 'Lora_500Medium',
  corpoSemi: 'Lora_600SemiBold',
} as const;

/** Numerais de largura fixa, para contagens e posicoes que mudam a cada segundo. */
export const numerosTabulares: TextStyle = { fontVariant: ['tabular-nums'] };

/**
 * Presets de texto do app. Cada um reproduz uma combinacao que aparece no
 * handoff; o nome diz onde ela e usada.
 */
export const texto = {
  /** Cormorant 54/0.96 — manchete da tela de login. */
  manchete: {
    fontFamily: fonte.tituloRegular,
    fontSize: 54,
    lineHeight: 54 * 0.96,
    letterSpacing: -0.8,
    color: cores.tinta,
  },
  /** Cormorant 40/1 — titulo de tela de formulario. */
  tituloGrande: {
    fontFamily: fonte.tituloRegular,
    fontSize: 40,
    lineHeight: 40,
    color: cores.tinta,
  },
  /** Cormorant 30/1 — titulo em cabecalho preto. */
  titulo: {
    fontFamily: fonte.tituloRegular,
    fontSize: 30,
    lineHeight: 30,
    color: cores.tinta,
  },
  /** Cormorant 24/1.05 — titulo de bloco de status. */
  tituloBloco: {
    fontFamily: fonte.tituloRegular,
    fontSize: 24,
    lineHeight: 24 * 1.05,
    color: cores.tinta,
  },
  /** Cormorant 20/1.15 — nome de dupla em cartao. */
  tituloCartao: {
    fontFamily: fonte.tituloRegular,
    fontSize: 20,
    lineHeight: 20 * 1.15,
    color: cores.tinta,
  },
  /** Cormorant 19/1.1 — nome de dupla ao lado do campo. */
  nomeDupla: {
    fontFamily: fonte.tituloRegular,
    fontSize: 19,
    lineHeight: 19 * 1.1,
    color: cores.tinta,
  },
  /** Cormorant 18/1.1 — nome de dupla na lista da fila. */
  nomeLista: {
    fontFamily: fonte.tituloRegular,
    fontSize: 18,
    lineHeight: 18 * 1.1,
    color: cores.tinta,
  },
  /** Cormorant 17/1.15 — titulo de linha de historico. */
  nomeLinha: {
    fontFamily: fonte.tituloRegular,
    fontSize: 17,
    lineHeight: 17 * 1.15,
    color: cores.tinta,
  },

  /** Lora 11/500 caixa alta com entreletra larga — kicker. */
  kicker: {
    fontFamily: fonte.corpoMedio,
    fontSize: 11,
    lineHeight: 11,
    letterSpacing: 11 * 0.2,
    textTransform: 'uppercase',
    color: cores.verdeTexto,
  },
  /** Variante de kicker com entreletra menor (.14em), usada em pilulas. */
  kickerCurto: {
    fontFamily: fonte.corpoMedio,
    fontSize: 11,
    lineHeight: 11,
    letterSpacing: 11 * 0.14,
    textTransform: 'uppercase',
    color: cores.verdeTexto,
  },
  /** Lora 16/1.6 — subtitulo do login. */
  corpoGrande: {
    fontFamily: fonte.corpoRegular,
    fontSize: 16,
    lineHeight: 16 * 1.6,
    color: cores.corpo,
  },
  /** Lora 16 — valor dentro de um campo de formulario. */
  valorCampo: {
    fontFamily: fonte.corpoRegular,
    fontSize: 16,
    color: cores.tinta,
  },
  /** Lora 15/1.6 — corpo de apresentacao. */
  corpo: {
    fontFamily: fonte.corpoRegular,
    fontSize: 15,
    lineHeight: 15 * 1.6,
    color: cores.corpo,
  },
  /** Lora 14/1.5 — corpo padrao de tela. */
  corpoMedio: {
    fontFamily: fonte.corpoRegular,
    fontSize: 14,
    lineHeight: 14 * 1.5,
    color: cores.corpo,
  },
  /** Lora 13.5/1.45 — texto explicativo. */
  corpoMiudo: {
    fontFamily: fonte.corpoRegular,
    fontSize: 13.5,
    lineHeight: 13.5 * 1.45,
    color: cores.corpo,
  },
  /** Lora 13/1.5 — nota de rodape. */
  nota: {
    fontFamily: fonte.corpoRegular,
    fontSize: 13,
    lineHeight: 13 * 1.5,
    color: cores.secundario,
  },
  /** Lora 12.5/1.3 — meta e auxiliar. */
  meta: {
    fontFamily: fonte.corpoRegular,
    fontSize: 12.5,
    lineHeight: 12.5 * 1.3,
    color: cores.secundario,
  },
  /** Lora 12/1.25 — meta compacta de lista. */
  metaMiuda: {
    fontFamily: fonte.corpoRegular,
    fontSize: 12,
    lineHeight: 12 * 1.25,
    color: cores.secundario,
  },
  /** Lora 13/500 caixa alta — rotulo de botao. */
  rotuloBotao: {
    fontFamily: fonte.corpoMedio,
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 13 * 0.14,
    textTransform: 'uppercase',
  },
  /** Lora 16/500 — rotulo do botao do Google (caixa normal). */
  rotuloGoogle: {
    fontFamily: fonte.corpoMedio,
    fontSize: 16,
    lineHeight: 16,
  },
  /** Lora 12/500 — rotulo da barra de abas. */
  rotuloAba: {
    fontFamily: fonte.corpoMedio,
    fontSize: 12,
    lineHeight: 12,
  },
} satisfies Record<string, TextStyle>;

export type NomeTexto = keyof typeof texto;
