'use client';

import { useEffect, useRef } from 'react';
import { ARANHA_SVG, ASA, CORPO_MORCEGO, TEIA_1, TEIA_2, posar } from '@/lib/tema-desenhos';

// O tema da festa por cima da página, o mesmo do manual de marca: teias em dois cantos, morcegos que atravessam a
// tela de tempos em tempos, uma aranha que desce num fio pela lateral e aranhas que andam por cima de ALGUNS títulos
// e caixas (os marcados com data-aranha="titulo" ou data-aranha="caixa"), nunca de todos.
// A camada fica presa à janela e não recebe clique: botão e formulário continuam funcionando por baixo.
// No celular: teias menores, sem a aranha no fio. Com "reduzir movimento": só as teias, paradas.

const MORCEGOS = [
  { y: '16%', t: '62px', d: '23s', a: '2s', volta: false },
  { y: '38%', t: '44px', d: '29s', a: '11s', volta: true },
  { y: '64%', t: '52px', d: '34s', a: '19s', volta: false },
];

const suave = (u: number) => {
  const v = Math.max(0, Math.min(1, u));
  return 0.35 * v + 0.65 * v * v * (3 - 2 * v);
};

export function Tema() {
  const palco = useRef<HTMLDivElement>(null);
  const fio = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cena = palco.current;
    if (!cena || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let vivo = true;
    const quadros = new Set<number>();
    const pede = (fn: (agora: number) => void) => {
      const id = requestAnimationFrame((agora) => {
        quadros.delete(id);
        if (vivo) fn(agora);
      });
      quadros.add(id);
    };
    const criaAranha = (tam: number) => {
      const el = document.createElement('div');
      el.className = 'aranha-anda';
      el.style.width = el.style.height = `${tam}px`;
      el.innerHTML = ARANHA_SVG;
      return el;
    };

    // a aranha pendurada no fio, de cabeça para baixo, mexendo as pernas devagar (só em tela larga)
    let pendurada: HTMLDivElement | null = null;
    if (fio.current && window.matchMedia('(min-width: 701px)').matches) {
      pendurada = criaAranha(58);
      (pendurada.firstChild as HTMLElement).style.transform = 'rotate(90deg)';
      fio.current.appendChild(pendurada);
      const t0 = performance.now();
      const mexe = (agora: number) => {
        if (pendurada) posar(pendurada, (agora - t0) / 260, 5);
        pede(mexe);
      };
      pede(mexe);
    }

    // aranhas que andam: nascem nesta camada (não dentro do título), e a cada quadro medem onde o alvo está na janela,
    // então acompanham a rolagem
    const emCena = new Map<Element, HTMLDivElement>();
    const anda = (alvo: Element) => {
      if (emCena.has(alvo) || emCena.size >= 2) return;
      const caixa0 = alvo.getBoundingClientRect();
      if (caixa0.width < 120) return;
      const titulo = alvo.getAttribute('data-aranha') === 'titulo';
      const tam = titulo ? Math.max(40, Math.min(76, caixa0.height * 0.62)) : 38;
      // onde ela anda: por cima das letras (primeira linha do texto) ou pela borda de cima da caixa
      const faixa = () => {
        const caixa = alvo.getBoundingClientRect();
        if (!titulo) return { x0: caixa.left - tam, x1: caixa.right + tam * 0.3, y: caixa.top };
        const texto = document.createRange();
        texto.selectNodeContents(alvo);
        const linha = texto.getClientRects()[0] || caixa;
        return { x0: linha.left - tam, x1: linha.right + tam * 0.4, y: linha.top + linha.height * 0.52 };
      };
      const volta = Math.random() < 0.4;
      const a = criaAranha(tam);
      cena.appendChild(a);
      emCena.set(alvo, a);
      const ida = faixa();
      const dist = Math.abs(ida.x1 - ida.x0), vel = titulo ? 250 : 150;
      const pausaEm = 0.38 + Math.random() * 0.3, pausa = 420 + Math.random() * 500;
      const dur = (dist / vel) * 1000, ini = performance.now(), onda = Math.random() * 6.28;
      const quadro = (agora: number) => {
        const e = agora - ini, t1 = pausaEm * dur;
        let fr: number, parada = false;
        if (e < t1) fr = pausaEm * suave(e / t1);
        else if (e < t1 + pausa) {
          fr = pausaEm;
          parada = true;
        } else fr = pausaEm + (1 - pausaEm) * suave((e - t1 - pausa) / (dur - t1));
        const { x0, x1, y } = faixa();
        const de = volta ? x1 : x0, ate = volta ? x0 : x1;
        const d = fr * dist, x = de + (ate - de) * fr, ginga = Math.sin(d / 46 + onda) * (titulo ? tam * 0.16 : 3);
        const giro = (volta ? 180 : 0) + Math.cos(d / 46 + onda) * 9;
        a.style.transform = `translate(${(x - tam / 2).toFixed(1)}px,${(y + ginga - tam / 2).toFixed(1)}px) rotate(${giro.toFixed(1)}deg)`;
        posar(a, (d / (tam * 0.8)) * 6.283 + (parada ? Math.sin(agora / 110) * 0.2 : 0), 13);
        if (e < dur + pausa) pede(quadro);
        else {
          a.remove();
          emCena.delete(alvo);
        }
      };
      pede(quadro);
    };

    const visiveis = new Set<Element>();
    const esperas = new Set<ReturnType<typeof setTimeout>>();
    const olho = new IntersectionObserver(
      (entradas) => {
        for (const en of entradas) {
          if (en.isIntersecting) {
            visiveis.add(en.target);
            const t = setTimeout(() => {
              esperas.delete(t);
              if (vivo && visiveis.has(en.target)) anda(en.target);
            }, 500 + Math.random() * 1800);
            esperas.add(t);
          } else visiveis.delete(en.target);
        }
      },
      { threshold: 0.75 },
    );
    document.querySelectorAll('[data-aranha]').forEach((el) => olho.observe(el));
    // de tempos em tempos, uma das que estão na tela anda de novo
    const repete = setInterval(() => {
      const lista = Array.from(visiveis);
      if (lista.length) anda(lista[Math.floor(Math.random() * lista.length)]);
    }, 9000);

    return () => {
      vivo = false;
      olho.disconnect();
      clearInterval(repete);
      esperas.forEach(clearTimeout);
      quadros.forEach(cancelAnimationFrame);
      emCena.forEach((a) => a.remove());
      pendurada?.remove();
    };
  }, []);

  return (
    <div className="tema" aria-hidden>
      <svg className="teia te1" viewBox="0 0 430 430">
        <path d={TEIA_1} />
      </svg>
      <svg className="teia te2" viewBox="0 0 430 430">
        <path d={TEIA_2} />
      </svg>
      {MORCEGOS.map((m) => (
        <div key={m.y} className={`morcego${m.volta ? ' volta' : ''}`} style={{ ['--y' as string]: m.y, ['--t' as string]: m.t, ['--d' as string]: m.d, ['--a' as string]: m.a }}>
          <div>
            <svg viewBox="-80 -44 160 72">
              <g fill="#0E0605" stroke="rgba(255,122,20,.6)" strokeWidth="1.6" strokeLinejoin="round">
                <path className="asa" d={ASA} transform="translate(5 -2)" />
                <g transform="scale(-1 1)">
                  <path className="asa" d={ASA} transform="translate(5 -2)" />
                </g>
                <path d={CORPO_MORCEGO} />
              </g>
            </svg>
          </div>
        </div>
      ))}
      <div ref={fio} className="fio" />
      {/* as aranhas que andam entram aqui pelo código acima; o React não põe nada nesta caixa */}
      <div ref={palco} />
    </div>
  );
}
