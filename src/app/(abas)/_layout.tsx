import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';

import { BarraAbas, BotaoAba } from '@/componentes/BarraAbas';
import { useSessao } from '@/dados/sessao';

/**
 * Abas do app. A barra e inteiramente nossa (preta, com a aba ativa em
 * verde), por isso usamos o Tabs sem interface propria do expo-router em vez
 * da barra nativa do sistema.
 *
 * A aba Admin so existe para quem e administrador: nao renderizar o
 * TabTrigger remove a aba e o estado de navegacao dela.
 */
export default function AbasLayout() {
  const { admin } = useSessao();

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <BarraAbas>
          <TabTrigger name="agora" href="/agora" asChild>
            <BotaoAba rotulo="Agora" icone="agora" />
          </TabTrigger>
          <TabTrigger name="ranking" href="/ranking" asChild>
            <BotaoAba rotulo="Ranking" icone="trofeu" />
          </TabTrigger>
          <TabTrigger name="perfil" href="/perfil" asChild>
            <BotaoAba rotulo="Perfil" icone="perfil" />
          </TabTrigger>
          {admin ? (
            <TabTrigger name="admin" href="/admin" asChild>
              <BotaoAba rotulo="Admin" icone="escudo" />
            </TabTrigger>
          ) : null}
        </BarraAbas>
      </TabList>
    </Tabs>
  );
}
