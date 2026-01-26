"use client";

import { useEffect, useState } from "react";

// AJUSTE 1: Interface espelhando exatamente sua classe Java AIAnalysis
interface AIAnalysis {
  severity: string;
  recommendation: string;
}

export default function Projects() {
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking",
  );
  const [loading, setLoading] = useState(false);

  // AJUSTE 2: Estado agora aceita o objeto da interface para permitir o acesso às propriedades
  const [result, setResult] = useState<AIAnalysis | null>(null);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

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
    setResult(null);

    try {
      const response = await fetch(
        "https://api-springboot-ia.onrender.com/incidents",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            description: description,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro na resposta da API");
      }

      // AJUSTE 3: Armazena o objeto JSON completo no estado para o HTML ler
      setResult(data);

      setTitle("");
      setDescription("");
    } catch (error: unknown) {
      console.error("Erro detalhado:", error);
      // Mantemos o tratamento de erro conforme o original
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getResultStyles = (text: string) => {
    const isAlert = /crítico|segurança|bloqueio|invasão/i.test(text);
    return isAlert
      ? "bg-red-500/10 border-l-4 border-red-500 text-red-400"
      : "bg-sky-500/10 border-l-4 border-sky-500 text-sky-400";
  };

  const getSeverityColor = (severity?: string) => {
    const s = severity?.toUpperCase();
    if (s?.includes("HIGH") || s?.includes("CRITICAL") || s?.includes("ALTA"))
      return "border-red-500 bg-red-500/10 text-red-400";
    if (s?.includes("MEDIUM") || s?.includes("MÉDIA"))
      return "border-orange-500 bg-orange-500/10 text-orange-400";
    return "border-sky-500 bg-sky-500/10 text-sky-400";
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
                ? "bg-green-500 animate-pulse"
                : "bg-red-500"
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
        </div>

        <div className="p-8">
          <form onSubmit={handleClassify} className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Título do Incidente:
              </label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-sky-500 outline-none transition"
                placeholder="Ex: Tentativa de Invasão"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Descrição Detalhada:
              </label>
              <textarea
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-200 focus:border-sky-500 outline-none transition resize-none"
                placeholder="Descreva o que aconteceu..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
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
            <div
              className={`mt-6 p-4 border-l-4 rounded-r-lg transition-all duration-500 ${getSeverityColor(result.severity)}`}
            >
              <p className="font-mono text-[10px] uppercase font-bold mb-1">
                Análise da IA — {result.severity}
              </p>
              <p className="text-white font-medium">{result.recommendation}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
