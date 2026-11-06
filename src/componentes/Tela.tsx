import { ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cores, espaco } from '@/tema/tokens';

/**
 * Casca de tela: fundo de papel e o respiro de baixo do aparelho.
 *
 * "rolavel" para conteudo que passa da altura da tela; "fixa" para as telas
 * que tem um rodape preso embaixo.
 */
export function Tela({
  children,
  rolavel,
  semRespiroBaixo,
  estilo,
  estiloConteudo,
}: {
  children: ReactNode;
  rolavel?: boolean;
  /** Quando a tela tem rodape proprio ou barra de abas cuidando do respiro. */
  semRespiroBaixo?: boolean;
  estilo?: StyleProp<ViewStyle>;
  estiloConteudo?: StyleProp<ViewStyle>;
}) {
  const inset = useSafeAreaInsets();
  const respiro = semRespiroBaixo ? 0 : inset.bottom;

  if (rolavel) {
    return (
      <ScrollView
        style={[estilos.tela, estilo]}
        contentContainerStyle={[{ paddingBottom: respiro }, estiloConteudo]}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[estilos.tela, { paddingBottom: respiro }, estilo]}>{children}</View>
  );
}

/** Bloco com o padding horizontal padrao da pagina (22px). */
export function Pagina({
  children,
  estilo,
  largo,
}: {
  children: ReactNode;
  estilo?: StyleProp<ViewStyle>;
  /** 26px, usado nas telas de formulario. */
  largo?: boolean;
}) {
  return (
    <View
      style={[{ paddingHorizontal: largo ? espaco.paginaLarga : espaco.pagina }, estilo]}>
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
});
