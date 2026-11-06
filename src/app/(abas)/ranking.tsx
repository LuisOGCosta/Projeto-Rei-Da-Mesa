import { StyleSheet, View } from 'react-native';

import { CabecalhoPreto } from '@/componentes/CabecalhoPreto';
import { Texto } from '@/componentes/Texto';
import { cores, espaco } from '@/tema/tokens';

/** Ranking mensal individual: 1 ponto por vitoria, do dia 30 ao 29. */
export default function Ranking() {
  return (
    <View style={estilos.tela}>
      <CabecalhoPreto acima={6} abaixo={12} estilo={estilos.cabecalho}>
        <View style={estilos.titulos}>
          <Texto variante="kicker" cor={cores.verdeSelo}>
            Ranking mensal
          </Texto>
          <Texto variante="titulo" cor={cores.papel} style={estilos.mes}>
            Novembro
          </Texto>
        </View>
      </CabecalhoPreto>

      <View style={estilos.corpo}>
        <Texto variante="corpoMedio" cor={cores.secundario}>
          Classificacao e periodos anteriores entram aqui no bloco de “Ranking”.
        </Texto>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  cabecalho: { gap: 12 },
  titulos: { gap: 5 },
  // O ranking usa um titulo maior que o das outras telas (34 no desenho).
  mes: { fontSize: 34, lineHeight: 34 },
  corpo: { flex: 1, paddingHorizontal: espaco.pagina, paddingTop: 16 },
});
