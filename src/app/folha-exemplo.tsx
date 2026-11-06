import { router } from 'expo-router';

import { Botao } from '@/componentes/Botao';
import { Folha } from '@/componentes/Folha';
import { Pilula } from '@/componentes/Pilula';
import { Texto } from '@/componentes/Texto';
import { cores } from '@/tema/tokens';

/** Exemplo da folha usada nos sobrepostos. Acompanha o mostruario. */
export default function FolhaExemplo() {
  return (
    <Folha onFechar={() => router.back()}>
      <Pilula variante="convite">Convite de dupla</Pilula>
      <Texto variante="titulo">Rafa quer jogar com você</Texto>
      <Texto variante="corpoMedio">
        A dupla vale só para a próxima partida. Ao aceitar, vocês entram na fila, a posição é
        definida no momento da sua confirmação.
      </Texto>
      <Botao rotulo="Aceitar e entrar na fila" variante="primario" onPress={() => router.back()} />
      <Botao rotulo="Recusar" variante="secundario" onPress={() => router.back()} />
      <Texto variante="nota" cor={cores.secundario}>
        Toque fora da folha para fechar.
      </Texto>
    </Folha>
  );
}
