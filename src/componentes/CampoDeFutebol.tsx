import { StyleSheet, View } from 'react-native';

import { cores, raio, veu } from '@/tema/tokens';

import { Avatar, VarianteAvatar } from './Avatar';
import { Texto } from './Texto';

export type JogadorNoCampo = { iniciais?: string; variante: VarianteAvatar };

/**
 * A mesa vista de cima: campo verde com as linhas brancas, dois jogadores de
 * cada lado e o nome das duplas embaixo.
 */
export function CampoDeFutebol({
  esquerda,
  direita,
  nomeEsquerda,
  nomeDireita,
}: {
  esquerda: JogadorNoCampo[];
  direita: JogadorNoCampo[];
  nomeEsquerda: string;
  nomeDireita: string;
}) {
  return (
    <View style={estilos.bloco}>
      <View style={estilos.area}>
        <View style={estilos.gramado}>
          <View style={estilos.linhaCentral} />
          <View style={estilos.circuloCentral} />
          <View style={estilos.pontoCentral} />
          <View style={[estilos.gol, estilos.golEsquerdo]} />
          <View style={[estilos.gol, estilos.golDireito]} />
        </View>

        <View style={estilos.jogadores}>
          <View style={estilos.coluna}>
            {esquerda.map((j, i) => (
              <Avatar key={`e${i}`} iniciais={j.iniciais} tamanho={42} variante={j.variante} />
            ))}
          </View>
          <View style={estilos.coluna}>
            {direita.map((j, i) => (
              <Avatar key={`d${i}`} iniciais={j.iniciais} tamanho={42} variante={j.variante} />
            ))}
          </View>
        </View>
      </View>

      <View style={estilos.nomes}>
        <Texto variante="nomeDupla" style={estilos.nome}>
          {nomeEsquerda}
        </Texto>
        <Texto variante="nomeDupla" style={[estilos.nome, estilos.nomeDireita]}>
          {nomeDireita}
        </Texto>
      </View>
    </View>
  );
}

const branco = veu.linhaCampo;

const estilos = StyleSheet.create({
  bloco: { gap: 8 },
  area: { height: 124 },
  gramado: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: cores.verdePrimario,
    borderWidth: 3,
    borderColor: cores.tinta,
    borderRadius: raio.campoVerde,
  },
  linhaCentral: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1.5,
    marginLeft: -0.75,
    backgroundColor: branco,
  },
  circuloCentral: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 44,
    height: 44,
    marginTop: -22,
    marginLeft: -22,
    borderWidth: 1.5,
    borderColor: branco,
    borderRadius: 22,
  },
  pontoCentral: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 6,
    height: 6,
    marginTop: -3,
    marginLeft: -3,
    backgroundColor: cores.papel,
    borderRadius: 3,
  },
  // As pequenas areas encostam na borda do campo e ficam abertas para fora.
  gol: {
    position: 'absolute',
    top: '50%',
    width: 9,
    height: 54,
    marginTop: -27,
    borderColor: branco,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
  },
  golEsquerdo: { left: -1, borderRightWidth: 1.5 },
  golDireito: { right: -1, borderLeftWidth: 1.5 },
  jogadores: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  coluna: { gap: 8 },
  nomes: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  nome: { flex: 1 },
  nomeDireita: { textAlign: 'right' },
});
