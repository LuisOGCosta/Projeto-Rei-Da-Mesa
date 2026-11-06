import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '@/componentes/Avatar';
import { CabecalhoPreto } from '@/componentes/CabecalhoPreto';
import { Icone } from '@/componentes/Icone';
import { Segmentado } from '@/componentes/Segmentado';
import { Texto } from '@/componentes/Texto';
import {
  LinhaDeRanking,
  PeriodoAnterior,
  periodoAtual,
  periodosAnteriores,
  ranking,
} from '@/dados/mock';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, veu } from '@/tema/tokens';

type Aba = 'atual' | 'anteriores';

/**
 * 23 · Ranking mensal e 24 · Períodos anteriores.
 *
 * Individual, 1 ponto por vitória. Empates dividem a posição, e o período
 * vai do dia 30 ao 29.
 */
export default function Ranking() {
  const [aba, setAba] = useState<Aba>('atual');
  const Calendario = Icone.calendario;

  return (
    <View style={estilos.tela}>
      <CabecalhoPreto acima={6} abaixo={aba === 'atual' ? 12 : 14} estilo={estilos.cabecalho}>
        <View style={estilos.titulos}>
          <Texto variante="kicker" cor={cores.verdeSelo}>
            Ranking mensal
          </Texto>
          <Texto cor={cores.papel} style={estilos.mes}>
            {aba === 'atual' ? periodoAtual.mes : 'Histórico'}
          </Texto>
        </View>

        <Segmentado
          valor={aba}
          aoMudar={setAba}
          opcoes={[
            { id: 'atual', rotulo: 'Atual' },
            { id: 'anteriores', rotulo: 'Períodos anteriores' },
          ]}
        />

        {aba === 'atual' ? (
          <View style={estilos.periodo}>
            <Calendario size={18} color={cores.verdeSelo} strokeWidth={1.6} />
            <Texto cor={cores.neutro350} style={estilos.periodoTexto}>
              {periodoAtual.intervalo} · renova em{' '}
              <Texto cor={cores.papel} style={estilos.periodoForte}>
                {periodoAtual.renovaEm}
              </Texto>{' '}
              (horário local)
            </Texto>
          </View>
        ) : null}
      </CabecalhoPreto>

      <ScrollView contentContainerStyle={estilos.lista} showsVerticalScrollIndicator={false}>
        {aba === 'atual' ? (
          <>
            {ranking.map((r) => (
              <LinhaDoRanking key={r.id} linha={r} />
            ))}
            <Texto variante="meta" style={estilos.regra}>
              1 ponto por vitória para cada jogador da dupla vencedora. Derrotas não pontuam.
            </Texto>
          </>
        ) : (
          <>
            {periodosAnteriores.map((p) => (
              <CartaoDePeriodo key={p.mes} periodo={p} />
            ))}
            <Texto variante="meta" style={estilos.regra}>
              A renovação é todo dia 30, à meia-noite local; em fevereiro, no último dia do mês.
            </Texto>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function LinhaDoRanking({ linha }: { linha: LinhaDeRanking }) {
  return (
    <View style={[estilos.linha, linha.souEu && estilos.linhaMinha]}>
      <Texto
        tabular
        // O primeiro lugar aparece em verde escuro.
        cor={linha.posicaoNumero === 1 ? cores.verdeTexto : cores.secundario}
        style={estilos.posicao}>
        {linha.posicao}
      </Texto>
      <Avatar iniciais={linha.iniciais} tamanho={34} variante={linha.souEu ? 'eu' : 'colega'} />
      <View style={estilos.linhaTexto}>
        <Texto variante="nomeLista">{linha.nome}</Texto>
        <Texto variante="metaMiuda">{linha.meta}</Texto>
      </View>
      <Texto tabular style={estilos.pontos}>
        {linha.pontos}
      </Texto>
    </View>
  );
}

function CartaoDePeriodo({ periodo }: { periodo: PeriodoAnterior }) {
  const Trofeu = Icone.trofeu;
  const Reverter = Icone.reverter;

  return (
    <View style={estilos.periodoCartao}>
      <View style={estilos.periodoTopo}>
        <Texto style={estilos.periodoMes}>{periodo.mes}</Texto>
        <Texto variante="meta" tabular style={estilos.periodoIntervalo}>
          {periodo.intervalo}
        </Texto>
      </View>

      <View style={estilos.periodoLinha}>
        <Trofeu size={15} color={cores.corpo} strokeWidth={1.7} />
        <Texto style={estilos.periodoCampeao}>{periodo.campeao}</Texto>
        <Texto cor={cores.secundario} style={estilos.periodoMeu}>
          {periodo.meuResultado}
        </Texto>
      </View>

      {periodo.nota ? (
        <View style={estilos.periodoNota}>
          <Reverter size={14} color={cores.tinta} strokeWidth={1.7} />
          <Texto cor={cores.tinta} style={estilos.periodoNotaTexto}>
            {periodo.nota}
          </Texto>
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  cabecalho: { gap: 12 },
  titulos: { gap: 5 },
  mes: { fontFamily: fonte.tituloRegular, fontSize: 34, lineHeight: 34 },
  periodo: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  periodoTexto: {
    flex: 1,
    fontFamily: fonte.corpoRegular,
    fontSize: 13,
    lineHeight: 13 * 1.35,
  },
  periodoForte: { fontFamily: fonte.corpoSemi, fontSize: 13, lineHeight: 13 * 1.35 },

  lista: { paddingHorizontal: espaco.pagina },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 50,
    paddingHorizontal: 10,
    marginHorizontal: -10,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  linhaMinha: { backgroundColor: veu.selecao08 },
  posicao: { width: 30, fontFamily: fonte.tituloRegular, fontSize: 20, lineHeight: 20 },
  linhaTexto: { flex: 1, gap: 1 },
  pontos: { fontFamily: fonte.tituloRegular, fontSize: 22, lineHeight: 22, color: cores.tinta },
  regra: { paddingVertical: 10, lineHeight: 12.5 * 1.5 },

  periodoCartao: {
    gap: 6,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  periodoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 10,
  },
  periodoMes: { fontFamily: fonte.tituloRegular, fontSize: 22, lineHeight: 22, color: cores.tinta },
  periodoIntervalo: { lineHeight: 12.5 },
  periodoLinha: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  periodoCampeao: {
    fontFamily: fonte.corpoRegular,
    fontSize: 13.5,
    lineHeight: 13.5 * 1.3,
    color: cores.corpo,
  },
  periodoMeu: {
    marginLeft: 'auto',
    fontFamily: fonte.corpoRegular,
    fontSize: 13.5,
    lineHeight: 13.5 * 1.3,
  },
  periodoNota: { flexDirection: 'row', gap: 7, alignItems: 'flex-start' },
  periodoNotaTexto: {
    flex: 1,
    fontFamily: fonte.corpoRegular,
    fontSize: 12.5,
    lineHeight: 12.5 * 1.45,
  },
});
