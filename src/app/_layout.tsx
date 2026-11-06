import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_600SemiBold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Lora_400Regular,
  Lora_400Regular_Italic,
  Lora_500Medium,
  Lora_600SemiBold,
} from '@expo-google-fonts/lora';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProvedorDeSessao } from '@/dados/sessao';
import { cores } from '@/tema/tokens';

SplashScreen.preventAutoHideAsync();

export default function Raiz() {
  // As chaves sao os nomes usados em fontFamily (ver src/tema/tipografia.ts).
  const [fontesCarregadas, erroDeFonte] = useFonts({
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_600SemiBold,
    Lora_400Regular,
    Lora_400Regular_Italic,
    Lora_500Medium,
    Lora_600SemiBold,
  });

  useEffect(() => {
    if (fontesCarregadas || erroDeFonte) SplashScreen.hideAsync();
  }, [fontesCarregadas, erroDeFonte]);

  // Sem as fontes carregadas o texto sairia na fonte do sistema e a tela
  // mudaria de cara no meio da leitura.
  if (!fontesCarregadas && !erroDeFonte) return null;

  return (
    <SafeAreaProvider>
      <ProvedorDeSessao>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: cores.papel },
          }}>
          <Stack.Screen name="(abas)" />
          <Stack.Screen name="componentes" />
          {/* Sobrepostos: a tela de baixo continua visivel atras da folha. */}
          <Stack.Screen
            name="folha-exemplo"
            options={{ presentation: 'transparentModal', animation: 'fade' }}
          />
        </Stack>
      </ProvedorDeSessao>
    </SafeAreaProvider>
  );
}
