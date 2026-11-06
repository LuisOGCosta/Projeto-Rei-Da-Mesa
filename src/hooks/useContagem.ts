import { useEffect, useRef, useState } from 'react';

/**
 * Contagem regressiva, em segundos.
 *
 * Conta contra um instante de término, não somando "menos um" a cada tique:
 * assim o relógio não atrasa se o aparelho engasgar ou o app ficar um tempo
 * em segundo plano. Usada na chamada para a mesa, que dá 60 s para os quatro
 * confirmarem; ao chegar a zero, aoZerar é chamado uma única vez.
 *
 * Para reiniciar, remonte quem usa o hook com uma `key` diferente.
 */
export function useContagem(segundos: number, aoZerar?: () => void) {
  const [restam, setRestam] = useState(segundos);

  // Guarda o callback numa ref para o intervalo não reiniciar a cada render.
  const zerou = useRef(aoZerar);
  useEffect(() => {
    zerou.current = aoZerar;
  });

  useEffect(() => {
    const termina = Date.now() + segundos * 1000;
    let jaChamou = false;

    // Amostra mais rápida que 1 s para o número virar junto com o relógio.
    const id = setInterval(() => {
      const faltam = Math.max(0, Math.ceil((termina - Date.now()) / 1000));
      setRestam(faltam);

      if (faltam === 0 && !jaChamou) {
        jaChamou = true;
        clearInterval(id);
        zerou.current?.();
      }
    }, 250);

    return () => clearInterval(id);
  }, [segundos]);

  return { restam };
}

/** 45 → "00:45". */
export function formatarRelogio(segundos: number) {
  const seguros = Math.max(0, Math.floor(segundos));
  const m = Math.floor(seguros / 60);
  const s = seguros % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Cronômetro de tempo decorrido, para a partida em andamento. Conta para
 * cima a partir do instante informado.
 */
export function useCronometro(inicio: number) {
  const [agora, setAgora] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const decorrido = Math.max(0, Math.floor((agora - inicio) / 1000));
  return { decorrido, texto: formatarRelogio(decorrido) };
}
