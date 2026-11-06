import { Text, TextProps, TextStyle } from 'react-native';

import { numerosTabulares, texto } from '@/tema/tipografia';

type Props = TextProps & {
  /** Preset de src/tema/tipografia.ts. */
  variante?: keyof typeof texto;
  /** Sobrescreve a cor do preset. */
  cor?: string;
  /** Numerais de largura fixa — use em contagens, posicoes e horarios. */
  tabular?: boolean;
};

/**
 * Todo texto do app passa por aqui, para que familia, tamanho e entrelinha
 * venham sempre dos presets e nunca de valores soltos na tela.
 */
export function Texto({ variante = 'corpoMedio', cor, tabular, style, ...props }: Props) {
  const base = texto[variante] as TextStyle;
  return (
    <Text
      {...props}
      style={[base, tabular && numerosTabulares, cor ? { color: cor } : null, style]}
    />
  );
}
