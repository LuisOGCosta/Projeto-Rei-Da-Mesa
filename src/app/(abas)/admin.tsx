import { StyleSheet, View } from 'react-native';

import { CabecalhoPreto } from '@/componentes/CabecalhoPreto';
import { Icone } from '@/componentes/Icone';
import { Texto } from '@/componentes/Texto';
import { cores, espaco } from '@/tema/tokens';

/** Modo administrador: resultados recentes e janela de 2 h para corrigir. */
export default function Admin() {
  const Escudo = Icone.escudo;

  return (
    <View style={estilos.tela}>
      <CabecalhoPreto acima={10} abaixo={10} estilo={estilos.cabecalho}>
        <Escudo size={18} color={cores.papel} strokeWidth={1.6} />
        <Texto variante="kicker" cor={cores.papel} style={estilos.rotulo}>
          Modo administrador
        </Texto>
        <Texto variante="nota" cor={cores.neutro350} style={estilos.quem}>
          Marina Couto · no local
        </Texto>
      </CabecalhoPreto>

      <View style={estilos.corpo}>
        <Texto variante="corpoMedio" cor={cores.secundario}>
          Lista de resultados e reversao entram aqui no bloco de “Admin”.
        </Texto>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  cabecalho: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  // No cabecalho do admin o rotulo usa 12px com entreletra .16em.
  rotulo: { fontSize: 12, lineHeight: 12, letterSpacing: 12 * 0.16 },
  quem: { marginLeft: 'auto' },
  corpo: { flex: 1, paddingHorizontal: espaco.pagina, paddingTop: 16 },
});
