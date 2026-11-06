import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/componentes/Avatar';
import { CabecalhoPreto } from '@/componentes/CabecalhoPreto';
import { MesaAgora } from '@/componentes/MesaAgora';
import { Texto } from '@/componentes/Texto';
import { useJogo } from '@/dados/jogo';
import { conteudoDaMesa } from '@/dados/mesa';
import { useSessao } from '@/dados/sessao';
import { cores } from '@/tema/tokens';

/**
 * 09-11 e 15 · Acontecendo agora.
 *
 * Uma tela só para as cinco situações da mesa; o que muda é o conteúdo,
 * montado por conteudoDaMesa(estado).
 */
export default function Agora() {
  const { usuario } = useSessao();
  const { estado } = useJogo();
  const conteudo = conteudoDaMesa(estado);

  function aoTocarNaAcao() {
    if (estado === 'jogando') router.push('/registrar');
    else if (estado === 'fila') router.push('/agora');
    else router.push('/dupla/escolher');
  }

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

      <MesaAgora conteudo={conteudo} onAcao={aoTocarNaAcao} />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  titulos: { gap: 5, flex: 1 },
});
