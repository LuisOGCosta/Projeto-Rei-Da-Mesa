import { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { cores, opacidadeDesabilitado, raio, veu } from '@/tema/tokens';

export type VarianteCartao =
  /** Hairline neutra — o cartao padrao. */
  | 'neutro'
  /** Borda verde 1.5px + fundo tingido a 6% — opcao escolhida. */
  | 'selecionado'
  /** Borda verde 1px — destaque sem selecao (ex.: sua dupla na fila). */
  | 'verde'
  /** Borda preta — o cartao exige atencao do administrador. */
  | 'atencao';

type Props = {
  children: ReactNode;
  variante?: VarianteCartao;
  /** Esmaece o cartao a 45%, como nos itens fora do prazo. */
  esmaecido?: boolean;
  onPress?: () => void;
  estilo?: ViewStyle;
};

const porVariante: Record<VarianteCartao, { borda: string; larguraBorda: number; fundo: string }> = {
  neutro: { borda: veu.borda20, larguraBorda: 1, fundo: 'transparent' },
  selecionado: { borda: cores.verdeBorda, larguraBorda: 1.5, fundo: veu.selecao06 },
  verde: { borda: cores.verdeBorda, larguraBorda: 1, fundo: 'transparent' },
  atencao: { borda: cores.tinta, larguraBorda: 1, fundo: 'transparent' },
};

export function Cartao({ children, variante = 'neutro', esmaecido, onPress, estilo }: Props) {
  const v = porVariante[variante];
  const visual: ViewStyle = {
    borderColor: v.borda,
    borderWidth: v.larguraBorda,
    backgroundColor: v.fundo,
    opacity: esmaecido ? opacidadeDesabilitado : 1,
  };

  if (!onPress) return <View style={[estilos.base, visual, estilo]}>{children}</View>;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [estilos.base, visual, pressed && { opacity: 0.7 }, estilo]}>
      {children}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: { borderRadius: raio.campo, padding: 13, paddingHorizontal: 14 },
});
