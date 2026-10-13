'use client';

import { useState } from 'react';
import type { EstadoDaLista } from '@/lib/evento';

// Formulário da lista VIP: nome, WhatsApp e e-mail. O estado da lista (em breve, aberta, encerrada) vem do
// servidor, que é quem decide; o servidor também recusa o envio fora de hora, então não adianta forçar pelo navegador.

type Envio = { fase: 'livre' } | { fase: 'enviando' } | { fase: 'erro'; texto: string } | { fase: 'dentro'; nome: string; jaEstava: boolean };

/** (92) 99999-9999 enquanto digita */
function mascara(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const campo = 'w-full border border-fio bg-noite/80 px-4 py-4 text-lg text-osso outline-none transition-colors placeholder:text-cinza-escuro focus:border-brasa';
const caixa = 'border border-fio bg-carvao/70 p-6 backdrop-blur sm:p-8';

export function FormLista({ estado: inicial, evento, quando }: { estado: EstadoDaLista; evento: string; quando: string }) {
  const [estado, setEstado] = useState<EstadoDaLista>(inicial);
  const [envio, setEnvio] = useState<Envio>({ fase: 'livre' });
  const [whatsapp, setWhatsapp] = useState('');

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    setEnvio({ fase: 'enviando' });
    try {
      const r = await fetch('/api/lista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: dados.get('nome'), whatsapp: dados.get('whatsapp'), email: dados.get('email'), aceite: dados.get('aceite') === 'on', site: dados.get('site') }),
      });
      const j = (await r.json()) as { ok: boolean; nome?: string; jaEstava?: boolean; erro?: string; encerrada?: boolean; emBreve?: boolean };
      if (j.encerrada) setEstado('encerrada');
      if (j.emBreve) setEstado('em-breve');
      if (j.ok && j.nome) setEnvio({ fase: 'dentro', nome: j.nome, jaEstava: Boolean(j.jaEstava) });
      else setEnvio({ fase: 'erro', texto: j.erro ?? 'Não deu certo. Tente de novo.' });
    } catch {
      setEnvio({ fase: 'erro', texto: 'Sem conexão. Confira a internet e tente de novo.' });
    }
  }

  if (envio.fase === 'dentro') {
    const primeiro = envio.nome.split(' ')[0];
    return (
      <div className={`${caixa} border-brasa`} role="status">
        <p className="rotulo flex items-center gap-3 text-brasa">
          <span className="olho" aria-hidden />
          {envio.jaEstava ? 'Você já estava na lista' : 'Confirmado'}
        </p>
        <h3 className="gotica fogo mt-3 text-5xl sm:text-6xl">{primeiro}, seu nome está na lista</h3>
        <p className="mt-4 text-areia">
          Na portaria, diga <strong className="font-semibold text-osso">{envio.nome}</strong>. {evento}, {quando}.
        </p>
      </div>
    );
  }

  if (estado === 'em-breve') {
    return (
      <div className={caixa}>
        <p className="rotulo flex items-center gap-3 text-brasa">
          <span className="olho" aria-hidden />
          Em breve
        </p>
        <h3 className="titulo mt-3 text-4xl text-osso sm:text-5xl">A lista ainda não abriu</h3>
        <p className="mt-4 text-areia">As condições da lista VIP serão divulgadas em breve, aqui nesta página.</p>
      </div>
    );
  }

  if (estado === 'encerrada') {
    return (
      <div className={caixa}>
        <p className="rotulo text-cinza">Lista encerrada</p>
        <h3 className="titulo mt-3 text-4xl text-osso sm:text-5xl">A lista VIP está fechada</h3>
        <p className="mt-4 text-areia">O prazo para colocar o nome terminou.</p>
      </div>
    );
  }

  const enviando = envio.fase === 'enviando';
  return (
    <form onSubmit={enviar} className={`${caixa} flex flex-col gap-4`}>
      <div>
        <label htmlFor="nome" className="rotulo text-areia">Nome completo</label>
        <input id="nome" name="nome" required minLength={5} maxLength={80} autoComplete="name" placeholder="Como está no documento" className={`${campo} mt-2`} />
      </div>
      <div>
        <label htmlFor="whatsapp" className="rotulo text-areia">WhatsApp</label>
        <input id="whatsapp" name="whatsapp" required inputMode="tel" autoComplete="tel-national" placeholder="(92) 99999-9999" value={whatsapp} onChange={(e) => setWhatsapp(mascara(e.target.value))} className={`${campo} mt-2`} />
      </div>
      <div>
        <label htmlFor="email" className="rotulo text-areia">E-mail</label>
        <input id="email" name="email" type="email" required maxLength={120} inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} placeholder="voce@email.com" className={`${campo} mt-2`} />
      </div>
      {/* campo-isca: fora da tela e fora da ordem do teclado; só robô preenche */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="site">Site</label>
        <input id="site" name="site" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-areia">
        <input type="checkbox" name="aceite" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#FF7A14]" />
        <span>Concordo em usar meu nome, WhatsApp e e-mail para a lista de entrada e os avisos desta festa.</span>
      </label>
      {envio.fase === 'erro' && (
        <p className="border border-ouro px-4 py-3 text-sm text-osso" role="alert">
          {envio.texto}
        </p>
      )}
      <button disabled={enviando} className="titulo mt-1 flex cursor-pointer items-center justify-center gap-3 bg-brasa px-6 py-5 text-xl text-noite transition-colors hover:bg-ouro disabled:cursor-wait disabled:opacity-70">
        {enviando ? (
          <>
            <span className="pontos flex gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 bg-noite" />)}
            </span>
            Enviando
          </>
        ) : (
          'Entrar na lista'
        )}
      </button>
    </form>
  );
}
