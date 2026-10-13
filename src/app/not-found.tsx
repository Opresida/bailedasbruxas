import Link from 'next/link';

// Endereço que não existe: volta para a página da festa.
export default function NaoEncontrada() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center px-5 py-16 text-center" style={{ background: 'radial-gradient(60% 50% at 50% 40%, #3a1206 0%, #07040a 72%)' }}>
      <p className="rotulo flex items-center gap-3 text-brasa">
        <span className="olho" aria-hidden />
        Página não encontrada
      </p>
      <h1 className="gotica fogo mt-4 text-7xl sm:text-8xl">Sumiu na noite</h1>
      <p className="mt-4 text-lg text-areia">Este endereço não existe. A festa está na página inicial.</p>
      <Link href="/" className="titulo mt-8 inline-flex bg-brasa px-7 py-4 text-xl text-noite hover:bg-ouro">
        Voltar para a festa
      </Link>
    </main>
  );
}
