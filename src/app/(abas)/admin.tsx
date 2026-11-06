import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BarraDeProgresso } from '@/componentes/BarraDeProgresso';
import { Botao } from '@/componentes/Botao';
import { CabecalhoPreto } from '@/componentes/CabecalhoPreto';
import { Cartao } from '@/componentes/Cartao';
import { Icone } from '@/componentes/Icone';
import { Texto } from '@/componentes/Texto';
import { ResultadoRecente, resultadosRecentes } from '@/dados/mock';
import { ADMIN } from '@/dados/pessoas';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, veu } from '@/tema/tokens';

/**
 * 20 · Admin · resultados recentes. Correções valem até 2 h após o registro
 * original, e a fila segue normalmente durante a revisão.
 */
export default function Admin() {
  const Escudo = Icone.escudo;

  return (
    <View style={estilos.tela}>
      <CabecalhoPreto acima={10} abaixo={10} estilo={estilos.cabecalho}>
        <Escudo size={18} color={cores.papel} strokeWidth={1.6} />
        <Texto variante="kicker" cor={cores.papel} numberOfLines={1} style={estilos.rotulo}>
          Modo administrador
        </Texto>
        <Texto variante="meta" cor={cores.neutro350} numberOfLines={1} style={estilos.quem}>
          {ADMIN.nome} · no local
        </Texto>
      </CabecalhoPreto>

      <View style={estilos.intro}>
        <Texto variante="kicker" cor={cores.secundario}>
          Revisão administrativa
        </Texto>
        <Texto variante="titulo">Resultados recentes</Texto>
        <Texto variante="corpoMiudo">
          Correções permitidas até 2 h após o registro original. A fila segue normalmente durante a
          revisão.
        </Texto>
      </View>

      <ScrollView contentContainerStyle={estilos.lista} showsVerticalScrollIndicator={false}>
        {resultadosRecentes.map((r) => (
          <CartaoDeResultado key={r.numero} resultado={r} />
        ))}
      </ScrollView>
    </View>
  );
}

function CartaoDeResultado({ resultado }: { resultado: ResultadoRecente }) {
  const Bandeira = Icone.bandeira;

  return (
    <Cartao
      variante={resultado.sinalizacao ? 'atencao' : 'neutro'}
      esmaecido={!resultado.podeReverter}
      estilo={estilos.cartao}>
      <View style={estilos.cabecalhoCartao}>
        <Texto variante="kickerCurto" cor={cores.secundario}>
          Partida n.º {resultado.numero}
        </Texto>
        <Texto variante="meta" tabular style={estilos.registro}>
          registrado {resultado.registradoAs} por {resultado.registradoPor}
        </Texto>
      </View>

      <Texto style={estilos.confronto}>
        <Texto style={estilos.vencedores}>{resultado.vencedores}</Texto> venceram{' '}
        {resultado.perdedores}
      </Texto>

      {resultado.sinalizacao ? (
        <View style={estilos.sinalizacao}>
          <Bandeira size={15} color={cores.tinta} strokeWidth={1.8} />
          <Texto variante="nota" cor={cores.tinta} style={estilos.sinalizacaoTexto}>
            {resultado.sinalizacao}
          </Texto>
        </View>
      ) : null}

      <View style={estilos.prazo}>
        <View style={estilos.prazoBarra}>
          <BarraDeProgresso fracao={resultado.fracaoRestante} variante="preta" />
          <Texto variante="meta" tabular cor={cores.corpo} style={estilos.prazoTexto}>
            {resultado.prazo}
          </Texto>
        </View>
        {resultado.podeReverter ? (
          <Botao
            rotulo="Revisar"
            variante="escuro"
            estilo={estilos.revisar}
            onPress={() => router.push('/reverter')}
          />
        ) : null}
      </View>
    </Cartao>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  cabecalho: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  /**
   * O desenho pede 12px aqui, mas com o nome da administradora ao lado a
   * linha precisa de 319px num espaco de 308 — nao cabe nos 390 do aparelho.
   * Voltamos o kicker aos 11px do restante do app e o nome a 12px: tudo cabe
   * numa linha so, sem cortar "no local", que diz que ela esta presente.
   */
  rotulo: { letterSpacing: 11 * 0.16, flexShrink: 0 },
  quem: { marginLeft: 'auto', flexShrink: 1, lineHeight: 12 },

  intro: {
    paddingHorizontal: espaco.pagina,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },

  lista: { paddingHorizontal: espaco.pagina, paddingTop: 14, gap: 12 },
  cartao: { gap: 9 },
  cabecalhoCartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 8,
  },
  registro: { lineHeight: 12.5 },
  confronto: {
    fontFamily: fonte.tituloRegular,
    fontSize: 20,
    lineHeight: 20 * 1.15,
    color: cores.tinta,
  },
  vencedores: { fontFamily: fonte.tituloSemi, fontSize: 20, lineHeight: 20 * 1.15 },

  sinalizacao: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  sinalizacaoTexto: { flex: 1, lineHeight: 13 * 1.3 },

  prazo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  prazoBarra: { flex: 1, gap: 5 },
  prazoTexto: { lineHeight: 12.5 },
  // Botao de 44px, menor que o de tela cheia.
  revisar: { minHeight: 44, paddingHorizontal: 16 },
});
