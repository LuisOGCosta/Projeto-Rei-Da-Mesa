# Futmesa

App do futebol de mesa do escritório: duplas formadas por partida, fila por
ordem de confirmação, chamada com 1 minuto, resultado só com vencedor, revisão
do administrador por até 2 h e ranking mensal com 1 ponto por vitória.

Feito em **React Native + Expo** (SDK 58, Expo Router).

## Estado atual

As **24 telas** do handoff (`../futmesa-handoff/design_handoff_futmesa/`,
pt-BR, alta fidelidade) estão implementadas.

Nesta fase o app é **visual**: não há banco de dados nem login Google. A
navegação roda com estado local de exemplo (`src/dados/`), para que as telas
possam ser revisadas de ponta a ponta. O backend entra depois, sem mexer nas
telas.

O app abre em `/telas`, um índice que leva a cada uma das 24 telas já no
estado certo da mesa. Os temporizadores são reais: a chamada conta 60 s de
verdade e, ao zerar, aplica a regra de expiração.

## Rodar

```bash
npm install
npx expo start        # escolha i / a / w no terminal
```

Não há Xcode nem SDK do Android nesta máquina: para gerar build nativo use a
EAS (`npx eas-cli@latest build`), conforme `AGENTS.md`.

## Organização

| Pasta | O que tem |
| --- | --- |
| `src/app/` | Rotas (Expo Router). Cada arquivo é uma tela; `_layout.tsx` define os navegadores. |
| `src/app/(abas)/` | As quatro abas: Agora, Ranking, Perfil e Admin. |
| `src/componentes/` | Componentes base: botão, cartão, pílula de aviso, avatar, folha (bottom sheet). |
| `src/tema/` | Tokens de design e presets de tipografia — única fonte de cor e tipo. |
| `src/dados/` | Dados e sessão de exemplo, enquanto não há backend. |

As rotas `/telas` (índice das 24 telas) e `/componentes` (mostruário dos
componentes base) existem só para revisão: saem quando o desenho estiver
fechado e o login entrar.

## Onde nos afastamos do handoff

Três pontos, todos deliberados:

- **Fundo dos sobrepostos**: o README do handoff descreve "rgba de #201f1d",
  mas as 24 telas em HTML usam `rgba(0,0,0,.55)`. Seguimos o HTML.
- **Régua da chamada**: o README fala em "régua verde inset 3px"; o HTML usa
  borda de 4px no topo da folha. Seguimos o HTML.
- **Cabeçalho do admin**: com os tamanhos do desenho (kicker 12px + nome
  13px), a linha precisa de 319px num espaço de 308 e não cabe nos 390 do
  aparelho. Baixamos para 11px/12px, dentro da escala do próprio projeto,
  para não cortar "no local".

Além disso, a marca de partida revertida usa o ícone `rotate-ccw` do Lucide
em vez do caractere `↺`: nem a Cormorant Garamond nem a Lora têm esse glifo,
e no aparelho ele cairia numa fonte de sistema.

## Regras de negócio

A fonte de verdade é o `README.md` do handoff. Os pontos que mais afetam o
código:

- A dupla vale só para a próxima partida e se desfaz ao fim dela.
- A posição na fila é o momento da **segunda** confirmação.
- Na chamada, os 4 confirmam em 60 s. No estouro, só a dupla que faltou sai da
  fila; a que confirmou mantém a prioridade.
- O resultado registra apenas o vencedor, sem placar, e jogador não edita.
- A reversão do admin vale até 2 h após o registro original, e o prazo **não**
  reinicia.
- O período do ranking vai do dia 30 ao 29, virando no dia 30 às 00:00 local
  (em fevereiro, no último dia do mês).
