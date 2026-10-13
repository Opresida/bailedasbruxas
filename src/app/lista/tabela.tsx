'use client';

import { useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import type { Convidado } from '@/lib/lista';
import { nomeDaOrigem, origensPresentes } from '@/lib/origens';
import { confirmar, desfazer, removerDaLista } from './actions';

const semAcento = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const mostrarFone = (d: string) => (d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`);
const quando = (iso: string) => new Date(iso).toLocaleString('pt-BR', { timeZone: 'America/Manaus', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
const hora = (iso: string) => new Date(iso).toLocaleTimeString('pt-BR', { timeZone: 'America/Manaus', hour: '2-digit', minute: '2-digit' });

type Filtro = 'todos' | 'faltam' | 'presentes';

const chip = (ativo: boolean) => `rotulo shrink-0 cursor-pointer whitespace-nowrap border px-2.5 py-2 ${ativo ? 'border-brasa bg-brasa text-noite' : 'border-fio text-areia hover:border-brasa hover:text-osso'}`;

/** Botão que mostra que o toque foi recebido: no 4G da porta, a resposta pode demorar um segundo. */
function Enviar({ children, className, rotulo }: { children: React.ReactNode; className: string; rotulo: string }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} aria-label={rotulo} className={`${className} disabled:cursor-wait disabled:opacity-50`}>
      {pending ? '···' : children}
    </button>
  );
}

/**
 * Lista da portaria: busca enquanto digita (sem acento, por nome, telefone ou e-mail), filtro por indicação
 * (site ou cada lista que entrou por fora), filtro por situação e a confirmação de presença. A régua de presentes
 * e as contagens acompanham a indicação escolhida.
 */
export function Tabela({ convidados }: { convidados: Convidado[] }) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [indicacao, setIndicacao] = useState<string>('todas');
  const router = useRouter();

  const origens = useMemo(() => origensPresentes(convidados.map((c) => c.origem)), [convidados]);
  const daIndicacao = useMemo(() => (indicacao === 'todas' ? convidados : convidados.filter((c) => c.origem === indicacao)), [convidados, indicacao]);
  const presentes = daIndicacao.filter((c) => c.presenteEm).length;
  const filtrados = useMemo(() => {
    const b = semAcento(busca.trim());
    const digitos = b.replace(/\D/g, '');
    return daIndicacao.filter((c) => {
      if (filtro === 'faltam' && c.presenteEm) return false;
      if (filtro === 'presentes' && !c.presenteEm) return false;
      if (!b) return true;
      return semAcento(c.nome).includes(b) || (digitos.length >= 3 && c.whatsapp.includes(digitos)) || (b.length >= 3 && c.email.includes(b));
    });
  }, [busca, filtro, daIndicacao]);

  const filtros: [Filtro, string, number][] = [['todos', 'TODOS', daIndicacao.length], ['faltam', 'FALTAM', daIndicacao.length - presentes], ['presentes', 'PRESENTES', presentes]];
  const pct = daIndicacao.length ? Math.round((presentes / daIndicacao.length) * 100) : 0;

  return (
    <>
      {/* quantos já chegaram (da indicação escolhida): a régua enche a cada CONFIRMAR */}
      <div role="img" aria-label={`${presentes} presentes de ${daIndicacao.length} inscritos`}>
        <p className="rotulo flex justify-between text-areia">
          <span>
            <strong className="font-medium text-osso">{presentes}</strong> PRESENTES DE {daIndicacao.length}
            {indicacao !== 'todas' && <span className="text-cinza"> · {nomeDaOrigem(indicacao).toUpperCase()}</span>}
          </span>
          <span className="text-osso">{daIndicacao.length ? `${pct}%` : '—'}</span>
        </p>
        <div className="mt-2 h-2 w-full rounded-[2px] bg-fio/50">
          <div className="h-2 rounded-[2px] bg-brasa" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="sticky top-0 z-10 -mx-4 mt-4 border-b border-carvao bg-noite/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar nome, telefone ou e-mail"
            aria-label="Buscar nome, telefone ou e-mail"
            autoFocus
            className="min-w-0 flex-1 border border-fio bg-carvao px-4 py-3 text-lg text-osso outline-none placeholder:text-cinza-escuro focus:border-brasa"
          />
          <button type="button" onClick={() => router.refresh()} className="rotulo cursor-pointer border border-fio px-4 py-3.5 text-areia hover:border-brasa hover:text-osso">
            ATUALIZAR
          </button>
        </div>
        {/* indicação: de onde veio o nome. No celular a linha rola de lado em vez de quebrar. */}
        {origens.length > 1 && (
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Indicação">
            <button type="button" onClick={() => setIndicacao('todas')} aria-pressed={indicacao === 'todas'} className={chip(indicacao === 'todas')}>
              TODAS {convidados.length}
            </button>
            {origens.map((o) => (
              <button key={o} type="button" onClick={() => setIndicacao(o)} aria-pressed={indicacao === o} className={chip(indicacao === o)}>
                {nomeDaOrigem(o).toUpperCase()} {convidados.filter((c) => c.origem === o).length}
              </button>
            ))}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Mostrar">
          {filtros.map(([id, nome, n]) => (
            <button key={id} type="button" onClick={() => setFiltro(id)} aria-pressed={filtro === id} className={chip(filtro === id)}>
              {nome} {n}
            </button>
          ))}
        </div>
      </div>

      <p className="rotulo mt-4 text-cinza-escuro">
        {busca || filtro !== 'todos' || indicacao !== 'todas' ? `${filtrados.length} DE ${convidados.length}` : `${convidados.length} ${convidados.length === 1 ? 'NOME' : 'NOMES'} NA LISTA`}
      </p>

      <ul className="mt-3 divide-y divide-carvao border-y border-carvao">
        {filtrados.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-osso">{c.nome}</p>
              <p className="rotulo mt-1 text-cinza-escuro">
                {c.origem === 'site' ? `${mostrarFone(c.whatsapp)} · ${quando(c.criadoEm)}` : <span className="text-cinza">{nomeDaOrigem(c.origem).toUpperCase()} · SÓ O NOME</span>}
              </p>
              {c.email && <p className="mt-1 truncate text-sm text-cinza">{c.email}</p>}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              {c.presenteEm ? (
                <>
                  <p className="rotulo flex items-center gap-2 text-osso">
                    <span className="h-2.5 w-2.5 bg-brasa" aria-hidden />
                    PRESENTE · {hora(c.presenteEm)}
                  </p>
                  <form
                    action={desfazer}
                    onSubmit={(e) => {
                      if (!window.confirm(`Desfazer a presença de ${c.nome}?`)) e.preventDefault();
                    }}
                  >
                    <input type="hidden" name="id" value={c.id} />
                    <Enviar rotulo={`Desfazer a presença de ${c.nome}`} className="rotulo cursor-pointer border border-fio px-3 py-2 text-cinza hover:border-brasa hover:text-osso">
                      DESFAZER
                    </Enviar>
                  </form>
                </>
              ) : (
                <>
                  <form action={confirmar}>
                    <input type="hidden" name="id" value={c.id} />
                    <Enviar rotulo={`Confirmar a presença de ${c.nome}`} className="titulo cursor-pointer bg-brasa px-4 py-3 text-xs text-noite hover:bg-ouro">
                      CONFIRMAR
                    </Enviar>
                  </form>
                  <form
                    action={removerDaLista}
                    onSubmit={(e) => {
                      if (!window.confirm(`Tirar ${c.nome} da lista?`)) e.preventDefault();
                    }}
                  >
                    <input type="hidden" name="id" value={c.id} />
                    <Enviar rotulo={`Tirar ${c.nome} da lista`} className="rotulo cursor-pointer px-1 py-1 text-cinza underline underline-offset-4 hover:text-osso">
                      TIRAR
                    </Enviar>
                  </form>
                </>
              )}
            </div>
          </li>
        ))}
        {filtrados.length === 0 && <li className="rotulo py-8 text-center text-cinza-escuro">{convidados.length === 0 ? 'NINGUÉM NA LISTA AINDA.' : 'NENHUM NOME COM ESSA BUSCA.'}</li>}
      </ul>
    </>
  );
}
