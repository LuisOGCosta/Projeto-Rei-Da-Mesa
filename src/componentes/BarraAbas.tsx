import { ComponentRef, ReactNode, Ref } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabListProps, TabTriggerSlotProps } from 'expo-router/ui';

import { cores } from '@/tema/tokens';

import { Icone, NomeIcone } from './Icone';
import { Texto } from './Texto';

/**
 * Barra preta de navegacao. A aba ativa fica verde-selo com um filete
 * verde-campo de 2px por cima, que encosta na borda superior da barra.
 */
export function BarraAbas({ children, style, ...props }: TabListProps) {
  const inset = useSafeAreaInsets();
  // O desenho reserva 22px embaixo para o indicador de home.
  const respiro = Math.max(inset.bottom, 22);

  return (
    <View {...props} style={[estilos.barra, { paddingBottom: respiro }, style]}>
      {children}
    </View>
  );
}

type PropsBotao = Omit<TabTriggerSlotProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof Pressable>>;
  rotulo: string;
  icone: NomeIcone;
  children?: ReactNode;
};

export function BotaoAba({ rotulo, icone, isFocused, ...props }: PropsBotao) {
  const Glifo = Icone[icone];
  const cor = isFocused ? cores.verdeSelo : cores.neutro400;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      accessibilityLabel={rotulo}
      {...props}
      style={[estilos.aba, { borderTopColor: isFocused ? cores.verdeCampo : 'transparent' }]}>
      <Glifo size={22} color={cor} strokeWidth={1.6} />
      <Texto variante="rotuloAba" cor={cor}>
        {rotulo}
      </Texto>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    backgroundColor: cores.tinta,
    borderTopWidth: 1,
    borderTopColor: cores.tinta,
    paddingHorizontal: 8,
  },
  aba: {
    flex: 1,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderTopWidth: 2,
    marginTop: -1,
  },
});
