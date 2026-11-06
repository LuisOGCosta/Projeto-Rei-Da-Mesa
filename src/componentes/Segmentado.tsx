import { Pressable, StyleSheet, View } from 'react-native';

import { fonte } from '@/tema/tipografia';
import { cores, raio } from '@/tema/tokens';

import { Texto } from './Texto';

/**
 * Seletor de duas abas sobre o cabecalho preto. A opcao ativa fica em
 * verde-selo, com fundo tingido e um filete verde embaixo.
 */
export function Segmentado<T extends string>({
  opcoes,
  valor,
  aoMudar,
}: {
  opcoes: { id: T; rotulo: string }[];
  valor: T;
  aoMudar: (id: T) => void;
}) {
  return (
    <View style={estilos.caixa}>
      {opcoes.map((o, i) => {
        const ativa = o.id === valor;
        return (
          <Pressable
            key={o.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativa }}
            onPress={() => aoMudar(o.id)}
            style={[
              estilos.opcao,
              i > 0 && estilos.divisor,
              ativa && estilos.opcaoAtiva,
            ]}>
            <Texto
              cor={ativa ? cores.verdeSelo : cores.neutro350}
              style={[estilos.rotulo, ativa && estilos.rotuloAtivo]}>
              {o.rotulo}
            </Texto>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(243,242,242,.3)',
    borderRadius: raio.campo,
    overflow: 'hidden',
  },
  opcao: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  divisor: { borderLeftWidth: 1, borderLeftColor: 'rgba(243,242,242,.3)' },
  opcaoAtiva: {
    backgroundColor: 'rgba(121,168,97,.18)',
    borderBottomWidth: 2,
    borderBottomColor: cores.verdeCampo,
  },
  rotulo: { fontFamily: fonte.corpoRegular, fontSize: 13 },
  rotuloAtivo: { fontFamily: fonte.corpoMedio },
});
