import { Redirect } from 'expo-router';

/**
 * Entrada do app: a tela de login, como no handoff.
 *
 * Quando o login Google entrar, isto passa a decidir entre /acesso/login e
 * /agora conforme a sessão já estar aberta ou não.
 */
export default function Inicio() {
  return <Redirect href="/acesso/login" />;
}
