import { ReactNode } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle, StyleProp} from 'react-native';

import { fonte } from '@/tema/tipografia';
import { cores, raio, veu } from '@/tema/tokens';

import { Icone } from './Icone';
import { Texto } from './Texto';

type Props = TextInputProps & {
  /** Rotulo em caixa alta acima do campo. */
  rotulo?: string;
  /** Linha de ajuda abaixo do campo. */
  ajuda?: string;
  /** Borda verde de 1.5px — o campo esta preenchido ou em foco. */
  destacado?: boolean;
  /** Campo de varias linhas, como o do pedido de revisao. */
  longo?: boolean;
  /** Icone a esquerda, dentro do campo (a lupa da busca). */
  icone?: ReactNode;
  estilo?: StyleProp<ViewStyle>;
};

/** Campo de texto. Mesma caixa para nome, apelido, busca e justificativa. */
export function Campo({ rotulo, ajuda, destacado, longo, icone, estilo, ...props }: Props) {
  return (
    <View style={[estilos.grupo, estilo]}>
      {rotulo ? (
        <Texto variante="kicker" cor={cores.secundario} style={estilos.rotulo}>
          {rotulo}
        </Texto>
      ) : null}

      <View
        style={[
          estilos.caixa,
          longo && estilos.caixaLonga,
          destacado ? estilos.destacada : estilos.normal,
        ]}>
        {icone}
        <TextInput
          {...props}
          multiline={longo}
          placeholderTextColor={cores.secundario}
          style={[estilos.entrada, longo && estilos.entradaLonga]}
        />
      </View>

      {ajuda ? <Texto variante="meta">{ajuda}</Texto> : null}
    </View>
  );
}

/** Campo de busca de colega, com a lupa a esquerda. */
export function CampoDeBusca(props: Omit<Props, 'icone' | 'rotulo' | 'longo'>) {
  const Lupa = Icone.busca;
  return (
    <Campo
      {...props}
      icone={<Lupa size={18} color={cores.secundario} strokeWidth={1.7} />}
      estilo={estilos.busca}
    />
  );
}

const estilos = StyleSheet.create({
  grupo: { gap: 7 },
  // O rotulo do campo usa entreletra .16em, menor que a dos kickers de secao.
  rotulo: { letterSpacing: 11 * 0.16 },
  caixa: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: raio.campo,
    backgroundColor: cores.campo,
  },
  caixaLonga: { minHeight: 78, alignItems: 'flex-start', paddingVertical: 12 },
  normal: { borderWidth: 1, borderColor: veu.borda24 },
  destacada: { borderWidth: 1.5, borderColor: cores.verdeBorda },
  entrada: {
    flex: 1,
    fontFamily: fonte.corpoRegular,
    fontSize: 16,
    color: cores.tinta,
    // Sem isso o TextInput do Android ganha um padding proprio.
    padding: 0,
  },
  entradaLonga: { fontSize: 15, lineHeight: 15 * 1.45, minHeight: 54, textAlignVertical: 'top' },
  busca: { gap: 0 },
});
