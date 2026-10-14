// Dados do evento. Tudo que aparece no site sobre a festa sai daqui.
// Só entra o que o Humberto confirmou. O que ainda não foi confirmado fica vazio e o site se ajusta sozinho
// (sem horário, sem botão de camarote).

export const EVENTO = {
  nome: 'Baile das Bruxas',
  /** Quem apresenta a festa: as três marcas entram SEMPRE juntas (correção da cliente em 13/10/2026). */
  apresentam: ['Royals Entretenimento', '100 Mídia', 'Baile do Poderoso'],
  apresentamTexto: 'Royals, 100 Mídia e Baile do Poderoso',
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

// ——— Ingressos ———
// Este show NÃO tem lista VIP (correção do Humberto em 13/10/2026): a entrada é pelo ingresso.
// Venda pela Igarê desde 14/10/2026 (antes era a OTicket). Link do jeito que ele passou, sem código de rastreio.
/** Venda de ingressos. Vazio = sem link; os botões e a seção de ingressos não aparecem. */
export const INGRESSOS = 'https://app.igare.com.br/e/baile-das-bruxas-2';
/** Nome da plataforma de venda, para o texto da página. */
export const INGRESSOS_ONDE = 'Igarê';

export const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3400');
