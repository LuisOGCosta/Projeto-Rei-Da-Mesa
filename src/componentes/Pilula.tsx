import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp} from 'react-native';

import { fonte } from '@/tema/tipografia';
import { cores, raio } from '@/tema/tokens';

import { Icone, NomeIcone } from './Icone';
import { Texto } from './Texto';

/**
 * As cinco marcas de aviso do handoff — cada tipo de notificacao tem uma
 * forma propria, para ser reconhecida antes de ser lida:
 *
 *  convite   pilula verde com contorno        · pessoa com +
 *  fila      pilula preta com contorno        · lista com checks
 *  chamada   selo quadrado verde 1.5px        · regua verde embutida no topo
 *  resultado pilula de filete duplo verde     · trofeu
 *  revisao   faixa preta preenchida           · escudo (so admin)
 *
 * "simples" e a pilula de rotulo sem icone, usada dentro das telas
 * (ex.: "Voce esta jogando").
 */
export type VariantePilula =
  | 'convite'
  | 'fila'
  | 'chamada'
  | 'resultado'
  | 'revisao'
  | 'simples'
  | 'simplesPreta';

type Props = {
  children: ReactNode;
  variante?: VariantePilula;
  /** Sobrescreve o icone padrao da variante. Use null para nao mostrar nenhum. */
  icone?: NomeIcone | null;
  estilo?: StyleProp<ViewStyle>;
};

const iconePadrao: Record<VariantePilula, NomeIcone | null> = {
  convite: 'convite',
  fila: 'fila',
  chamada: 'chamada',
  resultado: 'trofeu',
  revisao: 'escudo',
  simples: null,
  simplesPreta: null,
};

export function Pilula({ children, variante = 'simples', icone, estilo }: Props) {
  const nome = icone === undefined ? iconePadrao[variante] : icone;
  const preta = variante === 'fila' || variante === 'simplesPreta';
  const invertida = variante === 'revisao';

  const corTexto = invertida ? cores.papel : preta ? cores.tinta : cores.verdeTexto;
  const Glifo = nome ? Icone[nome] : null;

  const conteudo = (
    <>
      {Glifo ? <Glifo size={14} color={corTexto} strokeWidth={1.8} /> : null}
      <Texto
        variante="kickerCurto"
        cor={corTexto}
        // Na chamada o rotulo sobe para 600, para o selo pesar mais que as outras marcas.
        style={variante === 'chamada' ? { fontFamily: fonte.corpoSemi } : undefined}>
        {children}
      </Texto>
    </>
  );

  // Filete duplo: o CSS "border:3px double" desenha linha, vao, linha. O RN nao
  // tem border-style double, entao sao duas bordas de 1px com 1px de vao.
  if (variante === 'resultado') {
    return (
      <View style={[estilos.base, estilos.pilula, estilos.bordaExterna, estilo]}>
        <View style={[estilos.base, estilos.pilula, estilos.bordaInterna]}>{conteudo}</View>
      </View>
    );
  }

  // Selo da chamada: quadrado, com a regua verde embutida no topo.
  if (variante === 'chamada') {
    return (
      <View style={[estilos.base, estilos.selo, estilo]}>
        <View style={estilos.reguaTopo} />
        {conteudo}
      </View>
    );
  }

  return (
    <View
      style={[
        estilos.base,
        variante === 'revisao' ? estilos.faixa : estilos.pilula,
        variante === 'revisao' && { backgroundColor: cores.tinta, borderColor: cores.tinta },
        preta && { borderColor: cores.tinta },
        variante === 'simples' && estilos.compacta,
        estilo,
      ]}>
      {conteudo}
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    alignSelf: 'flex-start',
  },
  pilula: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: raio.pilula,
    borderWidth: 1,
    borderColor: cores.verdeBorda,
  },
  compacta: { paddingVertical: 5, paddingHorizontal: 10, gap: 6 },
  faixa: {
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: raio.campo,
    borderWidth: 1,
  },
  selo: {
    paddingTop: 9,
    paddingBottom: 6,
    paddingHorizontal: 11,
    borderRadius: raio.campo,
    borderWidth: 1.5,
    borderColor: cores.verdeBorda,
    overflow: 'hidden',
  },
  reguaTopo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: cores.verdeBorda,
  },
  bordaExterna: { padding: 1 },
  bordaInterna: { borderColor: cores.verdeBorda },
});
