# Baile das Bruxas · site do evento

Página pública da festa **Baile das Bruxas** (Royals Entretenimento): sexta-feira, 13.11.2026, no Tarumã · Casa de
Festas & Convenções, com o Chefin como atração nacional. Mostra a atração, guarda os nomes da lista VIP e dá à
portaria a lista com confirmação de presença.

Repositório oficial: `github.com/Opresida/bailedasbruxas`. No ar em **https://bailedasbruxas.vercel.app**
(projeto `bailedasbruxas` na Vercel, conta `opresida`; cada envio à `main` publica sozinho).

## Rodar no computador

```bash
pnpm install
pnpm dev                                           # http://localhost:3400
LISTA_TESTE=1 LISTA_SENHA=uma-senha pnpm dev        # lista aberta só para teste + portaria
```

Sem `DATABASE_URL`, o desenvolvimento usa um Postgres embutido (PGlite) na pasta `.data/`, que não vai para o
repositório.

## Rotas

| Rota | O que é |
|---|---|
| `/` | Página do evento: a marca, a data, a atração (feitos e maiores hits), a lista VIP, o local e as assinaturas |
| `/lista` | Portaria: nomes, busca, filtro, **confirmação de presença**, retirada de nome e planilha. Pede senha |
| `/lista/painel` | Comparecimento em gráficos: inscritos × presentes, chegadas por horário, por dia e por indicação |
| `/lista/csv` | Planilha da lista (abre no Excel). Só com a portaria aberta |
| `POST /api/lista` | Recebe nome + WhatsApp + e-mail do formulário |

## Publicar (Vercel)

1. O projeto já existe na Vercel e está ligado a este repositório. O `vercel.json` fixa o projeto como Next.js
   (não apagar) e define os cabeçalhos padrão.
2. Em *Settings → Environment Variables* (ainda **não** preenchidas: sem elas a lista fica fora do ar de propósito):
   - `DATABASE_URL`: endereço de conexão do banco no Neon (com *Connection pooling* ligado);
   - `LISTA_SENHA`: senha da portaria (6 caracteres ou mais);
   - `SITE_URL` (opcional): endereço final, se houver domínio próprio.
3. Publicar. A tabela `baile_lista_vip` se cria sozinha no primeiro nome enviado.

Modelo das variáveis em `.env.example`.

## Estado

- Site publicado em 13/10/2026, com o tema da festa (teias, morcegos, aranhas, brasas) e a abertura de 4 segundos.
- Conferido em 360, 390, 768, 1024 e 1440 px, sem rolagem lateral.
- **Sem banco e sem senha da portaria por enquanto**: `/lista` avisa que falta a senha e o formulário recusa envio.
- **A lista VIP está "em breve"** de propósito: abre quando a regra, o prazo e a senha da portaria forem definidos (`src/lib/evento.ts`, objeto `LISTA`).

Mais detalhes: `CONTEXT.md` (regras e decisões), `ARCHITECTURE.md` (mapa do código), `TODO.md`.
