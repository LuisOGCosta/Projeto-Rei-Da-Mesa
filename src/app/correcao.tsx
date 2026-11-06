import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Botao } from '@/componentes/Botao';
import { LinhaComparativa } from '@/componentes/LinhaComparativa';
import { Pilula } from '@/componentes/Pilula';
import { Tela } from '@/componentes/Tela';
import { Texto } from '@/componentes/Texto';
import { ADMIN } from '@/dados/pessoas';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, raio, toque, veu } from '@/tema/tokens';

const linhaDoTempo = [
  { hora: '14:58', texto: 'Tati registrou Rafa & Tati' },
  { hora: '15:02', texto: 'Cris pediu revisão' },
  { hora: '15:11', texto: 'Marina reverteu para Cris & Tom' },
];

/**
 * 22 · Aviso de correção. Vai para os quatro jogadores depois da reversão,
 * com o que mudou, a justificativa assinada e o histórico da alteração.
 */
export default function Correcao() {
  const inset = useSafeAreaInsets();

  return (
    <Tela semRespiroBaixo rolavel estiloConteudo={[estilos.conteudo, { paddingTop: inset.top + 26 }]}>
      <Pilula variante="revisao">Revisão administrativa</Pilula>

      <View style={estilos.titulos}>
        <Texto variante="tituloGrande">Resultado corrigido</Texto>
        <Texto variante="corpoMiudo" cor={cores.secundario}>
          Partida n.º 413 · hoje, 14:58
        </Texto>
      </View>

      <View style={estilos.comparacao}>
        <LinhaComparativa rotulo="Antes" valor="Rafa & Tati venceram" riscado />
        <LinhaComparativa rotulo="Agora" valor="Cris & Tom venceram" forte />
        <LinhaComparativa rotulo="Você" valor="−1 ponto · 2.º → 3.º" />
      </View>

      <View style={estilos.citacao}>
        <Texto style={estilos.citacaoTexto}>
          “Conferi com os quatro: o ponto final foi contra. Vitória de Cris &amp; Tom.”
        </Texto>
        <Texto variante="meta">{ADMIN.nome}, administradora · 15:11</Texto>
      </View>

      <View>
        <Texto variante="kicker" cor={cores.secundario} style={estilos.tituloHistorico}>
          Histórico da alteração
        </Texto>
        {linhaDoTempo.map((p) => (
          <View key={p.hora} style={estilos.passo}>
            <Texto tabular cor={cores.secundario} style={estilos.hora}>
              {p.hora}
            </Texto>
            <Texto style={estilos.passoTexto}>{p.texto}</Texto>
          </View>
        ))}
      </View>

      <View style={estilos.acoes}>
        <Botao rotulo="Entendi" onPress={() => router.replace('/agora')} />
        <Pressable style={estilos.verRanking} onPress={() => router.replace('/ranking')}>
          <Texto variante="valorCampo" cor={cores.corpo} style={estilos.verRankingTexto}>
            Ver ranking atualizado
          </Texto>
        </Pressable>
      </View>
    </Tela>
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    paddingHorizontal: espaco.pagina,
    paddingBottom: 34,
    gap: 15,
  },
  titulos: { gap: 5 },
  comparacao: { borderTopWidth: 1, borderTopColor: veu.borda16 },

  citacao: {
    borderWidth: 1,
    borderColor: 'rgba(32,31,29,.18)',
    borderRadius: raio.campo,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 8,
  },
  citacaoTexto: {
    fontFamily: fonte.corpoItalico,
    fontSize: 15,
    lineHeight: 15 * 1.55,
    color: cores.tinta,
  },

  tituloHistorico: { paddingBottom: 8 },
  passo: { flexDirection: 'row', gap: 12, paddingVertical: 2 },
  hora: { width: 42, fontFamily: fonte.corpoRegular, fontSize: 13.5, lineHeight: 13.5 * 1.45 },
  passoTexto: {
    flex: 1,
    fontFamily: fonte.corpoRegular,
    fontSize: 13.5,
    lineHeight: 13.5 * 1.45,
    color: cores.tinta,
  },

  acoes: { marginTop: 'auto', gap: 6, paddingTop: 10 },
  verRanking: { minHeight: toque.minimo, alignItems: 'center', justifyContent: 'center' },
  verRankingTexto: { fontSize: 15 },
});
