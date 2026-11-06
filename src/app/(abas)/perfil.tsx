import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AtalhoDeRevisao } from '@/componentes/AtalhoDeRevisao';
import { Avatar } from '@/componentes/Avatar';
import { CabecalhoPreto } from '@/componentes/CabecalhoPreto';
import { Icone } from '@/componentes/Icone';
import { Texto } from '@/componentes/Texto';
import { historico, numerosDoPerfil, periodoAtual, TipoDeMarca } from '@/dados/mock';
import { useSessao } from '@/dados/sessao';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, raio, toque, veu } from '@/tema/tokens';

/** 03 · Perfil. Conta, números do período e histórico de partidas. */
export default function Perfil() {
  const { usuario } = useSessao();
  const Sair = Icone.sair;

  return (
    <View style={estilos.tela}>
      <CabecalhoPreto acima={10} abaixo={16} estilo={estilos.cabecalho}>
        <Avatar iniciais={usuario.iniciais} tamanho={72} variante="eu" />
        <View style={estilos.identidade}>
          <Texto variante="titulo" cor={cores.papel}>
            {usuario.nome}
          </Texto>
          <Texto variante="nota" cor={cores.neutro400} style={estilos.contato}>
            “{usuario.apelido}” · {usuario.email}
          </Texto>
        </View>
      </CabecalhoPreto>

      <View style={estilos.numeros}>
        <Numero valor={numerosDoPerfil.posicao} rotulo={'no ranking\n(empatado)'} verde comDivisor />
        <Numero valor={String(numerosDoPerfil.vitorias)} rotulo={'vitórias\nno período'} comDivisor />
        <Numero valor={String(numerosDoPerfil.partidas)} rotulo={'partidas\njogadas'} />
      </View>

      <View style={estilos.periodo}>
        <Texto variante="meta" style={estilos.periodoTexto}>
          Período de {periodoAtual.mes.toLowerCase()} · {periodoAtual.intervalo}
        </Texto>
      </View>

      <ScrollView style={estilos.lista} contentContainerStyle={estilos.listaConteudo}>
        <Texto variante="kicker" style={estilos.tituloLista}>
          Histórico de partidas
        </Texto>
        {historico.map((linha, i) => (
          <LinhaDeHistorico key={`${linha.titulo}-${i}`} {...linha} />
        ))}
      </ScrollView>

      {/* Sai quando o desenho estiver fechado. */}
      <View style={estilos.atalhos}>
        <AtalhoDeRevisao />
      </View>

      <View style={estilos.rodape}>
        <Texto variante="nota" style={estilos.links}>
          <Texto variante="nota" cor={cores.verdeTexto}>
            Termos
          </Texto>{' '}
          ·{' '}
          <Texto variante="nota" cor={cores.verdeTexto}>
            Privacidade
          </Texto>
        </Texto>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/acesso/login')}
          style={({ pressed }) => [estilos.sair, pressed && { backgroundColor: veu.borda06 }]}>
          <Sair size={16} color={cores.tinta} strokeWidth={1.7} />
          <Texto variante="rotuloBotao" cor={cores.tinta} style={estilos.rotuloSair}>
            Sair
          </Texto>
        </Pressable>
      </View>
    </View>
  );
}

function Numero({
  valor,
  rotulo,
  verde,
  comDivisor,
}: {
  valor: string;
  rotulo: string;
  verde?: boolean;
  comDivisor?: boolean;
}) {
  return (
    <View style={[estilos.numero, comDivisor && estilos.numeroComDivisor]}>
      <Texto
        tabular
        cor={verde ? cores.verdeTexto : cores.tinta}
        style={estilos.valorNumero}>
        {valor}
      </Texto>
      <Texto variante="metaMiuda" style={estilos.rotuloNumero}>
        {rotulo}
      </Texto>
    </View>
  );
}

/** Marca da linha: vitória em verde, derrota em cinza, revertida em preto. */
const marcaPorTipo: Record<TipoDeMarca, { borda: string; texto: string }> = {
  vitoria: { borda: cores.verdeBorda, texto: cores.verdeTexto },
  derrota: { borda: cores.neutro500, texto: cores.secundario },
  revertida: { borda: cores.tinta, texto: cores.tinta },
};

function LinhaDeHistorico({
  marca,
  tipo,
  titulo,
  detalhe,
  pontos,
}: (typeof historico)[number]) {
  const cor = marcaPorTipo[tipo];
  const Reverter = Icone.reverter;

  return (
    <View style={estilos.linha}>
      <View style={[estilos.marca, { borderColor: cor.borda }]}>
        {tipo === 'revertida' ? (
          <Reverter size={15} color={cor.texto} strokeWidth={1.7} />
        ) : (
          <Texto cor={cor.texto} style={estilos.marcaTexto}>
            {marca}
          </Texto>
        )}
      </View>
      <View style={estilos.linhaTexto}>
        <Texto variante="nomeLinha">{titulo}</Texto>
        <Texto variante="metaMiuda">{detalhe}</Texto>
      </View>
      <Texto tabular cor={cores.corpo} style={estilos.pontos}>
        {pontos}
      </Texto>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  cabecalho: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  identidade: { gap: 4, flex: 1 },
  contato: { lineHeight: 13 * 1.3 },

  numeros: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: veu.borda16 },
  numero: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  numeroComDivisor: { borderRightWidth: 1, borderRightColor: veu.borda16 },
  valorNumero: { fontFamily: fonte.tituloRegular, fontSize: 32, lineHeight: 32 },
  rotuloNumero: { marginTop: 5, textAlign: 'center' },

  periodo: {
    paddingVertical: 10,
    paddingHorizontal: espaco.pagina,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  periodoTexto: { lineHeight: 12.5 },

  lista: { flex: 1 },
  listaConteudo: { paddingHorizontal: espaco.pagina, paddingTop: 14 },
  tituloLista: { paddingBottom: 6 },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },
  marca: {
    width: 30,
    height: 30,
    flexShrink: 0,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marcaTexto: { fontFamily: fonte.tituloSemi, fontSize: 14, lineHeight: 14 },
  linhaTexto: { flex: 1, gap: 2 },
  pontos: { fontFamily: fonte.corpoRegular, fontSize: 15, lineHeight: 15 },

  atalhos: { paddingHorizontal: espaco.pagina },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: espaco.pagina,
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },
  links: { lineHeight: 13 },
  sair: {
    minHeight: toque.minimo,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: veu.borda28,
    borderRadius: raio.campo,
  },
  rotuloSair: { fontSize: 12, letterSpacing: 12 * 0.14 },
});
