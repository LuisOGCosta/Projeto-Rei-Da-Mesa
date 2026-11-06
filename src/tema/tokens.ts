/**
 * Tokens de design do Futmesa.
 *
 * Valores retirados do handoff (design_handoff_futmesa/README.md, secao
 * "Design Tokens"). Esta e a unica fonte de verdade de cor, tipo, raio e
 * espacamento do app: nenhuma tela deve escrever um hexadecimal direto.
 */

export const cores = {
  // Tinta e fundos
  tinta: '#201f1d', // texto principal, cabecalhos pretos
  tintaVitoria: '#1a1918', // fundo da tela de vitoria
  papel: '#f3f2f2', // fundo do app
  campo: '#f8f7f6', // preenchimento de input
  tela: '#e7e5e3', // fundo de apresentacao (canvas)

  // Textos
  corpo: '#444141',
  secundario: '#605d5d',

  // Neutros de borda
  neutro500: '#9b9797',
  neutro400: '#bab6b6',
  neutro300: '#cfcbc8',
  neutro350: '#d7d3d3',

  // Verdes
  verdeTexto: '#2e5a28', // textos e kickers
  verdePrimario: '#3f6f36', // preenchimento do botao primario
  verdeBorda: '#4f7f43', // bordas e selecao
  verdeCampo: '#79a861', // linhas do campo, aba ativa
  verdeSelo: '#97c47f', // selo claro sobre preto
  verdeSutil: '#c5d1bd', // bordas discretas
  verdeTinte: '#e6ebe2', // preenchimento tingido

  // Logo do Google
  google: {
    azul: '#4285f4',
    verde: '#34a853',
    amarelo: '#fbbc05',
    vermelho: '#ea4335',
  },
} as const;

/** Hairlines e veus translucidos sobre a tinta. */
export const veu = {
  borda16: 'rgba(32,31,29,.16)',
  borda20: 'rgba(32,31,29,.2)',
  borda24: 'rgba(32,31,29,.24)',
  borda28: 'rgba(32,31,29,.28)',
  borda12: 'rgba(32,31,29,.12)',
  borda10: 'rgba(32,31,29,.1)',
  borda06: 'rgba(32,31,29,.06)',
  /**
   * Fundo atras de modais e bottom sheets.
   *
   * O README do handoff descreve "rgba de #201f1d", mas as 24 telas em HTML
   * usam rgba(0,0,0,.55) — seguimos o HTML, que e o que de fato renderiza.
   */
  fundoModal: 'rgba(0,0,0,.55)',
  /** Selecao: verde a 8% (linha da propria dupla na fila). */
  selecao08: 'rgba(79,127,67,.08)',
  /** Selecao: verde a 6% (cartao de radio escolhido). */
  selecao06: 'rgba(79,127,67,.06)',
  /** Linhas brancas do campo de futebol. */
  linhaCampo: 'rgba(255,255,255,.75)',
  vagaFundo: 'rgba(255,255,255,.08)',
  vagaBorda: 'rgba(255,255,255,.7)',
} as const;

export const raio = {
  campo: 4, // cartoes, botoes, inputs
  pequeno: 3, // checkbox
  campoVerde: 6, // campo de futebol
  pilula: 999,
  folha: 18, // cantos de cima do bottom sheet
  aparelho: 44, // moldura do mock (so na pre-visualizacao web)
} as const;

export const espaco = {
  /** Padding horizontal da pagina: 22 na maioria das telas, 26-30 no acesso. */
  pagina: 22,
  paginaLarga: 26,
  paginaAcesso: 30,
  linha: 10,
  grupo: 14,
} as const;

/** Altura minima de alvo de toque. */
export const toque = {
  minimo: 44,
  linha: 48,
  botao: 54,
  botaoGrande: 56,
} as const;

/** Opacidade de itens indisponiveis / desabilitados. */
export const opacidadeDesabilitado = 0.45;

export const sombraAparelho = {
  shadowColor: 'rgba(45,43,43,1)',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 10 },
  shadowRadius: 30,
} as const;
