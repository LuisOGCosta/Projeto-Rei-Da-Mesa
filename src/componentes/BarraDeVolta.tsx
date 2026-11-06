import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cores, toque } from '@/tema/tokens';

import { Icone } from './Icone';
import { Texto } from './Texto';

/**
 * Volta para a tela anterior, com o nome de onde se veio. Aparece nas telas
 * de formacao de dupla, que saem de "Agora".
 */
export function BarraDeVolta({ de = 'Agora' }: { de?: string }) {
  const inset = useSafeAreaInsets();
  const Seta = Icone.anterior;

  return (
    <View style={[estilos.barra, { paddingTop: inset.top + 2 }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Voltar para ${de}`}
        onPress={() => router.back()}
        style={({ pressed }) => [estilos.botao, pressed && { opacity: 0.6 }]}>
        <Seta size={22} color={cores.corpo} strokeWidth={1.7} />
      </Pressable>
      <Texto variante="valorCampo" cor={cores.corpo} style={estilos.rotulo}>
        {de}
      </Texto>
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 12 },
  botao: {
    width: toque.minimo,
    height: toque.minimo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotulo: { fontSize: 15 },
});
