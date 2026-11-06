import { router } from 'expo-router';

import { Avatar } from '@/componentes/Avatar';
import { Botao } from '@/componentes/Botao';
import { Folha } from '@/componentes/Folha';
import { Pilula } from '@/componentes/Pilula';
import { Texto } from '@/componentes/Texto';
import { useJogo } from '@/dados/jogo';
import { StyleSheet, View } from 'react-native';

/**
 * 07 · Convite recebido. Folha sobre "Acontecendo agora": ao aceitar, a
 * dupla entra na fila na hora da confirmação.
 */
export default function ConviteRecebido() {
  const { definirEstado } = useJogo();

  function aceitar() {
    definirEstado('fila');
    router.replace('/dupla/na-fila');
  }

  return (
    <Folha onFechar={() => router.back()}>
      <Pilula variante="convite">Convite de dupla</Pilula>

      <View style={estilos.quem}>
        <Avatar iniciais="RA" tamanho={56} />
        <Texto variante="titulo" style={estilos.titulo}>
          Rafa quer jogar com você
        </Texto>
      </View>

      <Texto variante="corpoMedio" style={estilos.texto}>
        A dupla vale só para a próxima partida. Ao aceitar, vocês entram na fila, a posição é
        definida no momento da sua confirmação.
      </Texto>

      <View style={estilos.acoes}>
        <Botao rotulo="Aceitar e entrar na fila" onPress={aceitar} />
        <Botao rotulo="Recusar" variante="secundario" onPress={() => router.back()} />
      </View>
    </Folha>
  );
}

const estilos = StyleSheet.create({
  quem: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  titulo: { flex: 1, lineHeight: 30 * 1.02 },
  texto: { fontSize: 14.5, lineHeight: 14.5 * 1.55 },
  acoes: { gap: 10, marginTop: 4 },
});
