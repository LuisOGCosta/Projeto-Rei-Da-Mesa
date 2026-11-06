import { Redirect } from 'expo-router';

/**
 * Entrada do app.
 *
 * Nesta fase (revisão visual, sem backend) abre no índice das 24 telas, que
 * é o que se quer conferir. Quando o login Google entrar, isto passa a
 * decidir entre /acesso/login e /agora conforme a sessão.
 */
export default function Inicio() {
  return <Redirect href="/telas" />;
}
