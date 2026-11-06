import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '@/componentes/Avatar';
import { BarraDeVolta } from '@/componentes/BarraDeVolta';
import { Botao } from '@/componentes/Botao';
import { Bolinha, LinhaDeOpcao } from '@/componentes/Opcao';
import { Icone } from '@/componentes/Icone';
import { Pilula } from '@/componentes/Pilula';
import { Tela } from '@/componentes/Tela';
import { Texto } from '@/componentes/Texto';
import { parceirosPossiveis } from '@/dados/pessoas';
import { fonte } from '@/tema/tipografia';
import { cores, espaco, raio, veu } from '@/tema/tokens';

/**
 * 04 · Escolher parceiro e 05 · Parceiro sem conta.
 *
 * É a mesma tela: quando a busca não encontra ninguém cadastrado, ela passa
 * a explicar que o colega precisa criar a conta antes de ser convidado.
 */
export default function EscolherParceiro() {
  const [busca, setBusca] = useState('');
  const [escolhido, setEscolhido] = useState(parceirosPossiveis[0].pessoa.id);

  const Lupa = Icone.busca;
  const Fechar = Icone.fechar;

  const encontrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return parceirosPossiveis;
    return parceirosPossiveis.filter(
      (p) =>
        p.pessoa.apelido.toLowerCase().includes(termo) ||
        p.pessoa.nome.toLowerCase().includes(termo)
    );
  }, [busca]);

  const semResultado = busca.trim().length > 0 && encontrados.length === 0;
  const pessoaEscolhida = parceirosPossiveis.find((p) => p.pessoa.id === escolhido)?.pessoa;

  return (
    <Tela semRespiroBaixo>
      <BarraDeVolta de="Agora" />

      <View style={estilos.conteudo}>
        <Pilula variante="convite">Convite de dupla</Pilula>

        <View style={estilos.titulos}>
          <Texto style={estilos.titulo}>Com quem você joga?</Texto>
          {!semResultado ? (
            <Texto variante="corpoMedio" style={estilos.subtitulo}>
              A dupla vale só para a próxima partida.
            </Texto>
          ) : null}
        </View>

        <View style={[estilos.busca, busca ? estilos.buscaAtiva : estilos.buscaNormal]}>
          <Lupa size={18} color={busca ? cores.tinta : cores.secundario} strokeWidth={1.7} />
          <Texto
            variante={busca ? 'valorCampo' : 'valorCampo'}
            cor={busca ? cores.tinta : cores.secundario}
            style={estilos.buscaTexto}
            onPress={() => setBusca(busca ? '' : 'Fernanda')}>
            {busca || 'Buscar colega cadastrado'}
          </Texto>
          {busca ? (
            <Pressable onPress={() => setBusca('')} accessibilityLabel="Limpar busca">
              <Fechar size={18} color={cores.corpo} strokeWidth={1.7} />
            </Pressable>
          ) : null}
        </View>

        {semResultado ? (
          <SemConta nome={busca.trim()} aoEscolherOutro={() => setBusca('')} />
        ) : (
          <ListaDeColegas escolhido={escolhido} aoEscolher={setEscolhido} lista={encontrados} />
        )}
      </View>

      {!semResultado ? (
        <View style={estilos.rodape}>
          <View style={estilos.naoEncontrou}>
            <Texto variante="corpoMedio">Não encontrou? </Texto>
            <Texto variante="corpoMedio" cor={cores.verdeTexto} style={estilos.sublinhado}>
              Seu parceiro precisa ter conta
            </Texto>
          </View>
          <Botao
            rotulo={`Convidar ${pessoaEscolhida?.apelido ?? ''}`.trim()}
            onPress={() => router.push('/dupla/enviado')}
          />
        </View>
      ) : null}
    </Tela>
  );
}

function ListaDeColegas({
  lista,
  escolhido,
  aoEscolher,
}: {
  lista: typeof parceirosPossiveis;
  escolhido: string;
  aoEscolher: (id: string) => void;
}) {
  return (
    <View style={estilos.lista}>
      <Texto variante="kicker" cor={cores.secundario} style={estilos.tituloLista}>
        Disponíveis
      </Texto>
      <ScrollView showsVerticalScrollIndicator={false}>
        {lista.map(({ pessoa, meta, indisponivel }) => (
          <LinhaDeOpcao
            key={pessoa.id}
            altura={56}
            marcada={escolhido === pessoa.id}
            desabilitada={indisponivel}
            onPress={() => aoEscolher(pessoa.id)}
            estilo={estilos.linhaColega}>
            <Avatar iniciais={pessoa.iniciais} tamanho={38} />
            <View style={estilos.colegaTexto}>
              <Texto variante="nomeLista">{pessoa.apelido}</Texto>
              <Texto variante="meta">{meta}</Texto>
            </View>
            <Bolinha marcada={escolhido === pessoa.id && !indisponivel} />
          </LinhaDeOpcao>
        ))}
      </ScrollView>
    </View>
  );
}

function SemConta({ nome, aoEscolherOutro }: { nome: string; aoEscolherOutro: () => void }) {
  const SemConta = Icone.semConta;
  const Enviar = Icone.enviar;

  return (
    <>
      <View style={estilos.vazio}>
        <View style={estilos.vazioIcone}>
          <SemConta size={28} color={cores.corpo} strokeWidth={1.6} />
        </View>
        <Texto style={estilos.vazioTitulo}>Ninguém chamado “{nome}” no Futmesa</Texto>
        <Texto variante="corpoMedio" style={estilos.vazioTexto}>
          Para jogar, ela precisa entrar com a conta Google e concluir o cadastro. Depois disso,
          aparece aqui e você envia o convite.
        </Texto>
      </View>

      <View style={estilos.vazioAcoes}>
        <Botao rotulo="Enviar link do app" icone={<Enviar size={16} color={cores.papel} strokeWidth={1.8} />} />
        <Botao rotulo="Escolher outro parceiro" variante="secundario" onPress={aoEscolherOutro} />
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  conteudo: { flex: 1, paddingHorizontal: espaco.pagina, paddingTop: 8, gap: 14 },
  titulos: { gap: 6 },
  titulo: { fontFamily: fonte.tituloRegular, fontSize: 38, lineHeight: 38, color: cores.tinta },
  subtitulo: { fontSize: 14.5, lineHeight: 14.5 * 1.5 },

  busca: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: raio.campo,
    backgroundColor: cores.campo,
  },
  buscaNormal: { borderWidth: 1, borderColor: veu.borda24 },
  buscaAtiva: { borderWidth: 1.5, borderColor: cores.verdeBorda },
  buscaTexto: { flex: 1, fontSize: 15 },

  lista: { flex: 1 },
  tituloLista: { paddingBottom: 6 },
  linhaColega: { borderTopWidth: 1, borderTopColor: veu.borda16 },
  colegaTexto: { flex: 1, gap: 2 },

  vazio: { marginTop: 22, alignItems: 'center', gap: 12, paddingHorizontal: 8 },
  vazioIcone: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(32,31,29,.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vazioTitulo: {
    fontFamily: fonte.tituloRegular,
    fontSize: 26,
    lineHeight: 26 * 1.1,
    color: cores.tinta,
    textAlign: 'center',
  },
  vazioTexto: { fontSize: 14.5, lineHeight: 14.5 * 1.55, textAlign: 'center' },
  vazioAcoes: { marginTop: 'auto', gap: 10, paddingBottom: 34 },

  rodape: {
    paddingHorizontal: espaco.pagina,
    paddingTop: 12,
    paddingBottom: 34,
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },
  naoEncontrou: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  sublinhado: { textDecorationLine: 'underline' },
});
