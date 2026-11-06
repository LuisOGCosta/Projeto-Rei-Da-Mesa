import { StyleSheet, View, ViewStyle, StyleProp} from 'react-native';

import { cores, veu } from '@/tema/tokens';

/** Hairline de 1px. "verde" e o filete curto de 56px que abre as telas de acesso. */
export function Divisor({
  verde,
  estilo,
}: {
  verde?: boolean;
  estilo?: StyleProp<ViewStyle>;
}) {
  return <View style={[verde ? estilos.verde : estilos.neutro, estilo]} />;
}

const estilos = StyleSheet.create({
  neutro: { height: 1, backgroundColor: veu.borda16 },
  verde: { width: 56, height: 1, backgroundColor: cores.verdeBorda },
});
