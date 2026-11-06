import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cores, espaco } from '@/tema/tokens';

type Props = {
  children: ReactNode;
  /** Padding vertical do bloco. O desenho varia por tela (6-16px). */
  acima?: number;
  abaixo?: number;
  estilo?: StyleProp<ViewStyle>;
};

/**
 * Faixa preta do topo com o filete verde de 3px embaixo. Aparece em Agora,
 * Ranking, Perfil e Admin. Cobre tambem a area da barra de status do
 * aparelho, que no desenho e os 50px pretos do topo.
 */
export function CabecalhoPreto({ children, acima = 6, abaixo = 14, estilo }: Props) {
  const inset = useSafeAreaInsets();

  return (
    <View style={[estilos.base, { paddingTop: inset.top + acima, paddingBottom: abaixo }, estilo]}>
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    backgroundColor: cores.tinta,
    paddingHorizontal: espaco.pagina,
    borderBottomWidth: 3,
    borderBottomColor: cores.verdeBorda,
  },
});
