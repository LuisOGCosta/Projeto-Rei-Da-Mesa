import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '@/componentes/Avatar';
import { BarraDeVolta } from '@/componentes/BarraDeVolta';
import { Botao } from '@/componentes/Botao';
import { Campo } from '@/componentes/Campo';
import { Icone } from '@/componentes/Icone';
import { LogoGoogle } from '@/componentes/LogoGoogle';
import { Tela } from '@/componentes/Tela';
import { Texto } from '@/componentes/Texto';
import { EU } from '@/dados/pessoas';
import { cores, raio, toque, veu } from '@/tema/tokens';

/** 02 · Completar cadastro. Primeiro acesso, depois do Google. */
export default function Cadastro() {
  const [nome, setNome] = useState(EU.nome);
  const [apelido, setApelido] = useState(EU.apelido);
  const [aceitou, setAceitou] = useState(true);
  const Check = Icone.check;

  const podeConcluir = nome.trim().length > 0 && apelido.trim().length > 0 && aceitou;

  return (
    <Tela>
      <BarraDeVolta de="Entrar" />
      <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>
      <View style={estilos.titulos}>
        <Texto variante="kicker">Primeiro acesso · último passo</Texto>
        <Texto variante="tituloGrande">Confirme seus dados</Texto>
      </View>

      <View style={estilos.conta}>
        <LogoGoogle tamanho={20} />
        <View style={estilos.contaTexto}>
          <Texto variante="valorCampo" style={estilos.email}>
            {EU.email}
          </Texto>
          <Texto variante="meta">Conta Google vinculada · sem senha</Texto>
        </View>
      </View>

      <View style={estilos.foto}>
        <Avatar iniciais={EU.iniciais} tamanho={72} variante="eu" />
        <View style={estilos.fotoTexto}>
          <Texto variante="corpoMedio">
            Foto da sua conta Google. Aparece na fila e no ranking.
          </Texto>
          <Pressable style={estilos.trocarFoto}>
            <Texto variante="rotuloGoogle" cor={cores.verdeTexto} style={estilos.sublinhado}>
              Trocar foto
            </Texto>
          </Pressable>
        </View>
      </View>

      <Campo rotulo="Nome" value={nome} onChangeText={setNome} />

      <Campo
        rotulo="Apelido na mesa"
        value={apelido}
        onChangeText={setApelido}
        destacado
        ajuda="É como os colegas veem você na fila."
      />

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: aceitou }}
        onPress={() => setAceitou((v) => !v)}
        style={estilos.termos}>
        <View style={[estilos.caixaDeMarca, !aceitou && estilos.caixaVazia]}>
          {aceitou ? <Check size={16} color={cores.verdeTexto} strokeWidth={2.2} /> : null}
        </View>
        <Texto variante="corpoMedio" style={estilos.termosTexto}>
          Li e aceito os{' '}
          <Texto variante="corpoMedio" cor={cores.verdeTexto}>
            Termos de uso
          </Texto>{' '}
          e a{' '}
          <Texto variante="corpoMedio" cor={cores.verdeTexto}>
            Política de privacidade
          </Texto>
          .
        </Texto>
      </Pressable>

      <Botao
        rotulo="Concluir cadastro"
        disabled={!podeConcluir}
        estilo={estilos.concluir}
        onPress={() => router.replace('/agora')}
      />
      </ScrollView>
    </Tela>
  );
}

const estilos = StyleSheet.create({
  conteudo: { paddingHorizontal: 26, paddingTop: 8, paddingBottom: 34, gap: 18 },
  titulos: { gap: 8 },
  conta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: veu.borda16,
  },
  contaTexto: { gap: 2, flex: 1 },
  email: { fontSize: 15, lineHeight: 15 * 1.2 },
  foto: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  fotoTexto: { flex: 1, gap: 6 },
  trocarFoto: { minHeight: toque.minimo, justifyContent: 'center' },
  sublinhado: { textDecorationLine: 'underline' },
  termos: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', minHeight: toque.minimo },
  caixaDeMarca: {
    width: 22,
    height: 22,
    flexShrink: 0,
    marginTop: 1,
    borderWidth: 1.5,
    borderColor: cores.verdeBorda,
    borderRadius: raio.pequeno,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaVazia: { borderColor: cores.neutro500 },
  termosTexto: { flex: 1 },
  concluir: { marginTop: 8 },
});
