import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { cores, veu } from '@/tema/tokens';

import { Texto } from './Texto';

/**
 * Faixa de atalhos da revisão do desenho: leva ao índice das 24 telas e ao
 * mostruário de componentes.
 *
 * Não faz parte do produto. Quando o desenho estiver fechado, basta apagar
 * este componente e a linha que o usa no Perfil.
 */
export function AtalhoDeRevisao() {
  return (
    <View style={estilos.faixa}>
      <Texto variante="kickerCurto" cor={cores.secundario}>
        Revisão
      </Texto>
      <Atalho rotulo="24 telas" aoTocar={() => router.push('/telas')} />
      <Atalho rotulo="Componentes" aoTocar={() => router.push('/componentes')} />
    </View>
  );
}

function Atalho({ rotulo, aoTocar }: { rotulo: string; aoTocar: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={aoTocar}
      style={({ pressed }) => [estilos.atalho, pressed && { backgroundColor: veu.borda06 }]}>
      <Texto variante="meta" cor={cores.verdeTexto} style={estilos.rotulo}>
        {rotulo}
      </Texto>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  faixa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },
  atalho: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: veu.borda24,
    borderRadius: 999,
  },
  rotulo: { lineHeight: 12.5 },
});
