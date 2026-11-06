import { Redirect } from 'expo-router';

/** A raiz do app abre em "Acontecendo agora". */
export default function Inicio() {
  return <Redirect href="/agora" />;
}
