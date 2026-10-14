# Arquitetura · mapa do código

Next.js 16 (App Router, React 19), Tailwind 4, pnpm. Sem biblioteca de animação: o movimento é CSS.
Site de uma página, todo estático: não tem banco, formulário nem rota de servidor.

## Pastas

```
src/
  app/
    layout.tsx            fontes, metadados, dados estruturados do evento (com o link de ingressos)
    globals.css           cores do manual, classes da marca (.gotica, .titulo, .rotulo, .fogo, .olho, .brasas, .acende),
                          o tema (.tema, .aranha-anda) e a abertura (.abertura-*)
    page.tsx              a página: abertura e tema por cima; marca e data → atração → ingressos → local → assinaturas
    favicon.ico, icon.png (192 px), apple-icon.png   ícone do navegador e do celular (o de 512 px está em public/img)
    opengraph-image.jpg, twitter-image.jpg   imagem que aparece ao compartilhar o link (1200×630)
    manifest.ts, robots.ts, sitemap.ts, not-found.tsx
  components/
    abertura.tsx          abertura de 4 s, a cada carregamento da página inicial: teia que gira, aranha que tece, abóbora que acende
    tema.tsx              tema por cima da página: teias, morcegos, aranha no fio e aranhas que andam nos alvos com data-aranha
    brasas.tsx            pontos de luz que sobem (posições fixas, iguais no servidor e no navegador)
    revela.tsx            entrada das seções ao chegar na tela
  lib/
    evento.ts             TODOS os dados: evento, atração (ATRACAO), camarotes e ingressos (INGRESSOS)
    tema-desenhos.ts      traços das teias, do morcego e da aranha (os mesmos do manual de marca) e a pose das pernas
public/img/               logo, abóbora (abertura), recorte do artista, logos de parceiros (WebP) e o ícone de 512 px
vercel.json               fixa o projeto como Next.js e define cabeçalhos de segurança e o cache de /img
```

## Ingressos

- Este show **não tem lista VIP**: a entrada é pelo ingresso, vendido fora do site (OTicket).
- O link fica em `INGRESSOS` (`src/lib/evento.ts`), sem códigos de rastreio. Ele alimenta três botões "Comprar ingresso":
  no topo, na seção "Garanta o seu" e na seção do local. Com `INGRESSOS` vazio, os três e a seção somem.
- A lista VIP que existia (formulário, portaria, painel, banco) foi retirada em 13/10/2026. Se um evento futuro precisar,
  o código está no histórico do Git (commit `ab782ca` e anteriores) e no site do O.C.U.L.T.O (`D:\dev\oculto`).

## Tema e abertura

- `Tema` e `Abertura` entram na página inicial; o `Tema` também na 404.
- A camada do tema é fixa na janela e não recebe clique. As aranhas andam só por cima do que tem `data-aranha`
  (`"titulo"` = sobre as letras, `"caixa"` = pela borda de cima), no máximo duas ao mesmo tempo.
- A abertura conta 4 s desde que o HTML chega. A logo da página espera esse tempo para acender (`.acende.apos-abertura`).
  Sem JavaScript, `<noscript>` esconde a abertura; se o código falhar, o CSS a tira sozinho aos 8 s.
- Com "reduzir movimento" ligado: teias paradas, sem morcegos nem aranhas, abertura de meio segundo.
- No celular (até 700 px): teias menores e sem a aranha no fio.

## O que mudar e onde

- Texto, data, local, atração, números, camarotes, ingressos: `src/lib/evento.ts`.
- Cores e classes da marca: `src/app/globals.css`.
- Onde as aranhas andam: o atributo `data-aranha` em `src/app/page.tsx`. Quantos morcegos e a que altura: `MORCEGOS` em `src/components/tema.tsx`.
- Duração da abertura: `DURACAO` em `src/components/abertura.tsx` (e o atraso de `.acende.apos-abertura` no CSS, que acompanha).
- Ícones e imagem de compartilhamento: saem de `D:\dev\remotion-studio\src\baile\Marca.tsx` (`baile-icone-512`, `baile-icone-180`, `baile-og-evento`).
