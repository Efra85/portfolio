"use client";

import { useEffect, useState } from "react";

export default function Projects() {
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking",
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  // Verifica se a API está online no Render ao carregar a página
  useEffect(() => {
    fetch("https://api-springboot-ia.onrender.com/")
      .then((res) =>
        res.ok ? setApiStatus("online") : setApiStatus("offline"),
      )
      .catch(() => setApiStatus("offline"));
  }, []);

  const handleClassify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null); // Limpa resultado anterior

    try {
      const response = await fetch(
        "https://api-springboot-ia.onrender.com/api/incidents",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }), // Verifique se o Java espera "description" ou "descricao"
        },
      );

      if (!response.ok) throw new Error("Erro na resposta da API");

      const data = await response.json();
      // Ajuste 'data.classification' para o nome do campo retornado pelo seu JSON no Java
      setResult(data.classification || "Incidente processado com sucesso!");
    } catch (error) {
      console.error("Erro ao testar API:", error);
      setResult(
        "Erro ao conectar com a API Java. Verifique o console ou o status da API.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-12">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold text-sky-400">| Projetos Java |</h2>
          <h3 className="text-2xl font-semibold text-white/90 mt-2">
            API Rest + Spring Boot + IA
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              apiStatus === "online"
                ? "bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"
                : apiStatus === "offline"
                  ? "bg-red-500"
                  : "bg-yellow-500"
            }`}
          />
          <span className="text-xs font-mono font-bold text-slate-300 uppercase">
            API: {apiStatus}
          </span>
        </div>
      </div>

      <section className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-900/80">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-sky-400">🔹</span> Incident AI Classifier
          </h3>
          <p className="mt-2 text-slate-400">
            API REST desenvolvida em Spring Boot para registro e classificação
            de incidentes de segurança, com integração de Inteligência
            Artificial e mecanismo de fallback resiliente...
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleClassify} className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Descreva o incidente para a IA analisar:
              </label>
              <textarea
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-200 focus:border-sky-500 outline-none transition resize-none"
                placeholder="Ex: Servidor de banco de dados parou de responder..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <button
              type="submit"
              disabled={loading || apiStatus === "offline"}
              className="w-full md:w-auto px-10 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-lg transition-all"
            >
              {loading ? "Analisando..." : "Testar API"}
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-sky-500/10 border-l-4 border-sky-500 rounded-r-lg">
              <p className="text-sky-400 font-mono text-[10px] uppercase font-bold mb-1">
                Resultado da API:
              </p>
              <p className="text-white font-medium">{result}</p>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-800 grid md:grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-4 border-b border-slate-800 pb-2">
                🛠 Stack de Integração
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Next.js Fetch", "Spring CrossOrigin", "JSON API"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-slate-800 text-sky-400 text-xs rounded border border-slate-700"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end">
              <a
                href="https://github.com/Efra85/API-SpringBoot-IA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 transition-colors font-medium flex items-center gap-1"
              >
                Ver código-fonte do Backend <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
