import { ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { cores } from '@/tema/tokens';

/**
 * No navegador, prende o app à largura de um celular (390 × 844, o quadro do
 * handoff) e centraliza na tela, com o fundo de apresentação em volta.
 *
 * Sem isto, o layout — desenhado para 390px — estica numa janela de desktop
 * e nada fica parecido com o desenho. No celular e no Expo Go não faz nada:
 * o app ocupa a tela toda, como deve.
 */
export function MolduraDeAparelho({ children }: { children: ReactNode }) {
  if (Platform.OS !== 'web') return <>{children}</>;

  return (
    <View style={estilos.fundo}>
      <View style={estilos.aparelho}>{children}</View>
    </View>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.tela,
  },
  aparelho: {
    width: '100%',
    maxWidth: 390,
    height: '100%',
    maxHeight: 844,
    backgroundColor: cores.papel,
    overflow: 'hidden',
  },
});
