import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cores, raio, veu } from '@/tema/tokens';

type Props = {
  children: ReactNode;
  /** Fecha a folha. Em rotas, normalmente router.back(). */
  onFechar?: () => void;
  /**
   * Regua verde de 4px no topo da folha — marca da chamada para a mesa.
   * (O README fala em "regua inset 3px"; as telas em HTML usam borda de 4px.)
   */
  reguaVerde?: boolean;
  /**
   * Toque no fundo fecha a folha. Desligue quando a decisao nao pode ser
   * adiada com um toque fora — e o caso da chamada, que tem prazo de 60 s.
   */
  fechaAoToqueFora?: boolean;
  /** Rola o conteudo quando ele passa da altura da tela. */
  rolavel?: boolean;
};

/**
 * Bottom sheet sobre fundo semitransparente. Todos os sobrepostos do app
 * (convite recebido, chamada, registrar vencedor, pedir revisao) usam esta
 * mesma geometria: cantos de cima de 18px, 24px de padding lateral.
 *
 * Use dentro de uma rota com presentation "transparentModal", para que a tela
 * de baixo continue visivel.
 */
export function Folha({
  children,
  onFechar,
  reguaVerde,
  fechaAoToqueFora = true,
  rolavel,
}: Props) {
  const inset = useSafeAreaInsets();
  // 36px de respiro no desenho + a area do indicador de home do aparelho.
  const respiroBaixo = 36 + inset.bottom;

  const folha = (
    <View
      style={[
        estilos.folha,
        reguaVerde && estilos.regua,
        { paddingTop: reguaVerde ? 24 : 26, paddingBottom: respiroBaixo },
      ]}>
      {children}
    </View>
  );

  return (
    <View style={estilos.fundo}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fechar"
        style={estilos.areaDeFora}
        onPress={fechaAoToqueFora ? onFechar : undefined}
      />
      {rolavel ? (
        <ScrollView
          bounces={false}
          style={estilos.rolagem}
          contentContainerStyle={estilos.conteudoRolagem}>
          {folha}
        </ScrollView>
      ) : (
        folha
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: veu.fundoModal,
    justifyContent: 'flex-end',
  },
  areaDeFora: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  rolagem: { flexGrow: 0 },
  conteudoRolagem: { justifyContent: 'flex-end' },
  folha: {
    backgroundColor: cores.papel,
    borderTopLeftRadius: raio.folha,
    borderTopRightRadius: raio.folha,
    paddingHorizontal: 24,
    gap: 15,
  },
  regua: { borderTopWidth: 4, borderTopColor: cores.verdeBorda },
});
