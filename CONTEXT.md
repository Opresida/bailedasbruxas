# Contexto · regras e decisões

## O evento

- **Baile das Bruxas**, festa de Halloween da Royals Entretenimento (a mesma cliente do O.C.U.L.T.O).
- **Sexta-feira, 13.11.2026**, no **Tarumã · Casa de Festas & Convenções**.
- **Atração nacional: Chefin.**
- Quem apresenta (definido pela cliente em 13/10/2026): Royals, 100 Mídia e Baile do Poderoso, as três marcas sempre juntas (`EVENTO.apresentam` em `src/lib/evento.ts`). Não existe mais "Realização" nem "Parceiros" no site.
- Site e marca: BrandSquad.

## Decisões do Humberto (2026-10-13)

- Repositório oficial `Opresida/bailedasbruxas`, publicação na Vercel, com imagem de compartilhamento, ícones e tudo pronto para subir.
- O site é a **página do evento, com a venda de ingressos**. Começou com uma lista VIP trazida do O.C.U.L.T.O, mas **este show não tem lista VIP** (correção dele na noite de 13/10/2026): formulário, portaria, painel e banco saíram do site.
- **Ingressos:** OTicket, `https://oticket.com.br/event/11616/baile-do-poderoso-o-ultimo` (a página lá se chama "BAILE DAS BRUXAS", sexta 13/11/2026, Manaus/AM, Tarumã Fest). O link que ele mandou vinha com `utm_*` e `fbclid` do Instagram dele; no site entrou sem eles.
- Marca: manual "Brasa na noite" (área do cliente em `/baile-das-bruxas` no site da BrandSquad).
- Logos da Royals e da BrandSquad entram sempre.
- Publicar no GitHub e na Vercel já. No ar em `bailedasbruxas.vercel.app`.
- Tema da festa na página (morcegos, aranhas, brasas, teias) e abertura temática de 4 segundos, que toca **toda vez** que a página inicial abre (escolha dele, e não uma vez por visita).

## O que ainda NÃO foi confirmado (e por isso não aparece no site)

- **Horário** de abertura e **cidade** (a página da OTicket diz Manaus/AM; no site só entra quando ele confirmar).
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
- O site não guarda dado de ninguém e não tem segredo: é estático.
