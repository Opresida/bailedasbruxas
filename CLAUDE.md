@AGENTS.md

# Baile das Bruxas · site do evento

Ler antes de começar: `CONTEXT.md`, `TODO.md`, `ARCHITECTURE.md` e `git log --oneline -15`.
Antes de encerrar: atualizar esses três e o `README.md`.

## Regras do projeto

- Código, nomes de arquivo e comentários em português.
- `pnpm`, nunca `npm` ou `yarn`.
- Tudo o que o site diz sobre a festa sai de `src/lib/evento.ts`. O que não foi confirmado pelo Humberto fica vazio.
- Componente de tela (`'use client'`) não importa valor de `lib/lista.ts` nem de `lib/db.ts` (traz o banco junto e a página dá erro; o typecheck não pega). Rótulos de origem ficam em `lib/origens.ts`.
- Marca: manual "Brasa na noite". Gótica só em título curto; nada de visual do O.C.U.L.T.O nem da BrandSquad.

## Antes de dizer que está pronto

`pnpm typecheck`, `pnpm lint` e `pnpm build` (com o `pnpm dev` parado: a porta é a 3400).
Conferir a 390 px e a 1440 px, sem rolagem lateral.

## Cuidados

- `.data/` (banco local) e `.conferencia/` (capturas) não vão para o repositório.
- `vercel.json` fixa o projeto como Next.js. Sem ele a Vercel já publicou só a pasta `public/` em outro projeto. Não apagar.
- Segredos só na Vercel. Nunca escrever `DATABASE_URL` ou `LISTA_SENHA` em arquivo versionado, log ou resposta.
- Commit e push: só quando o Humberto pedir.
- Mudança em lista com dados reais: cópia de segurança no Neon antes, e conferir que o resto da lista ficou igual.
