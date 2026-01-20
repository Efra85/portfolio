import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-indigo-600/10 to-fuchsia-600/20 blur-3xl" />

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        <h1 className="text-6xl font-extrabold bg-linear-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          Efraim Corrêa Ortiz
        </h1>

        <p className="mt-6 text-2xl text-slate-300">
          Java • Microsserviços • Cloud • Inteligência Artificial
        </p>

        <p className="mt-8 max-w-3xl mx-auto text-slate-400">
          Desenvolvedor de soluções em Java com arquitetura de microsserviços em
          nuvem e aplicação estratégica de Inteligência Artificial.
        </p>

        <div className="mt-12 flex justify-center gap-6 flex-wrap">
          <Link
            href="/projects"
            className="px-8 py-4 rounded-xl bg-sky-500 text-slate-950 font-semibold hover:bg-sky-400 transition"
          >
            Ver Projetos
          </Link>

          <Link
            href="/ai"
            className="px-8 py-4 rounded-xl border border-slate-600 hover:border-sky-400 transition"
          >
            IA no Portfólio
          </Link>

          <a
            href="/cv/efraim-correa-ortiz.pdf"
            className="px-8 py-4 rounded-xl border border-slate-700 hover:border-fuchsia-400 transition"
            download
          >
            Download CV
          </a>
        </div>
      </section>
    </main>
  );
}
