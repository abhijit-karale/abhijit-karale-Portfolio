"use client";
import React, { useState } from "react";
import { Layers, ArrowRight, Terminal, Copy, Check, Cpu, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/portfolioData";

const TABS = [
  ["Overview", "Overview"],
  ["specs", "Microarchitecture & Specs"],
  ["strategy", "Verification Strategy"],
  ["results", "Quantified Results"],
] as const;

interface ProjectCardProps {
  p: Project;
  onOpenCaseStudy?: (p: Project) => void;
}

export default function ProjectCard({ p, onOpenCaseStudy }: ProjectCardProps) {
  const [tab, setTab] = useState<string>("Overview");
  const [code, setCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Digital RTL & UVM":
        return { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/25" };
      case "Formal Verification":
        return { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25" };
      case "SoC & Protocols":
        return { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/25" };
      case "Embedded & Low-Power":
        return { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25" };
      default:
        return { text: "text-trace", bg: "bg-trace/10", border: "border-trace/25" };
    }
  };

  const theme = getCategoryTheme(p.category);

  const copyCode = () => {
    if (!p.code) return;
    navigator.clipboard?.writeText(p.code.src);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  };

  return (
    <article className="group flex flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#111828]/85 to-[#0A0E18]/90 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-trace/40 hover:shadow-2xl hover:shadow-trace/10 hover:-translate-y-1">
      {/* Top Bar: Category Pill & Case Study Launcher */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-mono text-xs font-semibold uppercase tracking-wider rounded-lg px-2.5 py-1 border ${theme.text} ${theme.bg} ${theme.border}`}
        >
          {p.category}
        </span>

        {onOpenCaseStudy && (
          <button
            onClick={() => onOpenCaseStudy(p)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-trace/30 bg-trace/[0.08] px-3 py-1 font-mono text-xs font-semibold text-trace transition duration-200 hover:border-trace hover:bg-trace/20 hover:shadow-sm"
          >
            <Layers size={13} />
            <span>Case Study &amp; Schematics</span>
          </button>
        )}
      </div>

      {/* Project Title */}
      <h3 className="mt-3.5 text-xl font-bold text-white tracking-tight group-hover:text-trace transition duration-200">
        {p.title}
      </h3>

      {/* Tech Stack Pills */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <span
            key={t}
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 font-mono text-xs text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        className="mt-5 flex flex-wrap gap-1.5 border-b border-white/[0.06] pb-2 text-xs font-mono"
      >
        {TABS.map(([k, l]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`rounded-lg px-2.5 py-1 font-medium transition duration-150 ${
              tab === k
                ? "bg-white/[0.1] text-white font-bold"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Tab Panel Content */}
      <div role="tabpanel" className="mt-4 flex-1 text-sm leading-relaxed min-h-[110px]">
        {tab === "Overview" && (
          <p className="text-slate-300 text-sm leading-relaxed">{p.overview}</p>
        )}

        {tab === "specs" && (
          <ul className="space-y-2 text-slate-300 text-sm">
            {p.specs.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="text-trace mt-1 text-xs">▸</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === "strategy" && (
          <ul className="space-y-2 text-slate-300 text-sm">
            {p.strategy.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="text-pass mt-1 text-xs">▸</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === "results" && (
          <div className="space-y-3.5">
            {p.results.map((r) => (
              <div key={r.label}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">{r.label}</span>
                  <span className="font-mono font-bold text-pass">{r.value}</span>
                </div>
                {r.pct !== undefined && (
                  <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-pass transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
        {p.code ? (
          <button
            onClick={() => setCode(!code)}
            aria-expanded={code}
            className="text-clock hover:text-amber-300 transition flex items-center gap-1.5 font-medium"
          >
            <Terminal size={13} />
            <span>{code ? "hide source" : `view source (${p.id}.${p.code.lang === "c" ? "c" : "sv"})`}</span>
          </button>
        ) : (
          <span className="text-slate-500 flex items-center gap-1">
            <Cpu size={12} /> ASIC &amp; FPGA Flow
          </span>
        )}

        {onOpenCaseStudy && (
          <button
            onClick={() => onOpenCaseStudy(p)}
            className="text-trace hover:text-cyan-300 transition inline-flex items-center gap-1 font-semibold"
          >
            <span>Architecture &amp; Proofs</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      {/* Code Snippet Drawer */}
      {code && p.code && (
        <div className="mt-3.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080B11] shadow-inner">
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-[11px] font-mono text-slate-400">
            <span>{p.id}.{p.code.lang === "c" ? "c" : "sv"}</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 hover:text-white transition"
            >
              {copiedCode ? <Check size={12} className="text-pass" /> : <Copy size={12} />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-xs text-slate-300 leading-relaxed">
            <code>{p.code.src}</code>
          </pre>
        </div>
      )}
    </article>
  );
}
