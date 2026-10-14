# Baile das Bruxas · site do evento

Página pública da festa **Baile das Bruxas** (Royals, 100 Mídia e Baile do Poderoso): sexta-feira, 13.11.2026, no
Tarumã · Casa de Festas & Convenções, com o Chefin como atração nacional. Mostra a atração e leva para a compra do
ingresso. O show não tem lista VIP.

Repositório oficial: `github.com/Opresida/bailedasbruxas`. No ar em **https://bailedasbruxas.vercel.app**
(projeto `bailedasbruxas` na Vercel, conta `opresida`; cada envio à `main` publica sozinho).

## Rodar no computador

```bash
pnpm install
pnpm dev          # http://localhost:3400
```

## Rotas

| Rota | O que é |
|---|---|
| `/` | Página do evento: a marca, a data, a atração (feitos e maiores hits), os ingressos, o local e as assinaturas |

Não há banco, formulário nem rota de servidor: o site é estático.

## Publicar (Vercel)

O projeto já existe na Vercel e está ligado a este repositório. O `vercel.json` fixa o projeto como Next.js (não
apagar) e define os cabeçalhos padrão. Não há variável obrigatória; `SITE_URL` só entra se houver domínio próprio.

## Estado

- Publicado em 13/10/2026, com o tema da festa (teias, morcegos, aranhas, brasas) e a abertura de 4 segundos.
- Três botões "Comprar ingresso" levam para a Igarê (`INGRESSOS` em `src/lib/evento.ts`).
- Conferido em 360, 390, 768, 1024 e 1440 px, sem rolagem lateral.

Mais detalhes: `CONTEXT.md` (regras e decisões), `ARCHITECTURE.md` (mapa do código), `TODO.md`.
