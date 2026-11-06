import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Botao } from '@/componentes/Botao';
import { Campo } from '@/componentes/Campo';
import { Folha } from '@/componentes/Folha';
import { LinhaComparativa } from '@/componentes/LinhaComparativa';
import { Icone } from '@/componentes/Icone';
import { Pilula } from '@/componentes/Pilula';
import { Texto } from '@/componentes/Texto';
import { cores, toque, veu } from '@/tema/tokens';

/**
 * 21 · Reverter resultado.
 *
 * O prazo de 2 h conta do registro original e não reinicia. A justificativa
 * é obrigatória: sem ela, a reversão não pode ser confirmada.
 */
export default function Reverter() {
  const [justificativa, setJustificativa] = useState(
    'Conferi com os quatro: o ponto final foi contra. Vitória de Cris & Tom.'
  );
  const Reverter = Icone.reverter;

  return (
    <Folha onFechar={() => router.back()} rolavel>
      <Pilula variante="revisao">Ação do administrador</Pilula>

      <Texto variante="titulo" style={estilos.titulo}>
        Reverter o resultado da n.º 413?
      </Texto>

      <View style={estilos.comparacao}>
        <LinhaComparativa rotulo="Registrado" valor="Rafa & Tati venceram" riscado />
        <LinhaComparativa rotulo="Passa a valer" valor="Cris & Tom venceram" forte />
      </View>

      <Campo
        rotulo="Justificativa (obrigatória)"
        longo
        value={justificativa}
        onChangeText={setJustificativa}
        placeholder="Explique a correção"
        estilo={estilos.campo}
      />

      <Texto variante="nota" cor={cores.corpo} style={estilos.aviso}>
        Prazo contado do registro original (14:58): restam 1 h 47 min e ele não reinicia. O ranking
        de novembro é atualizado, os quatro jogadores são avisados e a alteração fica no histórico.
      </Texto>

      <View style={estilos.acoes}>
        <Botao
          rotulo="Confirmar reversão"
          variante="escuro"
          alto
          disabled={justificativa.trim().length === 0}
          icone={<Reverter size={16} color={cores.tinta} strokeWidth={1.8} />}
          onPress={() => router.replace('/correcao')}
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
  titulo: { lineHeight: 30 * 1.02 },
  comparacao: { borderTopWidth: 1, borderTopColor: veu.borda16 },
  // A justificativa do admin tem borda preta, nao verde: e acao de correcao.
  campo: { gap: 7 },
  aviso: { lineHeight: 13 * 1.5 },
  acoes: { gap: 6 },
  cancelar: { minHeight: toque.minimo, alignItems: 'center', justifyContent: 'center' },
  cancelarTexto: { fontSize: 15 },
});
