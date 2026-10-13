// De onde veio cada nome da lista. Fica num arquivo sem banco para a tela da portaria (que roda no navegador)
// poder usar: importar de lista.ts levaria o código do banco junto e quebraria a página.
// 'site' = inscrição pelo formulário. Listas por indicação (só com o nome) entram por fora, por script, sempre a
// pedido do Humberto: para cada uma, acrescentar aqui o rótulo e o lugar na ordem ANTES de importar os nomes.
// Não existe (e não é para existir) botão de adicionar nome na portaria.
export const ORIGENS: Record<string, string> = {
  site: 'Site',
};
export const nomeDaOrigem = (o: string) => ORIGENS[o] ?? o;

/** Ordem nos filtros e nos gráficos: o site primeiro, depois as listas na ordem em que chegarem. */
export const ORDEM_ORIGENS = ['site'];

/** As origens que aparecem na lista, na ordem certa (uma origem nova, ainda sem lugar na ordem, vai para o fim). */
export function origensPresentes(origens: string[]): string[] {
  const tem = new Set(origens);
  return [...ORDEM_ORIGENS.filter((o) => tem.has(o)), ...[...tem].filter((o) => !ORDEM_ORIGENS.includes(o)).sort()];
}
