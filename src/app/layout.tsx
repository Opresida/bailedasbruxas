import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, Pirata_One } from 'next/font/google';
import { ATRACAO, DATA_ISO, EVENTO, INGRESSOS, SITE_URL } from '@/lib/evento';
import './globals.css';

// Tipografia do manual de marca: Pirata One (títulos curtos), Barlow Condensed (chamadas e números) e Barlow (texto).
const pirata = Pirata_One({ variable: '--font-pirata', subsets: ['latin'], weight: '400' });
const condensada = Barlow_Condensed({ variable: '--font-barlow-condensed', subsets: ['latin'], weight: ['600', '700', '800'] });
const barlow = Barlow({ variable: '--font-barlow', subsets: ['latin'], weight: ['400', '500', '600'] });

const TITULO = `${EVENTO.nome} · ${ATRACAO.nome} · ${EVENTO.dataCompleta} no ${EVENTO.local}`;
const DESCRICAO = `${EVENTO.nome}, ${EVENTO.dataExtenso}, no ${EVENTO.localCompleto}. Atração nacional: ${ATRACAO.nome}. Apresentam: ${EVENTO.apresentamTexto}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITULO, template: `%s · ${EVENTO.nome}` },
  description: DESCRICAO,
  applicationName: EVENTO.nome,
  alternates: { canonical: '/' },
  openGraph: { title: TITULO, description: DESCRICAO, url: '/', siteName: EVENTO.nome, type: 'website', locale: 'pt_BR' },
  twitter: { card: 'summary_large_image', title: TITULO, description: DESCRICAO },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: '#07040A', colorScheme: 'dark' };

// dados estruturados: ajudam o Google a mostrar a festa como evento (data, local, atração)
const EVENTO_LD = {
  '@context': 'https://schema.org',
  '@type': 'MusicEvent',
  name: EVENTO.nome,
  startDate: DATA_ISO,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@type': 'Place', name: EVENTO.localCompleto },
  performer: { '@type': 'MusicGroup', name: ATRACAO.nome },
  organizer: EVENTO.apresentam.map((name) => ({ '@type': 'Organization', name })),
  image: [`${SITE_URL}/opengraph-image.jpg`],
  ...(INGRESSOS ? { offers: { '@type': 'Offer', url: INGRESSOS } } : {}),
  description: DESCRICAO,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${pirata.variable} ${condensada.variable} ${barlow.variable} antialiased`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENTO_LD) }} />
      </body>
    </html>
  );
}
