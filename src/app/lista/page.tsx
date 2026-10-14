import type { Metadata } from 'next';
import Link from 'next/link';
import { BancoIndisponivel } from '@/lib/db';
import { EVENTO, ROTULO_DA_LISTA, estadoDaLista } from '@/lib/evento';
import { listar, type Convidado } from '@/lib/lista';
import { logado, senhaConfigurada } from '@/lib/sessao';
import { entrar, sair } from './actions';
import { Tabela } from './tabela';

// Lista da portaria. Só entra com a senha (LISTA_SENHA). Sempre lida na hora, nunca de cache:
// enquanto a lista aceita nomes, a portaria precisa ver quem acabou de entrar.

export const metadata: Metadata = { title: 'Lista da portaria', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function Lista({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;

  if (!(await logado())) {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-5 py-12">
        <p className="rotulo text-cinza-escuro">{EVENTO.nome} · PORTARIA</p>
        <h1 className="titulo mt-3 text-4xl text-osso">LISTA VIP</h1>
        {senhaConfigurada() ? (
          <form action={entrar} className="mt-8 flex flex-col gap-3">
            <label htmlFor="senha" className="rotulo text-areia">
              SENHA DA PORTARIA
            </label>
            <input id="senha" name="senha" type="password" required autoFocus autoComplete="current-password" className="border border-fio bg-carvao px-4 py-3 text-lg text-osso outline-none focus:border-brasa" />
            {erro && <p className="text-sm text-osso">Senha incorreta.</p>}
            <button className="titulo mt-2 cursor-pointer bg-brasa px-5 py-3.5 text-base text-noite hover:bg-ouro">ABRIR A LISTA</button>
          </form>
        ) : (
          <p className="mt-6 text-areia">A lista ainda não tem senha. Defina a variável LISTA_SENHA (6 caracteres ou mais) na Vercel e publique de novo.</p>
        )}
        <Link href="/" className="rotulo mt-10 text-cinza-escuro underline underline-offset-4 hover:text-osso">
          ← PÁGINA DA FESTA
        </Link>
      </main>
    );
  }

  let convidados: Convidado[] = [];
  let falha = '';
  try {
    convidados = await listar();
  } catch (e) {
    falha = e instanceof BancoIndisponivel ? 'O banco não está configurado (DATABASE_URL).' : 'Não consegui ler a lista agora. Toque em atualizar.';
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="rotulo text-cinza-escuro">
            {EVENTO.nome} · {EVENTO.dia} {EVENTO.data} · {ROTULO_DA_LISTA[estadoDaLista()]}
          </p>
          <h1 className="titulo mt-2 text-4xl text-osso">LISTA VIP</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/lista/painel" className="rotulo border border-brasa px-4 py-3 text-osso hover:bg-brasa hover:text-noite">
            PAINEL
          </Link>
          <a href="/lista/csv" className="rotulo border border-fio px-4 py-3 text-areia hover:border-brasa hover:text-osso">
            BAIXAR PLANILHA
          </a>
          <form action={sair}>
            <button className="rotulo cursor-pointer border border-fio px-4 py-3 text-areia hover:border-brasa hover:text-osso">SAIR</button>
          </form>
        </div>
      </header>
      {falha ? (
        <p className="mt-8 border border-fio px-4 py-6 text-osso">{falha}</p>
      ) : (
        <>
          <div className="mt-6"><Tabela convidados={convidados} /></div>
        </>
      )}
    </main>
  );
}
