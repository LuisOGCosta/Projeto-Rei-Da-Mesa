import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/componentes/Avatar';
import { Botao } from '@/componentes/Botao';
import { Icone } from '@/componentes/Icone';
import { Pilula } from '@/componentes/Pilula';
import { Tela } from '@/componentes/Tela';
import { Texto } from '@/componentes/Texto';
import { useJogo } from '@/dados/jogo';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, raio, veu } from '@/tema/tokens';

/**
 * 18 · Resultado para a outra dupla. Vista de quem perdeu: ponto de quem
 * venceu, dupla desfeita e o prazo para pedir revisão.
 */
export default function Resultado() {
  const inset = useSafeAreaInsets();
  const { definirEstado } = useJogo();
  const Escudo = Icone.escudo;

  return (
    <Tela semRespiroBaixo>
      <View style={[estilos.conteudo, { paddingTop: inset.top + 30 }]}>
        <Pilula variante="resultado">Resultado registrado</Pilula>

        <Texto variante="tituloGrande">Rafa &amp; Tati venceram</Texto>
        <Texto variante="corpoMedio" cor={cores.secundario} style={estilos.registro}>
          Registrado por Tati às 14:58 · partida n.º 413
        </Texto>

        <View style={estilos.duplas}>
          <LinhaDeDupla
            a="RA"
            b="TB"
            nome="Rafa & Tati"
            marca="Venceu · +1"
            corDaMarca={cores.verdeTexto}
          />
          <LinhaDeDupla
            a="CP"
            b="TF"
            nome="Cris & Tom"
            sufixo="(você)"
            marca="0 pts"
            corDaMarca={cores.secundario}
            souEu
          />
        </View>

        <Texto variante="corpoMedio" style={estilos.desfeita}>
          A dupla se desfez. Para jogar de novo, forme uma nova dupla e entre na fila.
        </Texto>

        <View style={estilos.prazo}>
          <Escudo size={18} color={cores.corpo} strokeWidth={1.7} />
          <Texto variante="corpoMedio" style={estilos.prazoTexto}>
            Discorda? Só o administrador presente pode corrigir o resultado, até{' '}
            <Texto cor={cores.tinta} style={estilos.prazoForte}>
              16:58
            </Texto>
            .
          </Texto>
        </View>

        <View style={estilos.acoes}>
          <Botao
            rotulo="Formar nova dupla"
            onPress={() => {
              definirEstado('vazia');
              router.replace('/dupla/escolher');
            }}
          />
          <Botao
            rotulo="Pedir revisão"
            variante="secundario"
            onPress={() => router.push('/revisao')}
          />
        </View>
      </View>
    </Tela>
  );
}

function LinhaDeDupla({
  a,
  b,
  nome,
  sufixo,
  marca,
  corDaMarca,
  souEu,
}: {
  a: string;
  b: string;
  nome: string;
  sufixo?: string;
  marca: string;
  corDaMarca: string;
  souEu?: boolean;
}) {
  return (
    <View style={estilos.linha}>
      <View style={estilos.avatares}>
        <Avatar iniciais={a} tamanho={34} variante={souEu ? 'eu' : 'colega'} />
        <Avatar iniciais={b} tamanho={34} estilo={estilos.segundo} />
      </View>
      <Texto style={[estilos.nome, souEu && { color: cores.corpo }]}>
        {nome}
        {sufixo ? <Texto variante="nota"> {sufixo}</Texto> : null}
      </Texto>
      <Texto variante="kickerCurto" cor={corDaMarca}>
        {marca}
      </Texto>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteudo: { flex: 1, paddingHorizontal: espaco.pagina, paddingBottom: 34, gap: 16 },
  registro: { fontSize: 14, lineHeight: 14 * 1.4 },

  duplas: { borderTopWidth: 1, borderTopColor: veu.borda16 },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  avatares: { flexDirection: 'row' },
  segundo: { marginLeft: -8 },
  nome: { flex: 1, fontFamily: fonte.tituloRegular, fontSize: 20, lineHeight: 20, color: cores.tinta },

  desfeita: { fontSize: 14.5, lineHeight: 14.5 * 1.55 },

  prazo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: veu.borda24,
    borderRadius: raio.campo,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  prazoTexto: { flex: 1 },
  prazoForte: { fontFamily: fonte.corpoSemi, fontSize: 14, lineHeight: 14 * 1.5 },

  acoes: { marginTop: 'auto', gap: 10 },
});
