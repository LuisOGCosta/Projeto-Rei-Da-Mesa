import Svg, { Path } from 'react-native-svg';

import { cores } from '@/tema/tokens';

/**
 * "G" do Google nas quatro cores oficiais da marca. Vai no botao de acesso.
 * As cores vem de tokens.cores.google e nao devem ser alteradas: sao parte
 * das regras de uso da marca.
 */
export function LogoGoogle({ tamanho = 20 }: { tamanho?: number }) {
  const { azul, verde, amarelo, vermelho } = cores.google;

  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24">
      <Path
        fill={azul}
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.8z"
      />
      <Path
        fill={verde}
        d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z"
      />
      <Path fill={amarelo} d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.28a12 12 0 0 0 0 10.8z" />
      <Path
        fill={vermelho}
        d="M12 4.75c1.76 0 3.34.6 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 1.28 6.6l4.01 3.1C6.23 6.86 8.88 4.75 12 4.75z"
      />
    </Svg>
  );
}
