import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Botao } from '@/componentes/Botao';
import { Divisor } from '@/componentes/Divisor';
import { Icone } from '@/componentes/Icone';
import { LogoGoogle } from '@/componentes/LogoGoogle';
import { Tela } from '@/componentes/Tela';
import { Texto } from '@/componentes/Texto';
import { fonte } from '@/tema/tipografia';
import { cores } from '@/tema/tokens';

/** 01 · Login. Acesso so com Google, sem senha. */
export default function Login() {
  const inset = useSafeAreaInsets();
  const Marca = Icone.marca;

  return (
    <Tela estilo={estilos.tela}>
      <View style={[estilos.conteudo, { paddingTop: inset.top + 40 }]}>
        <View style={estilos.marca}>
          <Marca size={24} color={cores.verdeTexto} strokeWidth={1.5} />
          <Texto variante="kicker" style={estilos.nomeDaMarca}>
            Futmesa
          </Texto>
        </View>

        <Texto variante="manchete" style={estilos.manchete}>
          A mesa do escritório, <Texto variante="manchete" style={estilos.italico}>na ordem certa.</Texto>
        </Texto>

        <Divisor verde estilo={estilos.filete} />

        <Texto variante="corpoGrande">
          Entre na fila, seja chamado na hora certa e acompanhe o ranking do mês.
        </Texto>

        <View style={estilos.rodape}>
          <Botao
            rotulo="Continuar com Google"
            icone={<LogoGoogle tamanho={20} />}
            caixaNormal
            alto
            // Sem backend ainda: entra direto no cadastro, como no primeiro acesso.
            onPress={() => router.push('/acesso/cadastro')}
          />
          <Texto variante="nota" style={estilos.termos}>
            Ao continuar, você concorda com os{' '}
            <Texto variante="nota" cor={cores.verdeTexto}>
              Termos de uso
            </Texto>{' '}
            e a{' '}
            <Texto variante="nota" cor={cores.verdeTexto}>
              Política de privacidade
            </Texto>
            .
          </Texto>
        </View>
      </View>
    </Tela>
  );
}

const estilos = StyleSheet.create({
  tela: { backgroundColor: cores.papel },
  conteudo: { flex: 1, paddingHorizontal: 30, paddingBottom: 40 },
  marca: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  // O nome da marca tem entreletra maior que a dos kickers comuns (.22em).
  nomeDaMarca: { fontSize: 12, lineHeight: 12, letterSpacing: 12 * 0.22 },
  manchete: { marginTop: 56 },
  italico: { fontFamily: fonte.tituloItalico },
  filete: { marginVertical: 22 },
  rodape: { marginTop: 'auto', gap: 16 },
  termos: { textAlign: 'center' },
});
