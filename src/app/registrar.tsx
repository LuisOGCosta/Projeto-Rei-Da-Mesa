import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/componentes/Avatar';
import { Botao } from '@/componentes/Botao';
import { Folha } from '@/componentes/Folha';
import { CartaoDeOpcao } from '@/componentes/Opcao';
import { Pilula } from '@/componentes/Pilula';
import { Texto } from '@/componentes/Texto';
import { fonte } from '@/tema/tipografia';
import { cores, toque } from '@/tema/tokens';

const duplas = [
  { id: 'nos', nome: 'Rafa & Tati', a: 'RA', b: 'TB', aEhEu: true },
  { id: 'eles', nome: 'Cris & Tom', a: 'CP', b: 'TF', aEhEu: false },
];

/**
 * 16 · Registrar vencedor. Só a dupla vencedora, sem placar — e jogador não
 * edita um resultado depois de registrado.
 */
export default function Registrar() {
  const [vencedor, setVencedor] = useState('nos');

  return (
    <Folha onFechar={() => router.back()}>
      <Pilula variante="resultado">Resultado · n.º 413</Pilula>

      <View style={estilos.titulos}>
        <Texto style={estilos.titulo}>Quem venceu?</Texto>
        <Texto variante="corpoMedio">Só a dupla vencedora, sem placar.</Texto>
      </View>

      {duplas.map((d) => (
        <CartaoDeOpcao key={d.id} marcada={vencedor === d.id} onPress={() => setVencedor(d.id)}>
          <View style={estilos.avatares}>
            <Avatar iniciais={d.a} tamanho={36} variante={d.aEhEu ? 'eu' : 'colega'} />
            <Avatar iniciais={d.b} tamanho={36} estilo={estilos.segundoAvatar} />
          </View>
          <Texto style={estilos.nomeDupla}>{d.nome}</Texto>
        </CartaoDeOpcao>
      ))}

      <Texto variante="nota">
        Os outros três são avisados. Quem discordar pede revisão ao administrador, o resultado não
        pode ser alterado por jogadores.
      </Texto>

      <View style={estilos.acoes}>
        <Botao
          rotulo="Registrar vitória"
          alto
          onPress={() => router.replace(vencedor === 'nos' ? '/vitoria' : '/resultado')}
        />
        <Pressable style={estilos.cancelar} onPress={() => router.back()}>
          <Texto variante="valorCampo" cor={cores.corpo} style={estilos.cancelarTexto}>
            Cancelar
          </Texto>
        </Pressable>
      </View>
    </Folha>
  );
}

const estilos = StyleSheet.create({
  titulos: { gap: 5 },
  titulo: { fontFamily: fonte.tituloRegular, fontSize: 34, lineHeight: 34, color: cores.tinta },
  avatares: { flexDirection: 'row' },
  segundoAvatar: { marginLeft: -8 },
  nomeDupla: { fontFamily: fonte.tituloRegular, fontSize: 22, lineHeight: 22, color: cores.tinta },
  acoes: { gap: 6 },
  cancelar: { minHeight: toque.minimo, alignItems: 'center', justifyContent: 'center' },
  cancelarTexto: { fontSize: 15 },
});
