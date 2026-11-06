import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/componentes/Avatar';
import { Botao } from '@/componentes/Botao';
import { Icone } from '@/componentes/Icone';
import { Pilula } from '@/componentes/Pilula';
import { Tela } from '@/componentes/Tela';
import { Texto } from '@/componentes/Texto';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, raio, veu } from '@/tema/tokens';

/**
 * 06 · Convite enviado.
 *
 * Quem convida já está confirmado; a dupla só entra na fila quando o
 * parceiro aceitar, e a posição é o momento dessa segunda confirmação.
 */
export default function ConviteEnviado() {
  const inset = useSafeAreaInsets();
  const Check = Icone.check;
  const Relogio = Icone.relogio;

  return (
    <Tela semRespiroBaixo>
      <View style={[estilos.conteudo, { paddingTop: inset.top + 30 }]}>
        <Pilula variante="convite">Convite de dupla</Pilula>

        <Texto variante="tituloGrande">Aguardando a resposta de Tati</Texto>

        <View style={estilos.dupla}>
          <Avatar iniciais="RA" tamanho={56} variante="eu" />
          <Texto style={estilos.e}>&amp;</Texto>
          <View style={estilos.pendente}>
            <Texto cor={cores.secundario} style={estilos.iniciaisPendentes}>
              TB
            </Texto>
          </View>
        </View>

        <View style={estilos.passos}>
          <Passo
            icone={<Check size={14} color={cores.verdeTexto} strokeWidth={2.2} />}
            cor={cores.verdeBorda}
            rotulo="Você confirmou"
            valor="14:25"
            tabular
          />
          <Passo
            icone={<Relogio size={14} color={cores.secundario} strokeWidth={1.8} />}
            cor={cores.neutro500}
            rotulo="Tati ainda não respondeu"
            valor="pendente"
          />
        </View>

        <View style={estilos.aviso}>
          <Texto variante="corpoMedio" style={estilos.avisoTexto}>
            Vocês{' '}
            <Texto variante="corpoMedio" cor={cores.tinta} style={estilos.forte}>
              ainda não estão na fila
            </Texto>
            . A posição é definida quando os dois confirmarem, duplas que confirmarem antes entram
            na frente.
          </Texto>
        </View>

        <Botao
          rotulo="Cancelar convite"
          variante="secundario"
          estilo={estilos.cancelar}
          onPress={() => router.back()}
        />
      </View>
    </Tela>
  );
}

function Passo({
  icone,
  cor,
  rotulo,
  valor,
  tabular,
}: {
  icone: React.ReactNode;
  cor: string;
  rotulo: string;
  valor: string;
  tabular?: boolean;
}) {
  return (
    <View style={estilos.passo}>
      <View style={[estilos.passoMarca, { borderColor: cor }]}>{icone}</View>
      <Texto variante="valorCampo" style={estilos.passoRotulo}>
        {rotulo}
      </Texto>
      <Texto variante="nota" tabular={tabular} style={estilos.passoValor}>
        {valor}
      </Texto>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteudo: { flex: 1, paddingHorizontal: espaco.pagina, paddingBottom: 34, gap: 18 },
  dupla: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  e: {
    fontFamily: fonte.tituloItalico,
    fontSize: 26,
    lineHeight: 26,
    color: cores.secundario,
  },
  // O parceiro ainda nao respondeu: circulo vazio, com borda neutra.
  pendente: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: cores.neutro500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iniciaisPendentes: { fontFamily: fonte.tituloSemi, fontSize: 20, lineHeight: 20 },

  passos: { borderTopWidth: 1, borderTopColor: veu.borda16 },
  passo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 54,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  passoMarca: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passoRotulo: { flex: 1, fontSize: 15 },
  passoValor: { lineHeight: 13 },

  aviso: {
    borderWidth: 1,
    borderColor: 'rgba(32,31,29,.18)',
    borderRadius: raio.campo,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  avisoTexto: { fontSize: 14.5, lineHeight: 14.5 * 1.55 },
  forte: { fontFamily: fonte.corpoSemi, fontSize: 14.5, lineHeight: 14.5 * 1.55 },

  cancelar: { marginTop: 'auto' },
});
