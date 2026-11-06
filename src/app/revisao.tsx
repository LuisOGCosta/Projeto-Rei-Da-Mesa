import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Botao } from '@/componentes/Botao';
import { Campo } from '@/componentes/Campo';
import { Folha } from '@/componentes/Folha';
import { MotivoDeRevisao } from '@/componentes/Opcao';
import { Pilula } from '@/componentes/Pilula';
import { Texto } from '@/componentes/Texto';
import { motivosDeRevisao } from '@/dados/mock';
import { fonte } from '@/tema/tipografia';
import { cores, toque, veu } from '@/tema/tokens';

/**
 * 19 · Pedir revisão. O pedido não muda o resultado nem trava a fila: só
 * avisa o administrador, que decide dentro do prazo de 2 h.
 */
export default function Revisao() {
  const [motivo, setMotivo] = useState(motivosDeRevisao[0]);
  const [texto, setTexto] = useState('O último ponto foi contra, quem venceu fomos nós.');

  return (
    <Folha onFechar={() => router.back()} rolavel>
      <Pilula variante="revisao">Revisão administrativa</Pilula>

      <View style={estilos.titulos}>
        <Texto variante="titulo" style={estilos.titulo}>
          Pedir revisão ao administrador
        </Texto>
        <Texto variante="corpoMiudo" cor={cores.secundario}>
          n.º 413 · Rafa &amp; Tati venceram · 14:58
        </Texto>
      </View>

      <View style={estilos.motivos}>
        {motivosDeRevisao.map((m) => (
          <MotivoDeRevisao key={m} rotulo={m} marcada={motivo === m} onPress={() => setMotivo(m)} />
        ))}
      </View>

      <Campo
        longo
        value={texto}
        onChangeText={setTexto}
        placeholder="Conte o que aconteceu (opcional)"
      />

      <Texto variante="nota" style={estilos.nota}>
        O pedido não muda o resultado nem trava a fila.
      </Texto>

      <View style={estilos.acoes}>
        <Botao rotulo="Enviar pedido" alto onPress={() => router.back()} />
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
  titulo: { lineHeight: 30 * 1.02 },
  motivos: { borderTopWidth: 1, borderTopColor: veu.borda16 },
  nota: { fontFamily: fonte.corpoRegular, lineHeight: 13 * 1.45 },
  acoes: { gap: 6 },
  cancelar: { minHeight: toque.minimo, alignItems: 'center', justifyContent: 'center' },
  cancelarTexto: { fontSize: 15 },
});
