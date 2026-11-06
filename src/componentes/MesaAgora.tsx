import { ScrollView, StyleSheet, View } from 'react-native';

import { ConteudoDaMesa, DuplaNaFila } from '@/dados/mesa';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, raio, veu } from '@/tema/tokens';

import { ParDeAvatares } from './Avatar';
import { Botao } from './Botao';
import { CampoDeFutebol } from './CampoDeFutebol';
import { Icone } from './Icone';
import { Pilula } from './Pilula';
import { Texto } from './Texto';

/**
 * Corpo da tela "Acontecendo agora". Recebe o conteudo ja montado por
 * conteudoDaMesa(estado) e so desenha — assim as cinco situacoes da mesa
 * usam exatamente o mesmo layout.
 */
export function MesaAgora({
  conteudo,
  onAcao,
}: {
  conteudo: ConteudoDaMesa;
  onAcao?: () => void;
}) {
  const Relogio = Icone.relogio;
  const Fila = Icone.fila;
  const Convite = Icone.convite;

  return (
    <View style={estilos.corpo}>
      <ScrollView
        style={estilos.rolagem}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}>
        {conteudo.status ? (
          <View style={estilos.status}>
            <View style={estilos.statusIcone}>
              <Relogio size={20} color={cores.verdeTexto} strokeWidth={1.6} />
            </View>
            <View style={estilos.statusTexto}>
              <Texto variante="tituloBloco">{conteudo.status.titulo}</Texto>
              <Texto variante="corpoMedio">{conteudo.status.texto}</Texto>
            </View>
          </View>
        ) : null}

        {conteudo.assistindo ? (
          <View style={estilos.assistindo}>
            <View style={estilos.assistindoEsquerda}>
              <Relogio size={18} color={cores.verdeTexto} strokeWidth={1.6} />
              <Texto style={estilos.assistindoTexto}>
                Partida em andamento há{' '}
                <Texto tabular style={estilos.assistindoForte}>
                  {conteudo.assistindo.decorrido}
                </Texto>
              </Texto>
            </View>
            <Texto variante="nota" style={estilos.numeroPartida}>
              {conteudo.assistindo.numero}
            </Texto>
          </View>
        ) : null}

        {conteudo.jogando ? (
          <View style={estilos.jogando}>
            <Pilula variante="simples">Você está jogando</Pilula>
            <View style={estilos.cronometroLinha}>
              <Texto tabular style={estilos.cronometro}>
                {conteudo.jogando.cronometro}
              </Texto>
              <Texto style={estilos.cronometroNota}>{conteudo.jogando.decorrido}</Texto>
            </View>
          </View>
        ) : null}

        <CampoDeFutebol
          esquerda={conteudo.esquerda}
          direita={conteudo.direita}
          nomeEsquerda={conteudo.nomeEsquerda}
          nomeDireita={conteudo.nomeDireita}
        />

        {conteudo.minhaPosicao ? (
          <View style={estilos.minhaPosicao}>
            <Texto tabular cor={cores.verdeTexto} style={estilos.posicaoGrande}>
              {conteudo.minhaPosicao.posicao}
            </Texto>
            <View style={estilos.minhaPosicaoTexto}>
              <View style={estilos.minhaPosicaoRotulo}>
                <Fila size={14} color={cores.verdeTexto} strokeWidth={1.8} />
                <Texto variante="kickerCurto" style={estilos.rotuloFila}>
                  Sua dupla na fila
                </Texto>
              </View>
              <Texto variante="corpoMedio">{conteudo.minhaPosicao.texto}</Texto>
            </View>
          </View>
        ) : null}

        <View>
          <View style={estilos.tituloFila}>
            <Texto variante="kicker">Fila</Texto>
            <Texto variante="nota" style={estilos.rotuloContagem}>
              {conteudo.rotuloDaFila}
            </Texto>
          </View>

          {conteudo.fila.length === 0 ? (
            <View style={estilos.filaVazia}>
              <Convite size={22} color={cores.secundario} strokeWidth={1.6} />
              <Texto variante="corpoMedio" cor={cores.secundario} style={estilos.filaVaziaTexto}>
                Nenhuma dupla na fila. Seja a primeira, convide alguém para jogar.
              </Texto>
            </View>
          ) : (
            conteudo.fila.map((d) => <LinhaDaFila key={d.posicao} dupla={d} />)
          )}

          {conteudo.notaDoProximo ? (
            <Texto variante="nota" style={estilos.notaProximo}>
              {conteudo.notaDoProximo}
            </Texto>
          ) : null}
        </View>
      </ScrollView>

      <View style={estilos.acao}>
        <Botao
          rotulo={conteudo.acao.rotulo}
          variante={conteudo.acao.variante}
          onPress={onAcao}
        />
      </View>
    </View>
  );
}

function LinhaDaFila({ dupla }: { dupla: DuplaNaFila }) {
  return (
    <View style={[estilos.linhaFila, dupla.souEu && estilos.linhaFilaMinha]}>
      <Texto tabular cor={cores.verdeTexto} style={estilos.posicaoFila}>
        {dupla.posicao}
      </Texto>
      <ParDeAvatares a={dupla.a} b={dupla.b} tamanho={32} />
      <View style={estilos.linhaFilaTexto}>
        <Texto variante="nomeLista">{dupla.nome}</Texto>
        <Texto variante="metaMiuda">{dupla.meta}</Texto>
      </View>
      {dupla.souEu ? (
        <Texto variante="kickerCurto" style={estilos.marcaVoces}>
          Vocês
        </Texto>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  corpo: { flex: 1 },
  rolagem: { flex: 1 },
  conteudo: { paddingHorizontal: espaco.pagina, paddingTop: 16, gap: 14 },

  status: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  statusIcone: {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: cores.verdeBorda,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTexto: { flex: 1, gap: 4 },

  assistindo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  assistindoEsquerda: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  assistindoTexto: { fontFamily: fonte.corpoRegular, fontSize: 17, lineHeight: 17 * 1.2 },
  assistindoForte: { fontFamily: fonte.corpoSemi, fontSize: 17, lineHeight: 17 * 1.2 },
  numeroPartida: { lineHeight: 13 },

  jogando: { gap: 6, paddingTop: 4, paddingBottom: 2 },
  cronometroLinha: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  cronometro: {
    fontFamily: fonte.tituloRegular,
    fontSize: 64,
    lineHeight: 64,
    letterSpacing: -0.64,
    color: cores.tinta,
  },
  cronometroNota: {
    flex: 1,
    fontFamily: fonte.corpoRegular,
    fontSize: 15,
    lineHeight: 15 * 1.3,
    color: cores.corpo,
  },

  minhaPosicao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: cores.verdeBorda,
    borderRadius: raio.campo,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  posicaoGrande: { fontFamily: fonte.tituloRegular, fontSize: 44, lineHeight: 44 },
  minhaPosicaoTexto: { flex: 1, gap: 3 },
  minhaPosicaoRotulo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rotuloFila: { letterSpacing: 11 * 0.16 },

  tituloFila: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  rotuloContagem: { lineHeight: 13 },

  filaVazia: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },
  filaVaziaTexto: { flex: 1 },

  linhaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginHorizontal: -10,
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },
  linhaFilaMinha: { backgroundColor: veu.selecao08 },
  posicaoFila: { width: 18, fontFamily: fonte.tituloRegular, fontSize: 20, lineHeight: 20 },
  linhaFilaTexto: { flex: 1, gap: 2 },
  marcaVoces: { letterSpacing: 11 * 0.12 },

  notaProximo: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },

  acao: { paddingHorizontal: espaco.pagina, paddingTop: 12, paddingBottom: 14 },
});
