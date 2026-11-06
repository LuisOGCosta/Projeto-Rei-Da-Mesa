import { StyleSheet, View } from 'react-native';

import { cores, veu } from '@/tema/tokens';

/**
 * Filete de progresso. Verde e grosso na contagem da chamada; preto e fino
 * no prazo de correcao do administrador.
 */
export function BarraDeProgresso({
  fracao,
  variante = 'verde',
}: {
  /** 0 a 1. */
  fracao: number;
  variante?: 'verde' | 'preta';
}) {
  const altura = variante === 'verde' ? 4 : 3;
  const limitada = Math.max(0, Math.min(1, fracao));

  return (
    <View style={[estilos.trilho, { height: altura }]}>
      <View
        style={{
          height: altura,
          width: `${limitada * 100}%`,
          backgroundColor: variante === 'verde' ? cores.verdeBorda : cores.tinta,
        }}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  trilho: {
    backgroundColor: veu.borda12,
    borderRadius: 2,
    overflow: 'hidden',
  },
});
