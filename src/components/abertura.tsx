'use client';

/* eslint-disable @next/next/no-img-element -- a abóbora já vem em WebP no tamanho certo */
import { useEffect, useRef, useState } from 'react';
import { EVENTO } from '@/lib/evento';
import { pernas } from '@/lib/tema-desenhos';

// Abertura de 4 segundos, toda vez que a página inicial abre (escolha do Humberto).
// O "carregando" é uma teia que gira enquanto uma aranha a tece do centro para a borda; no meio, a abóbora da marca
// acende aos poucos. Aos 4 s o fogo abre a tela do centro para fora e a página aparece.
// O que já roda antes de o JavaScript chegar (giro da teia, brasas) é CSS; o que depende do tempo sai do contador.
// Seguranças: sem JavaScript, <noscript> esconde a abertura; se o código falhar, o CSS a tira sozinho (globals.css).
// Com "reduzir movimento" ligado, dura meio segundo.

const DURACAO = 4000;
const SAIDA = 900;
const RAIOS = 10;
const VOLTAS = 5;
const R0 = 74, R1 = 186; // a espiral vai deste raio (em volta da abóbora) até este (a borda da teia)

// os pontos da espiral: um por raio, a cada volta um pouco mais longe do centro
const PONTOS = Array.from({ length: RAIOS * VOLTAS + 1 }, (_, k) => {
  const ang = (k / RAIOS) * Math.PI * 2 - Math.PI / 2;
  const r = R0 + ((R1 - R0) * k) / (RAIOS * VOLTAS);
  return [Math.cos(ang) * r, Math.sin(ang) * r] as const;
});
// o fio entre dois raios cede para o centro, como em teia de verdade
const ESPIRAL = PONTOS.reduce((d, [x, y], k) => {
  if (k === 0) return `M${x.toFixed(1)},${y.toFixed(1)}`;
  const [ax, ay] = PONTOS[k - 1];
  return `${d} Q${(((ax + x) / 2) * 0.9).toFixed(1)},${(((ay + y) / 2) * 0.9).toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
}, '');
const RAIOS_D = Array.from({ length: RAIOS }, (_, i) => {
  const ang = (i / RAIOS) * Math.PI * 2 - Math.PI / 2;
  return `M${(Math.cos(ang) * 34).toFixed(1)},${(Math.sin(ang) * 34).toFixed(1)} L${(Math.cos(ang) * 198).toFixed(1)},${(Math.sin(ang) * 198).toFixed(1)}`;
}).join(' ');

const preso = (v: number) => Math.max(0, Math.min(1, v));
const macio = (v: number) => v * v * (3 - 2 * v);

// só a primeira montagem depois de a página carregar desconta o tempo que o JavaScript levou para chegar
let primeiraVez = true;

export function Abertura() {
  // começa visível: é o que o HTML do servidor mostra, antes de o JavaScript chegar
  const [p, setP] = useState(0); // 0 a 1 ao longo dos 4 s
  const [saida, setSaida] = useState(-1); // −1 = ainda tocando; 0 a 1 = o fogo abrindo a tela
  const [fora, setFora] = useState(false);
  const comeco = useRef<number | null>(null); // guardado aqui para valer uma vez só, mesmo se o efeito rodar duas vezes

  useEffect(() => {
    const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = calmo ? 500 : DURACAO;
    if (comeco.current === null) {
      const agora0 = performance.now();
      // a abertura já estava na tela desde que o HTML chegou: conta desse instante (até 1,5 s de crédito)
      comeco.current = agora0 - (primeiraVez ? Math.min(agora0, 1500) : 0);
      primeiraVez = false;
    }
    const inicio = comeco.current;
    document.documentElement.style.overflow = 'hidden';
    let raf = 0;
    const passo = (agora: number) => {
      const e = agora - inicio;
      if (e < total) {
        setP(e / total);
        raf = requestAnimationFrame(passo);
      } else if (e < total + SAIDA) {
        setP(1);
        setSaida((e - total) / SAIDA);
        document.documentElement.style.overflow = '';
        raf = requestAnimationFrame(passo);
      } else {
        document.documentElement.style.overflow = '';
        setFora(true);
      }
    };
    raf = requestAnimationFrame(passo);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (fora) return null;

  const pct = Math.round(p * 100);
  const raios = macio(preso(p / 0.16)); // os raios esticam primeiro
  const tece = macio(preso((p - 0.1) / 0.8)); // depois a aranha tece a espiral
  const brilho = macio(preso((p - 0.08) / 0.84)); // e a abóbora vai acendendo
  // onde a aranha está: na ponta do fio que ela acabou de tecer
  const k = tece * (PONTOS.length - 1), i = Math.min(PONTOS.length - 2, Math.floor(k)), u = k - i;
  const [ax, ay] = PONTOS[i], [bx, by] = PONTOS[i + 1];
  const sx = ax + (bx - ax) * u, sy = ay + (by - ay) * u;
  const rumo = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
  const { femur, tibia } = pernas(k * 2.4, 13);

  const abrindo = saida >= 0;
  const raio = abrindo ? macio(saida) * 82 : 0; // em vmax
  const centro = '50% 46%';
  const furo = abrindo ? `radial-gradient(circle at ${centro}, transparent ${raio.toFixed(1)}vmax, #000 ${(raio + 9).toFixed(1)}vmax)` : undefined;

  return (
    <div className="abertura" style={{ pointerEvents: abrindo ? 'none' : undefined }} role="status" aria-live="polite" aria-label={`Abrindo a página, ${pct}%`}>
      <noscript>
        <style>{'.abertura{display:none}'}</style>
      </noscript>
      {/* o pano escuro: quando o fogo abre, ganha um furo que cresce do centro */}
      <div className="abertura-pano" style={{ maskImage: furo, WebkitMaskImage: furo }}>
        <div className="abertura-luz" style={{ opacity: 0.35 + 0.65 * brilho }} />
        <div className="brasas" aria-hidden>
          {Array.from({ length: 14 }, (_, n) => (
            <i key={n} style={{ left: `${(8 + ((n * 37) % 84)).toFixed(0)}%`, width: 3 + (n % 4), height: 3 + (n % 4), animationDuration: `${6 + (n % 5) * 1.3}s`, animationDelay: `${-(n * 1.7)}s`, ['--o' as string]: 0.4 + (n % 3) * 0.2, ['--dx' as string]: `${((n % 5) - 2) * 26}px` }} />
          ))}
        </div>

        <div className="abertura-centro">
          <div className="abertura-roda">
            <svg viewBox="-210 -210 420 420" className="abertura-teia" aria-hidden>
              <g className="abertura-gira">
                <path className="abertura-fio" d={RAIOS_D} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - raios} />
                <path className="abertura-fio" d={ESPIRAL} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - tece} />
                {/* a aranha, na ponta do fio */}
                <g transform={`translate(${sx.toFixed(1)} ${sy.toFixed(1)}) rotate(${rumo.toFixed(1)}) scale(0.4)`} style={{ opacity: preso(p / 0.08) }}>
                  <g fill="none" stroke="rgba(255,122,20,.7)" strokeLinecap="round">
                    <path d={femur} strokeWidth="6.4" />
                    <path d={tibia} strokeWidth="4.8" />
                  </g>
                  <g fill="none" stroke="#0E0605" strokeLinecap="round">
                    <path d={femur} strokeWidth="4.6" />
                    <path d={tibia} strokeWidth="3" />
                  </g>
                  <g fill="#0E0605" stroke="rgba(255,122,20,.8)" strokeWidth="1.5">
                    <ellipse cx="-21" cy="0" rx="21" ry="16.5" />
                    <ellipse cx="7" cy="0" rx="13" ry="10.5" />
                  </g>
                  <path d="M-28,0 L-21,-5.5 L-14,0 L-21,5.5 Z" fill="#FF7A14" />
                </g>
              </g>
            </svg>
            <img
              src="/img/abobora.webp"
              alt=""
              width={560}
              height={560}
              fetchPriority="high"
              className="abertura-abobora"
              style={{ filter: `brightness(${(0.12 + 0.88 * brilho).toFixed(3)}) saturate(${(0.5 + 0.5 * brilho).toFixed(2)}) drop-shadow(0 0 ${(10 + 46 * brilho).toFixed(0)}px rgba(255,122,20,${(0.75 * brilho).toFixed(2)}))`, transform: `scale(${(0.94 + 0.06 * brilho).toFixed(3)})` }}
            />
          </div>
          <p className="rotulo abertura-quem">
            {EVENTO.apresentamTexto} <span className="text-brasa">apresentam</span>
          </p>
          <p className="titulo abertura-conta" aria-hidden>
            <span className="fogo">{String(pct).padStart(3, '0')}</span>
            <span className="text-cinza-escuro">%</span>
          </p>
        </div>
      </div>
      {/* a borda do furo: um anel de fogo que cresce junto */}
      {abrindo && (
        <div
          className="abertura-fogo"
          style={{
            background: `radial-gradient(circle at ${centro}, rgba(255,243,207,0) ${Math.max(0, raio - 5).toFixed(1)}vmax, rgba(255,194,30,.95) ${(raio + 2).toFixed(1)}vmax, rgba(255,122,20,.6) ${(raio + 7).toFixed(1)}vmax, rgba(232,39,14,0) ${(raio + 15).toFixed(1)}vmax)`,
            opacity: 1 - saida * saida,
          }}
        />
      )}
    </div>
  );
}
