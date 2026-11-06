import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/componentes/Avatar';
import { CabecalhoPreto } from '@/componentes/CabecalhoPreto';
import { Divisor } from '@/componentes/Divisor';
import { Texto } from '@/componentes/Texto';
import { useSessao } from '@/dados/sessao';
import { cores, espaco, veu } from '@/tema/tokens';

/** Perfil: dados da conta, numeros do periodo e historico de partidas. */
export default function Perfil() {
  const { usuario, admin, alternarAdmin } = useSessao();

  return (
    <View style={estilos.tela}>
      <CabecalhoPreto acima={10} abaixo={16} estilo={estilos.cabecalho}>
        <Avatar iniciais={usuario.iniciais} tamanho={72} variante="eu" />
        <View style={estilos.identidade}>
          <Texto variante="titulo" cor={cores.papel}>
            {usuario.nome}
          </Texto>
          <Texto variante="nota" cor={cores.neutro400}>
            “{usuario.apelido}” · {usuario.email}
          </Texto>
        </View>
      </CabecalhoPreto>

      <View style={estilos.corpo}>
        <Texto variante="corpoMedio" cor={cores.secundario}>
          Numeros do periodo e historico de partidas entram aqui no bloco de “Perfil”.
        </Texto>

        <Divisor estilo={estilos.divisor} />

        {/* Atalhos de revisao — saem quando o login e o backend entrarem. */}
        <Texto variante="kicker" cor={cores.secundario}>
          Revisão do desenho
        </Texto>
        <Link href="/componentes" asChild>
          <Pressable style={estilos.atalho}>
            <Texto variante="valorCampo">Componentes base</Texto>
            <Texto variante="meta">ver</Texto>
          </Pressable>
        </Link>
        <Pressable style={estilos.atalho} onPress={alternarAdmin}>
          <Texto variante="valorCampo">Entrar como administrador</Texto>
          <Texto variante="meta" cor={admin ? cores.verdeTexto : cores.secundario}>
            {admin ? 'ligado' : 'desligado'}
          </Texto>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  cabecalho: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  identidade: { gap: 4, flex: 1 },
  corpo: { flex: 1, paddingHorizontal: espaco.pagina, paddingTop: 16, gap: 10 },
  divisor: { marginVertical: 8 },
  atalho: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },
});
