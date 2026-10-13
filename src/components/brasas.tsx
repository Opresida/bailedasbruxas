// Brasas: pontos de luz que sobem devagar (manual de marca, capítulo "Fogo, fumaça e luz").
// As posições saem de uma conta fixa, não de sorteio: o servidor e o navegador desenham exatamente o mesmo.

const fracao = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

export function Brasas({ quantidade = 22, semente = 7 }: { quantidade?: number; semente?: number }) {
  return (
    <div className="brasas" aria-hidden>
      {Array.from({ length: quantidade }, (_, i) => {
        const a = fracao(semente + i * 3.1);
        const b = fracao(semente + i * 7.7);
        const c = fracao(semente + i * 13.3);
        const lado = 3 + Math.round(b * 6);
        return (
          <i
            key={i}
            style={{
              left: `${(a * 100).toFixed(2)}%`,
              width: lado,
              height: lado,
              animationDuration: `${(9 + c * 12).toFixed(1)}s`,
              animationDelay: `${(-b * 20).toFixed(1)}s`,
              ['--o' as string]: (0.35 + c * 0.55).toFixed(2),
              ['--dx' as string]: `${Math.round((a - 0.5) * 120)}px`,
            }}
          />
        );
      })}
    </div>
  );
}
