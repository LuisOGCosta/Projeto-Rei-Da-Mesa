import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/componentes/Avatar';
import { CabecalhoPreto } from '@/componentes/CabecalhoPreto';
import { Texto } from '@/componentes/Texto';
import { useSessao } from '@/dados/sessao';
import { cores, espaco } from '@/tema/tokens';

/** Tela "Acontecendo agora": mesa, fila e a acao do momento. */
export default function Agora() {
  const { usuario } = useSessao();

  return (
    <View style={estilos.tela}>
      <CabecalhoPreto acima={6} abaixo={14} estilo={estilos.cabecalho}>
        <View style={estilos.titulos}>
          <Texto variante="kicker" cor={cores.verdeSelo}>
            Acontecendo agora
          </Texto>
          <Texto variante="titulo" cor={cores.papel}>
            Mesa do 3.º andar
          </Texto>
        </View>
        <Avatar iniciais={usuario.iniciais} tamanho={40} variante="eu" />
      </CabecalhoPreto>

      <View style={estilos.corpo}>
        <Texto variante="corpoMedio" cor={cores.secundario}>
          Mesa, fila e chamada entram aqui no bloco de “Agora”.
        </Texto>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  cabecalho: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 },
  titulos: { gap: 5 },
  corpo: { flex: 1, paddingHorizontal: espaco.pagina, paddingTop: 16 },
});
