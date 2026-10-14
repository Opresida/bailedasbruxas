/* eslint-disable @next/next/no-img-element -- recortes e logos já vêm em WebP no tamanho certo; sem servidor de imagem */
import { Abertura } from '@/components/abertura';
import { Brasas } from '@/components/brasas';
import { Revela } from '@/components/revela';
import { Tema } from '@/components/tema';
import { ATRACAO, CAMAROTES, EVENTO, INGRESSOS, INGRESSOS_ONDE } from '@/lib/evento';

// Página do evento. Ordem: a marca acesa e a data → a atração (quem é, feitos, maiores hits) → os ingressos →
// o local → quem assina. Segue o manual de marca: escuro primeiro, fogo como única luz, gótica só em título curto.
// Por cima de tudo: a abertura de 4 s (Abertura) e o tema da festa (Tema: teias, morcegos, aranhas). As aranhas
// andam só por cima do que tem `data-aranha` ("titulo" = sobre as letras, "caixa" = pela borda de cima).

const botaoCheio = 'titulo inline-flex items-center justify-center whitespace-nowrap bg-brasa px-7 py-4 text-xl text-noite transition-colors hover:bg-ouro';
const botaoFio = 'titulo inline-flex items-center justify-center whitespace-nowrap border border-brasa px-7 py-4 text-xl text-osso transition-colors hover:bg-brasa hover:text-noite';
const umaCor = { filter: 'brightness(0) invert(1)', opacity: 0.94 } as const;
const emTela = { mixBlendMode: 'screen', filter: 'grayscale(1) brightness(1.5) contrast(1.1)' } as const;

const zap = (numero: string) => `https://wa.me/${numero}?text=${encodeURIComponent(`Olá! Quero reservar um camarote no ${EVENTO.nome} (${EVENTO.dataCompleta}).`)}`;

export default function Pagina() {
  const camarotes = CAMAROTES.confirmado ? CAMAROTES.contatos : [];

  return (
    <>
      <Abertura />
      <Tema />
      {/* ——— a marca acesa ——— */}
      <header className="relative isolate flex min-h-svh flex-col overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="pulsa absolute inset-0" style={{ background: 'radial-gradient(58% 44% at 50% 44%, #4a1606 0%, #1a0d06 44%, rgba(7,4,10,0) 76%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'linear-gradient(180deg, rgba(7,4,10,0), #07040a)' }} />
          <Brasas quantidade={26} semente={3} />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 pt-6 sm:px-10 sm:pt-8">
          {/* quem apresenta: as três marcas juntas */}
          <div className="flex items-center gap-3 sm:gap-5">
            <img src="/img/royals.webp" alt="Royals Entretenimento" width={520} height={176} className="h-7 w-auto sm:h-10" style={umaCor} />
            <span className="h-6 w-px bg-white/25" aria-hidden />
            <img src="/img/100-midia.webp" alt="100 Mídia" width={600} height={282} className="h-6 w-auto sm:h-9" style={umaCor} />
            <span className="h-6 w-px bg-white/25" aria-hidden />
            <img src="/img/baile-do-poderoso.webp" alt="Baile do Poderoso" width={900} height={312} className="h-7 w-auto sm:h-10" style={emTela} />
          </div>
          <p className="rotulo text-right text-brasa">apresentam</p>
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-10">
          <h1 className="w-full">
            <img src="/img/logo.webp" alt={EVENTO.nome} width={1400} height={842} fetchPriority="high" className="acende apos-abertura mx-auto w-full max-w-[820px]" />
          </h1>
          <p className="titulo mt-6 text-[clamp(2.6rem,9vw,5.5rem)] text-osso sm:mt-8">
            {EVENTO.dia} <span className="fogo">{EVENTO.dataCompleta}</span>
          </p>
          <p className="rotulo mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-brasa">
            <span className="olho" aria-hidden />
            {EVENTO.localCompleto}
          </p>
          <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            {INGRESSOS && (
              <a href={INGRESSOS} target="_blank" rel="noopener noreferrer" className={botaoCheio}>Comprar ingresso ↗</a>
            )}
            <a href="#atracao" className={INGRESSOS ? botaoFio : botaoCheio}>Quem é a atração</a>
          </div>
        </div>
      </header>

      <main>
        {/* ——— a atração ——— */}
        <section id="atracao" className="relative isolate scroll-mt-4 overflow-hidden border-t border-fio" aria-labelledby="titulo-atracao">
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(46% 60% at 72% 62%, #4a1606 0%, #1a0d06 46%, #07040a 80%)' }} aria-hidden>
            <Brasas quantidade={14} semente={11} />
          </div>
          <div className="mx-auto grid max-w-6xl items-end gap-6 px-5 pt-14 sm:px-10 sm:pt-20 lg:grid-cols-[1fr_0.9fr]">
            <Revela className="min-w-0 pb-10 lg:pb-20">
              <p className="rotulo inline-block bg-sangue px-3 py-1.5 text-osso">{ATRACAO.rotulo}</p>
              <h2 id="titulo-atracao" data-aranha="titulo" className="titulo varre mt-4 text-[clamp(5rem,20vw,11rem)] leading-[0.82]">
                {ATRACAO.nome}
              </h2>
              <p className="mt-5 max-w-md text-lg text-areia">O rapper carioca sobe ao palco do {EVENTO.nome} na {EVENTO.dataExtenso.split(' de 2026')[0]}.</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {ATRACAO.feitos.map((f, i) => (
                  <li key={f.titulo} data-aranha={i === 1 ? 'caixa' : undefined} className="border border-fio bg-noite/60 p-4">
                    <p className="titulo text-2xl text-ouro">{f.titulo}</p>
                    <p className="mt-1.5 text-sm leading-snug text-areia">{f.texto}</p>
                  </li>
                ))}
              </ul>
            </Revela>
            <Revela atraso={120} className="relative mx-auto w-full max-w-[460px] self-end">
              <div className="pulsa absolute inset-x-[6%] bottom-0 top-[18%]" style={{ background: 'radial-gradient(closest-side, rgba(255,122,20,.5) 0%, rgba(232,39,14,.16) 56%, transparent 78%)' }} aria-hidden />
              {/* a base do corpo some por máscara (uma faixa escura por cima apareceria como caixa contra a luz do fundo) */}
              <div className="relative" style={{ maskImage: 'linear-gradient(180deg, #000 74%, transparent 100%)', WebkitMaskImage: 'linear-gradient(180deg, #000 74%, transparent 100%)' }}>
                <img src={ATRACAO.foto} alt={`${ATRACAO.nome}, foto de divulgação`} width={ATRACAO.largura} height={ATRACAO.altura} loading="lazy" className="block h-auto w-full" style={{ filter: 'contrast(1.06) saturate(.92) drop-shadow(0 0 2px rgba(255,170,60,.9)) drop-shadow(0 0 34px rgba(255,122,20,.45))' }} />
              </div>
            </Revela>
          </div>

          {/* os maiores hits, com as views conferidas no YouTube */}
          <div className="border-t border-fio bg-noite/70">
            <div className="mx-auto max-w-6xl px-5 py-12 sm:px-10 sm:py-16">
              <Revela>
                <p className="rotulo flex items-center gap-3 text-brasa">
                  <span className="olho" aria-hidden />
                  Os maiores hits
                </p>
                <ol className="mt-6 grid gap-x-10 lg:grid-cols-2">
                  {ATRACAO.hits.map((h, i) => (
                    <li key={h.titulo} className="flex items-baseline gap-4 border-t border-fio py-4">
                      <span className="titulo w-8 shrink-0 text-2xl text-cinza-escuro">{String(i + 1).padStart(2, '0')}</span>
                      <span className="min-w-0 flex-1">
                        <span className="titulo block text-3xl text-osso sm:text-4xl">{h.titulo}</span>
                        {h.com && <span className="mt-0.5 block text-sm text-cinza">{h.com}</span>}
                      </span>
                      <span className="titulo shrink-0 text-right text-xl text-ouro sm:text-2xl">{h.views}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm text-cinza-escuro">Views no YouTube, conferidas em {ATRACAO.conferidoEm}.</p>
              </Revela>
            </div>
          </div>
        </section>

        {/* ——— ingressos: este show não tem lista VIP; a entrada é pelo ingresso, vendido fora do site ——— */}
        {INGRESSOS && (
          <section id="ingressos" className="relative isolate scroll-mt-4 overflow-hidden border-t border-fio" aria-labelledby="titulo-ingressos">
            <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(50% 70% at 50% 100%, #3a1206 0%, #07040a 72%)' }} aria-hidden>
              <Brasas quantidade={12} semente={23} />
            </div>
            <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-14 text-center sm:px-10 sm:py-20">
              <Revela className="flex w-full flex-col items-center">
                <p className="rotulo flex items-center gap-3 text-brasa">
                  <span className="olho" aria-hidden />
                  Ingressos
                </p>
                <h2 id="titulo-ingressos" data-aranha="titulo" className="gotica fogo mt-3 text-[clamp(3.4rem,11vw,6.5rem)]">Garanta o seu</h2>
                <p className="mt-5 max-w-md text-lg text-areia">
                  {ATRACAO.nome} no {EVENTO.nome}, {EVENTO.dataExtenso}, no {EVENTO.local}. Venda online pela {INGRESSOS_ONDE}.
                </p>
                <a href={INGRESSOS} target="_blank" rel="noopener noreferrer" className={`${botaoCheio} mt-8 w-full sm:w-auto`}>Comprar ingresso ↗</a>
              </Revela>
            </div>
          </section>
        )}

        {/* ——— o local, e os botões que já tiverem sido confirmados ——— */}
        <section className="relative isolate overflow-hidden border-t border-fio" aria-labelledby="titulo-local">
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(50% 60% at 50% 100%, #2a0e05 0%, #07040a 70%)' }} aria-hidden>
            <Brasas quantidade={10} semente={41} />
          </div>
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-10 sm:py-20">
            <Revela className="flex flex-col items-center">
              <p className="rotulo flex items-center gap-3 text-brasa">
                <span className="olho" aria-hidden />
                O local
              </p>
              <img src="/img/taruma.webp" alt={EVENTO.localCompleto} width={372} height={246} loading="lazy" className="mt-5 h-36 w-auto sm:h-44" style={emTela} />
              <h2 id="titulo-local" className="titulo mt-4 text-4xl text-osso sm:text-5xl">
                {EVENTO.dia} {EVENTO.dataCompleta}
              </h2>
              <p className="mt-2 text-lg text-areia">{EVENTO.localCompleto}</p>
              {(camarotes.length > 0 || INGRESSOS) && (
                <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
                  {INGRESSOS && (
                    <a href={INGRESSOS} target="_blank" rel="noopener noreferrer" className={botaoCheio}>Comprar ingresso ↗</a>
                  )}
                  {camarotes.map((c) => (
                    <a key={c.whatsapp} href={zap(c.whatsapp)} target="_blank" rel="noopener noreferrer" className={botaoFio}>Camarote · {c.rotulo} ↗</a>
                  ))}
                </div>
              )}
            </Revela>
          </div>
        </section>
      </main>

      {/* ——— quem assina a noite: as três marcas que apresentam, o local e a BrandSquad por último ——— */}
      <footer className="border-t border-fio px-5 pb-10 pt-14 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10">
          <div className="flex flex-wrap items-end justify-center gap-x-12 gap-y-8 sm:gap-x-16">
            <figure className="flex flex-col items-center gap-3">
              <figcaption className="rotulo text-cinza-escuro">Apresentam</figcaption>
              <span className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <img src="/img/royals.webp" alt="Royals Entretenimento" width={520} height={176} loading="lazy" className="h-12 w-auto" style={umaCor} />
                <img src="/img/100-midia.webp" alt="100 Mídia" width={600} height={282} loading="lazy" className="h-10 w-auto" style={umaCor} />
                <img src="/img/baile-do-poderoso.webp" alt="Baile do Poderoso" width={900} height={312} loading="lazy" className="h-11 w-auto" style={emTela} />
              </span>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <figcaption className="rotulo text-cinza-escuro">Local</figcaption>
              <img src="/img/taruma.webp" alt={EVENTO.localCompleto} width={372} height={246} loading="lazy" className="h-16 w-auto" style={emTela} />
            </figure>
          </div>

          <p className="rotulo max-w-xl text-center leading-relaxed text-cinza-escuro">
            {EVENTO.nome} · {EVENTO.dia} {EVENTO.dataCompleta} · {EVENTO.local}
          </p>

          <a href="https://www.brandsquad.com.br" target="_blank" rel="noopener" className="flex flex-col items-center gap-3 opacity-80 transition-opacity hover:opacity-100">
            <span className="rotulo text-cinza-escuro">Desenvolvido por</span>
            {/* a logo da BrandSquad como no site dela: caixa "bs" com a luz de status e o nome */}
            <span className="inline-flex items-center gap-2.5 text-osso" aria-label="BrandSquad">
              <span className="relative grid h-8 w-8 shrink-0 place-items-center border-[3px] border-current text-[13px] font-semibold leading-none tracking-tighter">
                bs
                <span className="absolute -right-[6px] -top-[6px] h-2.5 w-2.5 rounded-full bg-[#FF6B1A]" />
              </span>
              <span className="text-lg font-semibold leading-none tracking-[-0.05em]">brandsquad</span>
            </span>
          </a>
        </div>
      </footer>
    </>
  );
}
