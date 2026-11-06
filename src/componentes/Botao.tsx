import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleSheet, View, ViewStyle } from 'react-native';

import { cores, opacidadeDesabilitado, raio, toque, veu } from '@/tema/tokens';

import { Texto } from './Texto';

export type VarianteBotao =
  /** Preenchido #3f6f36 com texto claro — a acao principal da tela. */
  | 'primario'
  /** Contorno rgba(32,31,29,.28) — acao secundaria. */
  | 'secundario'
  /** Contorno preto 1.5px — acoes do modo administrador. */
  | 'escuro'
  /** Contorno claro sobre fundo preto — usado na tela de vitoria. */
  | 'claro';

type Props = Omit<PressableProps, 'style' | 'children'> & {
  rotulo: string;
  variante?: VarianteBotao;
  /** Icone a esquerda do rotulo (ex.: o "G" do Google). */
  icone?: ReactNode;
  /** Mantem o rotulo em caixa normal, como no botao "Continuar com Google". */
  caixaNormal?: boolean;
  /** 56px em vez de 54px, como pede o botao do login. */
  alto?: boolean;
  estilo?: ViewStyle;
};

const porVariante: Record<
  VarianteBotao,
  { fundo: string; borda: string; larguraBorda: number; texto: string; fundoPressionado: string }
> = {
  primario: {
    fundo: cores.verdePrimario,
    borda: cores.verdePrimario,
    larguraBorda: 1.5,
    texto: cores.papel,
    // Estado pressionado vem da rampa verde (um passo mais escuro).
    fundoPressionado: cores.verdeTexto,
  },
  secundario: {
    fundo: 'transparent',
    borda: veu.borda28,
    larguraBorda: 1,
    texto: cores.tinta,
    fundoPressionado: veu.borda06,
  },
  escuro: {
    fundo: 'transparent',
    borda: cores.tinta,
    larguraBorda: 1.5,
    texto: cores.tinta,
    fundoPressionado: veu.borda06,
  },
  claro: {
    fundo: 'transparent',
    borda: 'rgba(243,242,242,.4)',
    larguraBorda: 1,
    texto: cores.papel,
    fundoPressionado: 'rgba(243,242,242,.1)',
  },
};

export function Botao({
  rotulo,
  variante = 'primario',
  icone,
  caixaNormal,
  alto,
  estilo,
  disabled,
  ...props
}: Props) {
  const v = porVariante[variante];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      {...props}
      style={({ pressed }) => [
        estilos.base,
        {
          minHeight: alto ? toque.botaoGrande : toque.botao,
          backgroundColor: pressed ? v.fundoPressionado : v.fundo,
          borderColor: pressed && variante === 'primario' ? cores.verdeTexto : v.borda,
          borderWidth: v.larguraBorda,
        },
        disabled && { opacity: opacidadeDesabilitado },
        estilo,
      ]}>
      {icone ? <View style={estilos.icone}>{icone}</View> : null}
      <Texto variante={caixaNormal ? 'rotuloGoogle' : 'rotuloBotao'} cor={v.texto}>
        {rotulo}
      </Texto>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: raio.campo,
    paddingHorizontal: 16,
  },
  icone: { alignItems: 'center', justifyContent: 'center' },
});
