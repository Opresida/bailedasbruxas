# Arquitetura · mapa do código

Next.js 16 (App Router, React 19), Tailwind 4, pnpm. Sem biblioteca de animação: o movimento é CSS.

## Pastas

```
src/
  app/
    layout.tsx            fontes, metadados, dados estruturados do evento
    globals.css           cores do manual, classes da marca (.gotica, .titulo, .rotulo, .fogo, .olho, .brasas, .acende)
    page.tsx              a página: marca e data → atração → lista VIP → local → assinaturas
    icon.png, apple-icon.png                 ícone do navegador e do celular
    opengraph-image.png, twitter-image.png   imagem que aparece ao compartilhar o link (1200×630)
    manifest.ts, robots.ts, sitemap.ts, not-found.tsx
    api/lista/route.ts    POST do formulário
    lista/                portaria: page.tsx (senha + lista), actions.ts, tabela.tsx (busca, filtros, CONFIRMAR / DESFAZER / TIRAR),
                          csv/route.ts (planilha), painel/ (comparecimento em gráficos)
  components/
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
public/img/               logo, recorte do artista e logos de parceiros, em WebP
```

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
- Ícones e imagem de compartilhamento: saem de `D:\dev\remotion-studio\src\baile\Marca.tsx` (`baile-icone-512`, `baile-icone-180`, `baile-og-evento`).
