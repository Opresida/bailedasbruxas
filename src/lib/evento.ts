// Dados do evento. Tudo que aparece no site sobre a festa sai daqui.
// Só entra o que o Humberto confirmou. O que ainda não foi confirmado fica vazio e o site se ajusta sozinho
// (lista "em breve", sem horário, sem botão de camarote).

export const EVENTO = {
  nome: 'Baile das Bruxas',
  realizacao: 'Royals Entretenimento',
  local: 'Tarumã',
  localCompleto: 'Tarumã · Casa de Festas & Convenções',
  dia: 'SEXTA',
  data: '13.11',
  dataCompleta: '13.11.2026',
  dataExtenso: 'sexta-feira, 13 de novembro de 2026',
  /** Horário de abertura. Vazio = ainda não confirmado; nada sobre horário aparece no site. */
  horario: '',
  /** Cidade. Vazia = ainda não confirmada. */
  cidade: '',
};

/** Início da festa para os robôs de busca (dados estruturados). Sem horário confirmado, vale só o dia. */
export const DATA_ISO = '2026-11-13';

// ——— Lista VIP ———
// O formulário, a portaria e o painel estão prontos, mas a lista só abre quando o Humberto disser
// (1) o que a lista dá, (2) até quando aceita nomes e (3) o horário-limite de entrada, se houver.
// Para abrir: preencher os campos abaixo e mudar `liberada` para true.
export const LISTA: {
  liberada: boolean;
  /** Uma frase, do jeito que a produção confirmou. Ex.: "Entrada gratuita até as 23h para quem está na lista." */
  beneficio: string;
  /** Até quando o formulário aceita nomes. Vazio = fica aberto até ser fechado à mão (`liberada: false`). */
  fecha: Date | null;
  /** Texto do prazo, para a página. Ex.: "até sexta, 23h". */
  prazo: string;
  /** Horário-limite de entrada pela lista, para o painel separar quem chegou antes e depois. */
  limiteEntrada: Date | null;
  /** O mesmo horário em texto. Ex.: "23h". */
  limite: string;
} = {
  liberada: false,
  beneficio: '',
  fecha: null,
  prazo: '',
  limiteEntrada: null,
  limite: '',
};

export type EstadoDaLista = 'em-breve' | 'aberta' | 'encerrada';

/** LISTA_TESTE=1 abre a lista só no computador, para testar o formulário e a portaria antes de liberar de verdade. */
const emTeste = () => process.env.NODE_ENV !== 'production' && process.env.LISTA_TESTE === '1';

export function estadoDaLista(agora: number = Date.now()): EstadoDaLista {
  if (LISTA.fecha && agora >= LISTA.fecha.getTime()) return 'encerrada';
  return LISTA.liberada || emTeste() ? 'aberta' : 'em-breve';
}

export const ROTULO_DA_LISTA: Record<EstadoDaLista, string> = { 'em-breve': 'LISTA AINDA NÃO ABRIU', aberta: 'LISTA ABERTA', encerrada: 'LISTA ENCERRADA' };

// ——— Atração ———
// Números conferidos na fonte em 13.10.2026 (views no YouTube, arredondadas para baixo) e fatos com fonte pública.
// Reconferir antes de mexer: número errado em peça de divulgação é pior do que número nenhum.
export const ATRACAO = {
  rotulo: 'ATRAÇÃO NACIONAL',
  nome: 'Chefin',
  instagram: 'https://www.instagram.com/chefin23/',
  foto: '/img/chefin.webp',
  largura: 919,
  altura: 1300,
  conferidoEm: 'outubro de 2026',
  hits: [
    { titulo: 'Invejoso', com: 'com Oruam, Jhowzin e Raffé', views: '+210 milhões' },
    { titulo: '10 Carros', com: '', views: '+130 milhões' },
    { titulo: '212', com: '', views: '+110 milhões' },
    { titulo: 'Tropa do Mais Novo', com: 'com Vulgo FK', views: '+99 milhões' },
  ],
  feitos: [
    { titulo: '4º lugar', texto: '"212" na Billboard Brasil, em 2022.' },
    { titulo: 'Ed Sheeran', texto: 'Parceria no remix de "2step", em 2022.' },
    { titulo: 'MTV MIAW 2022', texto: 'Vencedor na categoria Trap na Cena.' },
  ],
};

// ——— Camarotes ———
// Os telefones abaixo estão na arte de divulgação que a cliente mandou ("Mais informações e reservas de camarotes").
// O botão só aparece com `confirmado: true`: falta o Humberto confirmar que são esses os números para o site.
export const CAMAROTES = {
  confirmado: false,
  contatos: [
    { rotulo: '(91) 99354-2490', whatsapp: '5591993542490' },
    { rotulo: '(92) 98142-8159', whatsapp: '5592981428159' },
  ],
};

/** Venda de ingressos. Vazio = ainda sem link; o botão não aparece. */
export const INGRESSOS = '';

export const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3400');
