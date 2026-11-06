import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Botao } from '@/componentes/Botao';
import { Pilula } from '@/componentes/Pilula';
import { Tela } from '@/componentes/Tela';
import { Texto } from '@/componentes/Texto';
import { useJogo } from '@/dados/jogo';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, veu } from '@/tema/tokens';

/**
 * 08 · Entrada na fila. A dupla entrou; a posição vale para os dois e é o
 * momento da segunda confirmação.
 */
export default function EntradaNaFila() {
  const inset = useSafeAreaInsets();
  const { definirEstado } = useJogo();

  function acompanhar() {
    definirEstado('fila');
    router.dismissAll();
    router.replace('/agora');
  }

  return (
    <Tela semRespiroBaixo>
      <View style={[estilos.conteudo, { paddingTop: inset.top + 30 }]}>
        <Pilula variante="fila">Entrada na fila</Pilula>

        <View style={estilos.posicao}>
          <Texto tabular cor={cores.verdeTexto} style={estilos.numero}>
            3.ª
          </Texto>
          <Texto style={estilos.rotuloPosicao}>{'dupla\nna fila'}</Texto>
        </View>

        <Texto style={estilos.titulo}>Rafa &amp; Tati estão na fila</Texto>

        <Texto variante="corpoMedio" style={estilos.explicacao}>
          Tati aceitou às 14:26. Vocês dois veem a mesma posição e o mesmo status até a chamada.
        </Texto>

        <View style={estilos.detalhes}>
          <Detalhe rotulo="À frente" valor="Cris & Tom · Gu & Vivi" />
          <Detalhe rotulo="Vocês jogam" valor="na chamada após a próxima" />
        </View>

        <Texto variante="corpoMedio" cor={cores.secundario}>
          Na sua vez, um aviso aparece na tela com 1 minuto para confirmar.
        </Texto>

        <Botao rotulo="Acompanhar a fila" estilo={estilos.acao} onPress={acompanhar} />
      </View>
    </Tela>
  );
}

function Detalhe({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={estilos.detalhe}>
      <Texto cor={cores.secundario} style={estilos.detalheRotulo}>
        {rotulo}
      </Texto>
      <Texto style={estilos.detalheValor}>{valor}</Texto>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteudo: { flex: 1, paddingHorizontal: espaco.pagina, paddingBottom: 34, gap: 18 },
  posicao: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 14,
    paddingTop: 6,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  numero: {
    fontFamily: fonte.tituloRegular,
    fontSize: 120,
    lineHeight: 120 * 0.8,
    letterSpacing: -3.6,
  },
  rotuloPosicao: {
    fontFamily: fonte.corpoRegular,
    fontSize: 17,
    lineHeight: 17 * 1.3,
    color: cores.corpo,
    paddingBottom: 4,
  },
  titulo: { fontFamily: fonte.tituloRegular, fontSize: 34, lineHeight: 34, color: cores.tinta },
  explicacao: { fontSize: 14.5, lineHeight: 14.5 * 1.55 },

  detalhes: { borderTopWidth: 1, borderTopColor: veu.borda16 },
  detalhe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    minHeight: 46,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  detalheRotulo: { fontFamily: fonte.corpoRegular, fontSize: 14.5 },
  detalheValor: { fontFamily: fonte.corpoRegular, fontSize: 14.5, color: cores.tinta, flexShrink: 1, textAlign: 'right' },

  acao: { marginTop: 'auto' },
});
