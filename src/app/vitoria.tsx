import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Botao } from '@/componentes/Botao';
import { Icone } from '@/componentes/Icone';
import { Texto } from '@/componentes/Texto';
import { useJogo } from '@/dados/jogo';
import { fonte } from '@/tema/tipografia';
import { cores, toque } from '@/tema/tokens';

/**
 * 17 · Vitória. Tela preta inteira com o selo claro.
 *
 * O selo é estático, sem depender de animação, como pede o handoff.
 */
export default function Vitoria() {
  const inset = useSafeAreaInsets();
  const { definirEstado } = useJogo();
  const Trofeu = Icone.trofeu;

  function voltarParaAgora() {
    // A partida acabou: as duas duplas saem da mesa e da fila.
    definirEstado('vazia');
    router.replace('/agora');
  }

  return (
    <View style={estilos.tela}>
      <StatusBar style="light" />
      <View style={[estilos.conteudo, { paddingTop: inset.top + 30, paddingBottom: inset.bottom + 34 }]}>
        <View style={estilos.seloFora}>
          <View style={estilos.seloDentro}>
            <Trofeu size={28} color={cores.verdeSelo} strokeWidth={1.4} />
            <Texto cor={cores.verdeSelo} style={estilos.seloRotulo}>
              Vitória
            </Texto>
            <Texto tabular cor={cores.verdeSelo} style={estilos.seloData}>
              04 · XI · 2026
            </Texto>
          </View>
        </View>

        <Texto cor={cores.papel} style={estilos.manchete}>
          Rafa &amp; Tati{'\n'}
          <Texto cor={cores.papel} style={[estilos.manchete, estilos.italico]}>
            levaram a mesa.
          </Texto>
        </Texto>

        <View style={estilos.filete} />

        <Texto cor={cores.neutro350} style={estilos.ganho}>
          +1 ponto para cada um. Você subiu de 3.º para{' '}
          <Texto cor={cores.verdeSelo} style={estilos.ganhoForte}>
            2.º em novembro
          </Texto>
          , empatado com Duda.
        </Texto>

        <Texto cor={cores.neutro500} style={estilos.registro}>
          Registrado por Tati às 14:58 · partida n.º 413
        </Texto>

        <View style={estilos.acoes}>
          <Botao
            rotulo="Ver ranking"
            variante="seloClaro"
            alto
            onPress={() => {
              definirEstado('vazia');
              router.replace('/ranking');
            }}
          />
          <Pressable style={estilos.voltar} onPress={voltarParaAgora}>
            <Texto variante="valorCampo" cor={cores.neutro350} style={estilos.voltarTexto}>
              Voltar para Acontecendo agora
            </Texto>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.tintaVitoria },
  conteudo: { flex: 1, alignItems: 'center', paddingHorizontal: 26 },

  // Filete duplo do selo: anel externo de 196px e anel interno de 164px.
  seloFora: {
    width: 196,
    height: 196,
    borderRadius: 98,
    borderWidth: 2,
    borderColor: cores.verdeCampo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seloDentro: {
    width: 164,
    height: 164,
    borderRadius: 82,
    borderWidth: 1,
    borderColor: cores.verdeCampo,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  seloRotulo: {
    fontFamily: fonte.corpoSemi,
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 13 * 0.3,
    textTransform: 'uppercase',
    paddingLeft: 13 * 0.3,
  },
  seloData: {
    fontFamily: fonte.tituloRegular,
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 15 * 0.12,
  },

  manchete: {
    marginTop: 28,
    fontFamily: fonte.tituloRegular,
    fontSize: 46,
    lineHeight: 46 * 0.98,
    letterSpacing: -0.46,
    textAlign: 'center',
  },
  italico: { fontFamily: fonte.tituloItalico },
  filete: { width: 56, height: 1, backgroundColor: cores.verdeCampo, marginVertical: 20 },
  ganho: {
    fontFamily: fonte.corpoRegular,
    fontSize: 16,
    lineHeight: 16 * 1.55,
    textAlign: 'center',
  },
  ganhoForte: { fontFamily: fonte.corpoSemi, fontSize: 16, lineHeight: 16 * 1.55 },
  registro: {
    marginTop: 14,
    fontFamily: fonte.corpoRegular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    textAlign: 'center',
  },

  acoes: { marginTop: 'auto', width: '100%', gap: 6 },
  voltar: { minHeight: toque.minimo, alignItems: 'center', justifyContent: 'center' },
  voltarTexto: { fontSize: 15 },
});
