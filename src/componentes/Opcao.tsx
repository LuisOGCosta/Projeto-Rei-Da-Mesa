import { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { cores, opacidadeDesabilitado, raio, veu } from '@/tema/tokens';

import { Texto } from './Texto';

/** Bolinha de escolha: 22px, 1.5px de borda, ponto de 10px quando marcada. */
export function Bolinha({ marcada }: { marcada: boolean }) {
  return (
    <View style={[estilos.bolinha, { borderColor: marcada ? cores.verdeBorda : cores.neutro500 }]}>
      {marcada ? <View style={estilos.ponto} /> : null}
    </View>
  );
}

type PropsLinha = {
  children: ReactNode;
  marcada?: boolean;
  desabilitada?: boolean;
  onPress?: () => void;
  /** Altura minima da linha (48 nos motivos, 56 na lista de colegas). */
  altura?: number;
  estilo?: ViewStyle;
};

/**
 * Linha de escolha com a bolinha a direita (lista de colegas) ou com um
 * rotulo simples (motivos de revisao). O conteudo fica por conta de quem usa.
 */
export function LinhaDeOpcao({
  children,
  marcada = false,
  desabilitada,
  onPress,
  altura = 48,
  estilo,
}: PropsLinha) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: marcada, disabled: !!desabilitada }}
      disabled={desabilitada}
      onPress={onPress}
      style={({ pressed }) => [
        estilos.linha,
        { minHeight: altura },
        desabilitada && { opacity: opacidadeDesabilitado },
        pressed && !desabilitada && { backgroundColor: veu.borda06 },
        estilo,
      ]}>
      {children}
    </Pressable>
  );
}

/** Motivo de revisao: bolinha a esquerda e o texto ao lado. */
export function MotivoDeRevisao({
  rotulo,
  marcada,
  onPress,
}: {
  rotulo: string;
  marcada: boolean;
  onPress: () => void;
}) {
  return (
    <LinhaDeOpcao marcada={marcada} onPress={onPress} estilo={estilos.motivo}>
      <Bolinha marcada={marcada} />
      <Texto variante="valorCampo" style={estilos.rotuloMotivo}>
        {rotulo}
      </Texto>
    </LinhaDeOpcao>
  );
}

/**
 * Cartao de escolha do vencedor: borda verde 1.5px e fundo tingido a 6%
 * quando marcado.
 */
export function CartaoDeOpcao({
  children,
  marcada,
  onPress,
}: {
  children: ReactNode;
  marcada: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: marcada }}
      onPress={onPress}
      style={({ pressed }) => [
        estilos.cartao,
        marcada
          ? { borderWidth: 1.5, borderColor: cores.verdeBorda, backgroundColor: veu.selecao06 }
          : { borderWidth: 1, borderColor: veu.borda24 },
        pressed && { opacity: 0.8 },
      ]}>
      <Bolinha marcada={marcada} />
      {children}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  bolinha: {
    width: 22,
    height: 22,
    flexShrink: 0,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ponto: { width: 10, height: 10, borderRadius: 5, backgroundColor: cores.verdeBorda },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  motivo: { borderBottomWidth: 1, borderBottomColor: veu.borda16 },
  rotuloMotivo: { fontSize: 15 },
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: raio.campo,
  },
});
