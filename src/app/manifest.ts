import type { MetadataRoute } from 'next';
import { EVENTO } from '@/lib/evento';

// Para quem salva a página na tela inicial do celular: nome, cor e ícone da festa.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: EVENTO.nome,
    short_name: EVENTO.nome,
    description: `${EVENTO.nome}, ${EVENTO.dataExtenso}, no ${EVENTO.localCompleto}.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#07040A',
    theme_color: '#07040A',
    icons: [
      { src: '/img/icone-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
