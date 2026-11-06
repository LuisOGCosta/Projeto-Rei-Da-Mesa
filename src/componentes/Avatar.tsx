import { StyleSheet, View, ViewStyle, StyleProp} from 'react-native';

import { fonte } from '@/tema/tipografia';
import { cores, veu } from '@/tema/tokens';

import { Texto } from './Texto';

export type VarianteAvatar =
  /** Colega: fundo tingido, borda verde sutil. */
  | 'colega'
  /** Voce: a mesma base, com a borda de selecao mais forte. */
  | 'eu'
  /** Vaga livre na mesa: translucido sobre o campo verde. */
  | 'vaga'
  /** Primeiro lugar do ranking: preenchido em verde escuro. */
  | 'campeao';

type Props = {
  /** Iniciais, ex.: "RA". Em "vaga" o conteudo e sempre "+". */
  iniciais?: string;
  tamanho?: number;
  variante?: VarianteAvatar;
  estilo?: StyleProp<ViewStyle>;
};

const porVariante: Record<VarianteAvatar, { fundo: string; borda: string; larguraBorda: number; texto: string }> = {
  colega: { fundo: cores.verdeTinte, borda: cores.verdeSutil, larguraBorda: 1, texto: cores.verdeTexto },
  eu: { fundo: cores.verdeTinte, borda: cores.verdeBorda, larguraBorda: 1.5, texto: cores.verdeTexto },
  vaga: { fundo: veu.vagaFundo, borda: veu.vagaBorda, larguraBorda: 1, texto: cores.papel },
  campeao: { fundo: cores.verdeTexto, borda: cores.verdeTexto, larguraBorda: 1, texto: cores.papel },
};

/**
 * Avatar de iniciais. Em producao a foto do Google entra no lugar das
 * iniciais, mantendo o mesmo circulo e a mesma borda.
 */
export function Avatar({ iniciais = '', tamanho = 40, variante = 'colega', estilo }: Props) {
  const v = porVariante[variante];
  // Cormorant 600: a proporcao vem do handoff (26px num avatar de 72px).
  const corpoDaLetra = Math.round(tamanho * 0.36);

  return (
    <View
      style={[
        estilos.base,
        {
          width: tamanho,
          height: tamanho,
          borderRadius: tamanho / 2,
          backgroundColor: v.fundo,
          borderColor: v.borda,
          borderWidth: v.larguraBorda,
        },
        estilo,
      ]}>
      <Texto
        cor={v.texto}
        style={{ fontFamily: fonte.tituloSemi, fontSize: corpoDaLetra, lineHeight: corpoDaLetra }}>
        {variante === 'vaga' ? '+' : iniciais}
      </Texto>
    </View>
  );
}

/** Duas iniciais sobrepostas, como a dupla aparece na lista da fila. */
export function ParDeAvatares({
  a,
  b,
  tamanho = 32,
  variante = 'colega',
}: {
  a: string;
  b: string;
  tamanho?: number;
  variante?: VarianteAvatar;
}) {
  return (
    <View style={estilos.par}>
      <Avatar iniciais={a} tamanho={tamanho} variante={variante} />
      <Avatar iniciais={b} tamanho={tamanho} variante={variante} estilo={{ marginLeft: -8 }} />
    </View>
  );
}

const estilos = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  par: { flexDirection: 'row' },
});
