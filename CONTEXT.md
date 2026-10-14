# Contexto · regras e decisões

## O evento

- **Baile das Bruxas**, festa de Halloween da Royals Entretenimento (a mesma cliente do O.C.U.L.T.O).
- **Sexta-feira, 13.11.2026**, no **Tarumã · Casa de Festas & Convenções**.
- **Atração nacional: Chefin.**
- Quem apresenta (definido pela cliente em 13/10/2026): Royals, 100 Mídia e Baile do Poderoso, as três marcas sempre juntas (`EVENTO.apresentam` em `src/lib/evento.ts`). Não existe mais "Realização" nem "Parceiros" no site.
- Site e marca: BrandSquad.

## Decisões do Humberto (2026-10-13)

- Repositório oficial `Opresida/bailedasbruxas`, publicação na Vercel, com imagem de compartilhamento, ícones e tudo pronto para subir.
- O site é **página do evento + lista VIP**, reaproveitando o funcionamento da lista do O.C.U.L.T.O (`D:\dev\oculto`): formulário, portaria com confirmação de presença, painel e planilha.
- Marca: manual "Brasa na noite" (área do cliente em `/baile-das-bruxas` no site da BrandSquad).
- Logos da Royals e da BrandSquad entram sempre.

## O que ainda NÃO foi confirmado (e por isso não aparece no site)

- **Regra da lista VIP** (o que ela dá), **prazo** para colocar o nome e **horário-limite** de entrada. Enquanto isso a lista fica "em breve".
- **Senha da portaria** (`LISTA_SENHA`).
- **Horário** de abertura e **cidade**.
- **Link de ingressos**.
- **Telefones de camarote**: estão na arte da cliente e já estão em `evento.ts`, mas o botão só aparece com `CAMAROTES.confirmado = true`.

## Marca (manual v1.0)

- Cores: Noite `#07040A`, Carvão `#1A0D06`, Osso `#F4F1EC`, Ouro `#FFC21E`, Brasa `#FF7A14`, Sangue `#E8270E`. Proporção 70% escuro, 20% fogo, 10% osso.
- Fontes: Pirata One (só títulos curtos, nunca tudo em maiúsculas), Barlow Condensed (chamadas, números, botões), Barlow (texto).
- A logo não se altera. Logos de parceiros em uma cor (Osso); a BrandSquad é a única com cor própria (o ponto laranja).
- O desenho deste site é próprio: não repete o do O.C.U.L.T.O.

## Cuidados

- **Não inventar** regra, preço, horário, promoção nem atração: o site diz só o que o Humberto confirmou.
- **Números do Chefin** (views e feitos) foram conferidos na fonte em 13.10.2026 e arredondados para baixo; reconferir antes de mexer. Fora do site: controvérsias e o símbolo do Jumpman (marca da Nike) que vem no arquivo de logo dele.
- A arte de referência da cliente diz "nova data" e "novo local": no site entram só a data e o local.
- **Listas por indicação** (só nome) entram por script e só quando o Humberto mandar; não existe botão de adicionar nome na portaria.
- Os dados da lista são de pessoas reais: ficam atrás da senha da portaria e o banco é apagado depois do evento, com a confirmação do Humberto.
- Segredos (`DATABASE_URL`, `LISTA_SENHA`) só na Vercel. Nunca no repositório.
