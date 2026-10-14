# Arquitetura · mapa do código

Next.js 16 (App Router, React 19), Tailwind 4, pnpm. Sem biblioteca de animação: o movimento é CSS.

## Pastas

```
src/
  app/
    layout.tsx            fontes, metadados, dados estruturados do evento
    globals.css           cores do manual, classes da marca (.gotica, .titulo, .rotulo, .fogo, .olho, .brasas, .acende),
                          o tema (.tema, .aranha-anda) e a abertura (.abertura-*)
    page.tsx              a página: abertura e tema por cima; marca e data → atração → lista VIP → local → assinaturas
    favicon.ico, icon.png (192 px), apple-icon.png   ícone do navegador e do celular (o de 512 px está em public/img)
    opengraph-image.jpg, twitter-image.jpg   imagem que aparece ao compartilhar o link (1200×630)
    manifest.ts, robots.ts, sitemap.ts, not-found.tsx
    api/lista/route.ts    POST do formulário
    lista/                portaria: page.tsx (senha + lista), actions.ts, tabela.tsx (busca, filtros, CONFIRMAR / DESFAZER / TIRAR),
                          csv/route.ts (planilha), painel/ (comparecimento em gráficos)
  components/
    abertura.tsx          abertura de 4 s, a cada carregamento da página inicial: teia que gira, aranha que tece, abóbora que acende
    tema.tsx              tema por cima da página: teias, morcegos, aranha no fio e aranhas que andam nos alvos com data-aranha
    brasas.tsx            pontos de luz que sobem (posições fixas, iguais no servidor e no navegador)
    form-lista.tsx        formulário, confirmação e os estados "em breve" e "encerrada"
    revela.tsx            entrada das seções ao chegar na tela
  lib/
    evento.ts             TODOS os dados: evento, lista (LISTA), atração (ATRACAO), camarotes, ingressos
    db.ts                 conexão: Neon em produção, PGlite no computador; cria a tabela sozinho
    lista.ts              limpar e validar nome/WhatsApp/e-mail; gravar, listar, confirmar presença, remover
    painel.ts             contas do comparecimento (funções puras)
    origens.ts            de onde veio cada nome (site ou lista por indicação); sem banco, para a tela da portaria poder usar
    sessao.ts             sessão da portaria (cookie assinado com LISTA_SENHA, 12 h)
    tema-desenhos.ts      traços das teias, do morcego e da aranha (os mesmos do manual de marca) e a pose das pernas
public/img/               logo, abóbora (abertura), recorte do artista, logos de parceiros (WebP) e o ícone de 512 px
vercel.json               fixa o projeto como Next.js e define cabeçalhos de segurança e o cache de /img
```

## Tema e abertura

- `Tema` e `Abertura` entram só na página inicial (e o `Tema` na 404). Portaria e painel ficam limpos: são telas de trabalho.
- A camada do tema é fixa na janela e não recebe clique. As aranhas andam só por cima do que tem `data-aranha`
  (`"titulo"` = sobre as letras, `"caixa"` = pela borda de cima), no máximo duas ao mesmo tempo.
- A abertura conta 4 s desde que o HTML chega. A logo da página espera esse tempo para acender (`.acende.apos-abertura`).
  Sem JavaScript, `<noscript>` esconde a abertura; se o código falhar, o CSS a tira sozinho aos 8 s.
- Com "reduzir movimento" ligado: teias paradas, sem morcegos nem aranhas, abertura de meio segundo.
- No celular (até 700 px): teias menores e sem a aranha no fio.

## Estados da lista

`estadoDaLista()` em `evento.ts` devolve `em-breve`, `aberta` ou `encerrada`, e vale para a página, para a rota e para a portaria.

- `em-breve`: `LISTA.liberada` é `false`. A página mostra o aviso e a rota responde 403.
- `aberta`: `LISTA.liberada` é `true` e o prazo (`LISTA.fecha`) não passou.
- `encerrada`: passou de `LISTA.fecha`. A rota responde 410.
- `LISTA_TESTE=1` abre a lista só fora de produção, para testar.

## Banco

Uma tabela, criada no primeiro uso (`src/lib/db.ts`):

```sql
baile_lista_vip (id bigserial, nome text, whatsapp text unique [pode ser vazio], criado_em timestamptz, email text, presente_em timestamptz, origem text default 'site')
```

O WhatsApp é único: a mesma pessoa enviando duas vezes não duplica. `presente_em` é a hora em que a portaria confirmou.
`origem` diferente de `site` = lista por indicação, que entra só com o nome.

## Proteções do formulário

Lista fora do prazo recusada no servidor; campo-isca invisível contra robô; aceite obrigatório do uso dos dados;
limite de 40 envios a cada 10 minutos por endereço; em produção sem `DATABASE_URL` a rota responde 503 em vez de fingir que gravou.

## O que mudar e onde

- Texto, data, local, atração, números, lista, camarotes, ingressos: `src/lib/evento.ts`.
- Cores e classes da marca: `src/app/globals.css`.
- Onde as aranhas andam: o atributo `data-aranha` em `src/app/page.tsx`. Quantos morcegos e a que altura: `MORCEGOS` em `src/components/tema.tsx`.
- Duração da abertura: `DURACAO` em `src/components/abertura.tsx` (e o atraso de `.acende.apos-abertura` no CSS, que acompanha).
- Ícones e imagem de compartilhamento: saem de `D:\dev\remotion-studio\src\baile\Marca.tsx` (`baile-icone-512`, `baile-icone-180`, `baile-og-evento`).
