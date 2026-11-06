/**
 * Icones do app. Todos vem do Lucide, como pede o handoff.
 *
 * Os imports sao profundos (lucide-react-native/icons/<nome>) para que o
 * Metro carregue so os icones usados, e nao as ~7 mil do pacote.
 *
 * Padrao visual do handoff: traco 1.6 e pontas arredondadas; as marcas de
 * aviso usam 1.8.
 */
import Activity from 'lucide-react-native/icons/activity';
import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import BellRing from 'lucide-react-native/icons/bell-ring';
import Calendar from 'lucide-react-native/icons/calendar';
import Check from 'lucide-react-native/icons/check';
import ChevronLeft from 'lucide-react-native/icons/chevron-left';
import Clock from 'lucide-react-native/icons/clock';
import Crown from 'lucide-react-native/icons/crown';
import Flag from 'lucide-react-native/icons/flag';
import ListChecks from 'lucide-react-native/icons/list-checks';
import LogOut from 'lucide-react-native/icons/log-out';
import RotateCcw from 'lucide-react-native/icons/rotate-ccw';
import Search from 'lucide-react-native/icons/search';
import Send from 'lucide-react-native/icons/send';
import ShieldCheck from 'lucide-react-native/icons/shield-check';
import Trophy from 'lucide-react-native/icons/trophy';
import UserPlus from 'lucide-react-native/icons/user-plus';
import UserRound from 'lucide-react-native/icons/user-round';
import UserX from 'lucide-react-native/icons/user-x';
import X from 'lucide-react-native/icons/x';

export const Icone = {
  /** Marca da aba Agora e do estado "em andamento". */
  agora: Activity,
  /** Marca da aba Ranking e do aviso de resultado. */
  trofeu: Trophy,
  /** Marca da aba Perfil. */
  perfil: UserRound,
  /** Marca da aba Admin e do aviso de revisao. */
  escudo: ShieldCheck,
  /** Aviso de convite de dupla. */
  convite: UserPlus,
  /** Aviso de entrada na fila. */
  fila: ListChecks,
  /** Aviso de chamada. */
  chamada: BellRing,
  /** Tempo decorrido e prazos. */
  relogio: Clock,
  /** Busca de parceiro. */
  busca: Search,
  /** Reversao de resultado pelo administrador. */
  reverter: RotateCcw,
  /** Pedido de revisao sinalizado na lista do admin. */
  bandeira: Flag,
  /** Confirmacao (checkbox, passo concluido). */
  check: Check,
  /** Periodo do ranking. */
  calendario: Calendar,
  /** Sair da conta. */
  sair: LogOut,
  /** Colega sem conta no Futmesa. */
  semConta: UserX,
  /** Enviar o link do app. */
  enviar: Send,
  /** Marca do app na tela de login. */
  marca: Crown,
  voltar: ArrowLeft,
  anterior: ChevronLeft,
  fechar: X,
} as const;

export type NomeIcone = keyof typeof Icone;
