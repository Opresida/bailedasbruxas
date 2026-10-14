@AGENTS.md

# Baile das Bruxas · site do evento

Ler antes de começar: `CONTEXT.md`, `TODO.md`, `ARCHITECTURE.md` e `git log --oneline -15`.
Antes de encerrar: atualizar esses três e o `README.md`.

## Regras do projeto

- Código, nomes de arquivo e comentários em português.
- `pnpm`, nunca `npm` ou `yarn`.
- Tudo o que o site diz sobre a festa sai de `src/lib/evento.ts`. O que não foi confirmado pelo Humberto fica vazio.
- Este show não tem lista VIP: a página leva para a compra do ingresso (`INGRESSOS`). Não recriar formulário nem banco sem ele pedir.
- Marca: manual "Brasa na noite". Gótica só em título curto; nada de visual do O.C.U.L.T.O nem da BrandSquad.

## Antes de dizer que está pronto

`pnpm typecheck`, `pnpm lint` e `pnpm build` (com o `pnpm dev` parado: a porta é a 3400).
Conferir a 390 px e a 1440 px, sem rolagem lateral. Para medir a largura certa no navegador automático: `pnpm build`,
`pnpm start` e abrir `http://127.0.0.1:3400` (em `localhost` ele abre com zoom de 75%).

## Cuidados

- `.conferencia/` (capturas) não vai para o repositório.
- `vercel.json` fixa o projeto como Next.js. Sem ele a Vercel já publicou só a pasta `public/` em outro projeto. Não apagar.
- Push na `main` publica sozinho na Vercel: commit e push só quando o Humberto pedir.
- Link de ingresso sem códigos de rastreio de terceiros (`fbclid`, `utm_*` de outra origem).
