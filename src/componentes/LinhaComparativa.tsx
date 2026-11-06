import { StyleSheet, View } from 'react-native';

import { fonte } from '@/tema/tipografia';
import { cores, veu } from '@/tema/tokens';

import { Texto } from './Texto';

/**
 * Linha "rótulo → valor" das comparações antes/depois: o que estava
 * registrado (riscado) e o que passa a valer (em 600).
 */
export function LinhaComparativa({
  rotulo,
  valor,
  riscado,
  forte,
}: {
  rotulo: string;
  valor: string;
  riscado?: boolean;
  forte?: boolean;
}) {
  return (
    <View style={estilos.linha}>
      <Texto cor={cores.secundario} style={estilos.rotulo}>
        {rotulo}
      </Texto>
      <Texto
        cor={riscado ? cores.secundario : cores.tinta}
        style={[estilos.valor, riscado && estilos.riscado, forte && estilos.forte]}>
        {valor}
      </Texto>
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  rotulo: { fontFamily: fonte.corpoRegular, fontSize: 14.5 },
  valor: { fontFamily: fonte.corpoRegular, fontSize: 14.5, flexShrink: 1, textAlign: 'right' },
  forte: { fontFamily: fonte.corpoSemi },
  riscado: { textDecorationLine: 'line-through' },
});
