import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/componentes/Avatar';
import { BarraDeProgresso } from '@/componentes/BarraDeProgresso';
import { Botao } from '@/componentes/Botao';
import { Folha } from '@/componentes/Folha';
import { Icone } from '@/componentes/Icone';
import { Pilula } from '@/componentes/Pilula';
import { Texto } from '@/componentes/Texto';
import { chamadaAguardando, chamadaInicial, Convocado } from '@/dados/mock';
import { useJogo } from '@/dados/jogo';
import { formatarRelogio, useContagem } from '@/hooks/useContagem';
import { fonte } from '@/tema/tipografia';
import { cores, raio, veu } from '@/tema/tokens';

const PRAZO = 60;

type Fase =
  /** 12 · os quatro ainda têm de confirmar. */
  | 'chamando'
  /** 13 · você confirmou, falta alguém. */
  | 'confirmado'
  /** 14 · o prazo estourou e saiu uma nova chamada. */
  | 'expirada';

/**
 * 12, 13 e 14 · Chamada para a mesa.
 *
 * A contagem é real: 60 s, de um em um segundo. Ao chegar a zero vale a
 * regra do handoff — a chamada é cancelada, só a dupla que não confirmou sai
 * da fila, e quem confirmou mantém a prioridade na chamada seguinte.
 */
export default function Chamada() {
  const { definirEstado } = useJogo();
  const [fase, setFase] = useState<Fase>('chamando');
  // Reiniciar a contagem na nova chamada: a chave muda, o hook recomeça.
  const [rodada, setRodada] = useState(0);

  const { restam } = useContagem(PRAZO, aoEstourarOPrazo);
  const Check = Icone.check;

  function aoEstourarOPrazo() {
    // Quem confirmou segue com prioridade; a dupla que faltou sai da fila.
    setFase('expirada');
    setRodada((r) => r + 1);
  }

  function confirmar() {
    if (fase === 'expirada') {
      definirEstado('jogando');
      router.replace('/agora');
      return;
    }
    setFase('confirmado');
  }

  if (fase === 'expirada') {
    return <ChamadaExpirada key={rodada} onConfirmar={confirmar} />;
  }

  const confirmados = fase === 'confirmado' ? chamadaAguardando : chamadaInicial;
  const quantos = confirmados.filter((c) => c.confirmou).length;

  return (
    <Folha reguaVerde fechaAoToqueFora={false}>
      <Pilula variante="chamada">Chamada para a mesa</Pilula>

      <Texto style={estilos.titulo}>
        {fase === 'confirmado' ? 'Presença confirmada' : 'Sua vez de jogar'}
      </Texto>

      <View style={estilos.contagem}>
        <Texto style={estilos.rotuloContagem}>
          {fase === 'confirmado' ? 'Aguardando Vivi\nconfirmar em até' : 'Confirme em até'}
        </Texto>
        <Texto tabular cor={cores.verdeTexto} style={estilos.relogio}>
          {formatarRelogio(restam)}
        </Texto>
      </View>

      <BarraDeProgresso fracao={restam / PRAZO} />

      <View style={estilos.grade}>
        {confirmados.map((c) => (
          <LinhaDeConvocado key={c.iniciais} convocado={c} />
        ))}
      </View>

      {fase === 'confirmado' ? (
        <View style={estilos.contador}>
          <Check size={18} color={cores.verdeTexto} strokeWidth={1.8} />
          <Texto variante="valorCampo" cor={cores.corpo} style={estilos.contadorTexto}>
            {quantos} de 4 confirmados
          </Texto>
        </View>
      ) : (
        <>
          <Texto variante="nota">
            Rafa &amp; Tati × Gu &amp; Vivi. Sem as quatro confirmações no prazo, a chamada é
            cancelada e a dupla que não confirmou sai da fila.
          </Texto>
          <Botao rotulo="Confirmar presença" alto onPress={confirmar} />
        </>
      )}
    </Folha>
  );
}

/** 14 · depois do prazo: nova chamada, com a dupla seguinte da fila. */
function ChamadaExpirada({ onConfirmar }: { onConfirmar: () => void }) {
  const { restam } = useContagem(PRAZO);

  return (
    <Folha reguaVerde fechaAoToqueFora={false}>
      <Pilula variante="chamada">Nova chamada</Pilula>

      <Texto style={estilos.tituloExpirada}>Vivi não confirmou a tempo</Texto>

      <Texto variante="corpoMedio" style={estilos.explicacao}>
        A chamada anterior foi cancelada e Gu &amp; Vivi saíram da fila. Vocês confirmaram, então{' '}
        <Texto cor={cores.tinta} style={estilos.forte}>
          continuam com prioridade
        </Texto>
        . A próxima dupla elegível, Léo &amp; Mel, foi chamada.
      </Texto>

      <View style={estilos.confronto}>
        <Texto variante="tituloCartao">
          Rafa &amp; Tati <Texto variante="tituloCartao" cor={cores.secundario}>×</Texto> Léo &amp; Mel
        </Texto>
      </View>

      <View style={estilos.contagem}>
        <Texto style={estilos.rotuloContagem}>{'Confirme de novo\nem até'}</Texto>
        <Texto tabular cor={cores.verdeTexto} style={estilos.relogioMenor}>
          {formatarRelogio(restam)}
        </Texto>
      </View>

      <Botao rotulo="Confirmar presença" alto onPress={onConfirmar} />
    </Folha>
  );
}

function LinhaDeConvocado({ convocado }: { convocado: Convocado }) {
  return (
    <View style={estilos.convocado}>
      <Avatar
        iniciais={convocado.iniciais}
        tamanho={30}
        variante={convocado.confirmou ? 'eu' : 'colega'}
      />
      <View style={estilos.convocadoTexto}>
        <Texto style={estilos.convocadoNome}>
          {convocado.souEu ? `${convocado.nome} (você)` : convocado.nome}
        </Texto>
        <Texto
          cor={convocado.confirmou ? cores.verdeTexto : cores.secundario}
          style={estilos.convocadoStatus}>
          {convocado.confirmou ? 'confirmou' : 'aguardando'}
        </Texto>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  titulo: { fontFamily: fonte.tituloRegular, fontSize: 34, lineHeight: 34, color: cores.tinta },
  tituloExpirada: {
    fontFamily: fonte.tituloRegular,
    fontSize: 32,
    lineHeight: 32 * 1.02,
    color: cores.tinta,
  },
  explicacao: { fontSize: 14.5, lineHeight: 14.5 * 1.55 },
  forte: { fontFamily: fonte.corpoSemi, fontSize: 14.5, lineHeight: 14.5 * 1.55 },

  contagem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  rotuloContagem: {
    fontFamily: fonte.corpoRegular,
    fontSize: 15,
    lineHeight: 15 * 1.35,
    color: cores.corpo,
  },
  relogio: { fontFamily: fonte.tituloRegular, fontSize: 64, lineHeight: 64 * 0.85 },
  relogioMenor: { fontFamily: fonte.tituloRegular, fontSize: 56, lineHeight: 56 * 0.85 },

  // Duas colunas, como no desenho: a lista dos quatro em grade.
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    borderTopWidth: 1,
    borderTopColor: veu.borda16,
  },
  convocado: {
    width: '46%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    minHeight: 46,
    borderBottomWidth: 1,
    borderBottomColor: veu.borda16,
  },
  convocadoTexto: { gap: 1, flex: 1 },
  convocadoNome: { fontFamily: fonte.corpoRegular, fontSize: 14, lineHeight: 14 * 1.1, color: cores.tinta },
  convocadoStatus: { fontFamily: fonte.corpoRegular, fontSize: 12, lineHeight: 12 * 1.1 },

  contador: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: veu.borda20,
    borderRadius: raio.campo,
  },
  contadorTexto: { fontSize: 15 },

  confronto: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: veu.borda16,
  },
});
