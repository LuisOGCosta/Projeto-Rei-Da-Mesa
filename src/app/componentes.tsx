import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, ParDeAvatares } from '@/componentes/Avatar';
import { Botao } from '@/componentes/Botao';
import { Cartao } from '@/componentes/Cartao';
import { Divisor } from '@/componentes/Divisor';
import { Icone } from '@/componentes/Icone';
import { LogoGoogle } from '@/componentes/LogoGoogle';
import { Pilula } from '@/componentes/Pilula';
import { Texto } from '@/componentes/Texto';
import { cores, espaco } from '@/tema/tokens';

/**
 * Mostruario dos componentes base, para conferir cor, tipo e forma num lugar
 * so. Nao faz parte do produto: sai quando o app estiver fechado.
 */
export default function Componentes() {
  const inset = useSafeAreaInsets();

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={[
        estilos.conteudo,
        { paddingTop: inset.top + 16, paddingBottom: inset.bottom + 40 },
      ]}>
      <View style={estilos.topo}>
        <Texto variante="kicker">Base do projeto</Texto>
        <Texto variante="tituloGrande">Componentes</Texto>
        <Divisor verde />
      </View>

      <Secao titulo="Botões">
        <Botao rotulo="Confirmar presença" variante="primario" />
        <Botao rotulo="Cancelar convite" variante="secundario" />
        <Botao rotulo="Revisar" variante="escuro" />
        <Botao rotulo="Continuar com Google" icone={<LogoGoogle tamanho={20} />} caixaNormal alto />
        <Botao rotulo="Indisponível" variante="primario" disabled />
      </Secao>

      <Secao titulo="Marcas de aviso">
        <Pilula variante="convite">Convite de dupla</Pilula>
        <Pilula variante="fila">Entrada na fila</Pilula>
        <Pilula variante="chamada">Chamada para a mesa</Pilula>
        <Pilula variante="resultado">Resultado · n.º 413</Pilula>
        <Pilula variante="revisao">Revisão administrativa</Pilula>
        <Pilula variante="simples">Você está jogando</Pilula>
      </Secao>

      <Secao titulo="Avatares">
        <View style={estilos.linha}>
          <Avatar iniciais="RA" tamanho={72} variante="eu" />
          <Avatar iniciais="TB" tamanho={40} variante="colega" />
          <Avatar iniciais="CP" tamanho={32} variante="colega" />
          <Avatar tamanho={42} variante="vaga" />
          <Avatar iniciais="GR" tamanho={40} variante="campeao" />
        </View>
        <ParDeAvatares a="RA" b="TB" />
      </Secao>

      <Secao titulo="Cartões">
        <Cartao variante="neutro">
          <Texto variante="tituloCartao">Partida n.º 412</Texto>
          <Texto variante="meta">registrado 14:38 por Nino</Texto>
        </Cartao>
        <Cartao variante="selecionado">
          <Texto variante="tituloCartao">Rafa &amp; Tati</Texto>
          <Texto variante="meta">opção escolhida</Texto>
        </Cartao>
        <Cartao variante="verde">
          <Texto variante="tituloCartao">Sua dupla na fila</Texto>
          <Texto variante="meta">3.ª posição</Texto>
        </Cartao>
        <Cartao variante="atencao">
          <Texto variante="tituloCartao">Revisão pedida</Texto>
          <Texto variante="meta">por Cris às 15:02</Texto>
        </Cartao>
        <Cartao variante="neutro" esmaecido>
          <Texto variante="tituloCartao">Prazo encerrado</Texto>
          <Texto variante="meta">às 14:50</Texto>
        </Cartao>
      </Secao>

      <Secao titulo="Folha (bottom sheet)">
        <Botao
          rotulo="Abrir folha de exemplo"
          variante="secundario"
          onPress={() => router.push('/folha-exemplo')}
        />
      </Secao>

      <Secao titulo="Ícones">
        <View style={estilos.linha}>
          {(
            ['agora', 'trofeu', 'perfil', 'escudo', 'convite', 'fila', 'chamada', 'relogio', 'busca', 'reverter', 'bandeira', 'calendario'] as const
          ).map((nome) => {
            const Glifo = Icone[nome];
            return <Glifo key={nome} size={22} color={cores.verdeTexto} strokeWidth={1.6} />;
          })}
        </View>
      </Secao>

      <Botao rotulo="Voltar" variante="secundario" onPress={() => router.back()} />
    </ScrollView>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <View style={estilos.secao}>
      <Texto variante="kicker" cor={cores.secundario}>
        {titulo}
      </Texto>
      <Divisor />
      <View style={estilos.itens}>{children}</View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  conteudo: { paddingHorizontal: espaco.pagina, gap: 26 },
  topo: { gap: 8 },
  secao: { gap: 8 },
  // Botoes e cartoes ocupam a largura toda, como nas telas; as pilulas tem
  // alignSelf flex-start proprio e continuam do tamanho do conteudo.
  itens: { gap: 10 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
});
