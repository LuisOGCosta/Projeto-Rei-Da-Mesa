import { Href, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Divisor } from '@/componentes/Divisor';
import { Texto } from '@/componentes/Texto';
import { useJogo } from '@/dados/jogo';
import { EstadoDaMesa } from '@/dados/mesa';
import { useSessao } from '@/dados/sessao';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, veu } from '@/tema/tokens';

type Destino = {
  numero: string;
  nome: string;
  href: Href;
  /** Estado em que a mesa precisa estar para a tela aparecer como no desenho. */
  estado?: EstadoDaMesa;
  /** Exige o modo administrador. */
  admin?: boolean;
};

const secoes: { romano: string; titulo: string; telas: Destino[] }[] = [
  {
    romano: 'I',
    titulo: 'Acesso, cadastro e perfil',
    telas: [
      { numero: '01', nome: 'Login', href: '/acesso/login' },
      { numero: '02', nome: 'Completar cadastro', href: '/acesso/cadastro' },
      { numero: '03', nome: 'Perfil', href: '/perfil' },
    ],
  },
  {
    romano: 'II',
    titulo: 'Formação e confirmação da dupla',
    telas: [
      { numero: '04', nome: 'Escolher parceiro', href: '/dupla/escolher' },
      { numero: '05', nome: 'Parceiro sem conta', href: '/dupla/escolher' },
      { numero: '06', nome: 'Convite enviado', href: '/dupla/enviado' },
      { numero: '07', nome: 'Convite recebido', href: '/convite-recebido', estado: 'livre' },
      { numero: '08', nome: 'Entrada na fila', href: '/dupla/na-fila' },
    ],
  },
  {
    romano: 'III',
    titulo: 'Acontecendo agora',
    telas: [
      { numero: '09', nome: 'Mesa livre, fila vazia', href: '/agora', estado: 'vazia' },
      { numero: '10', nome: 'Aguardando jogadores', href: '/agora', estado: 'aguardando' },
      { numero: '11', nome: 'Na fila, partida em andamento', href: '/agora', estado: 'fila' },
      { numero: '15', nome: 'Partida em andamento', href: '/agora', estado: 'jogando' },
    ],
  },
  {
    romano: 'IV',
    titulo: 'Chamada para a mesa',
    telas: [
      { numero: '12', nome: 'Chamada (60 s correndo)', href: '/chamada', estado: 'fila' },
      { numero: '13', nome: 'Chamada aguardando', href: '/chamada', estado: 'fila' },
      { numero: '14', nome: 'Chamada expirada', href: '/chamada', estado: 'fila' },
    ],
  },
  {
    romano: 'V',
    titulo: 'Resultado',
    telas: [
      { numero: '16', nome: 'Registrar vencedor', href: '/registrar', estado: 'jogando' },
      { numero: '17', nome: 'Vitória', href: '/vitoria' },
      { numero: '18', nome: 'Resultado para a outra dupla', href: '/resultado' },
      { numero: '19', nome: 'Pedir revisão', href: '/revisao', estado: 'livre' },
    ],
  },
  {
    romano: 'VI',
    titulo: 'Administrador',
    telas: [
      { numero: '20', nome: 'Admin · resultados', href: '/admin', admin: true },
      { numero: '21', nome: 'Reverter resultado', href: '/reverter', admin: true },
      { numero: '22', nome: 'Aviso de correção', href: '/correcao' },
    ],
  },
  {
    romano: 'VII',
    titulo: 'Ranking',
    telas: [
      { numero: '23', nome: 'Ranking mensal', href: '/ranking' },
      { numero: '24', nome: 'Períodos anteriores', href: '/ranking' },
    ],
  },
];

/**
 * Índice das 24 telas do handoff, para percorrer o desenho sem ter de
 * caminhar pelo fluxo todo. Não faz parte do produto: sai quando o app
 * estiver fechado.
 */
export default function Telas() {
  const inset = useSafeAreaInsets();
  const { definirEstado } = useJogo();
  const { admin, alternarAdmin } = useSessao();

  /** Deixa a mesa (e o modo admin) no estado em que a tela foi desenhada. */
  function abrir(destino: Destino) {
    if (destino.estado) definirEstado(destino.estado);
    if (destino.admin && !admin) alternarAdmin();
    router.push(destino.href);
  }

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={[
        estilos.conteudo,
        { paddingTop: inset.top + 16, paddingBottom: inset.bottom + 40 },
      ]}>
      <View style={estilos.topo}>
        <Texto variante="kicker">Handoff · 24 telas</Texto>
        <Texto variante="tituloGrande">Futmesa</Texto>
        <Divisor verde />
        <Texto variante="corpoMedio">
          Cada item abre a tela já no estado certo da mesa. Toque e use o gesto de voltar para
          retornar a este índice.
        </Texto>
      </View>

      {secoes.map((secao) => (
        <View key={secao.romano} style={estilos.secao}>
          <View style={estilos.tituloSecao}>
            <Texto tabular cor={cores.verdeTexto} style={estilos.romano}>
              {secao.romano}
            </Texto>
            <Texto variante="titulo" style={estilos.nomeSecao}>
              {secao.titulo}
            </Texto>
          </View>

          {secao.telas.map((t) => (
            <Pressable
              key={t.numero}
              onPress={() => abrir(t)}
              style={({ pressed }) => [estilos.item, pressed && estilos.itemTocado]}>
              <Texto tabular cor={cores.secundario} style={estilos.numero}>
                {t.numero}
              </Texto>
              <Texto variante="nomeLista" style={estilos.nomeTela}>
                {t.nome}
              </Texto>
              <Texto variante="meta">abrir</Texto>
            </Pressable>
          ))}
        </View>
      ))}

      <Pressable
        onPress={() => router.push('/componentes')}
        style={({ pressed }) => [estilos.item, pressed && estilos.itemTocado]}>
        <Texto tabular cor={cores.secundario} style={estilos.numero}>
          ·
        </Texto>
        <Texto variante="nomeLista" style={estilos.nomeTela}>
          Componentes base
        </Texto>
        <Texto variante="meta">abrir</Texto>
      </Pressable>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  conteudo: { paddingHorizontal: espaco.pagina, gap: 24 },
  topo: { gap: 8 },
  secao: { gap: 0 },
  tituloSecao: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda20,
    paddingBottom: 10,
    marginBottom: 4,
  },
  romano: { fontFamily: fonte.tituloRegular, fontSize: 18, lineHeight: 18 },
  nomeSecao: { flex: 1, fontSize: 24, lineHeight: 24 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  itemTocado: { backgroundColor: veu.borda06 },
  numero: { width: 26, fontFamily: fonte.corpoRegular, fontSize: 13 },
  nomeTela: { flex: 1 },
});
