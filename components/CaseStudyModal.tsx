"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, Cpu, CheckCircle2, Copy, Check, ExternalLink, Layers, GitBranch, Terminal } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { RiscVDiagrams, FifoDiagrams, ApbDiagrams, MemCtrlDiagrams, EmbeddedDiagrams } from "./ProjectDiagrams";

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function CaseStudyModal({
  project,
  isOpen,
  onClose,
  triggerRef,
}: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<"diagrams" | "details" | "code">("diagrams");
  const [diagramType, setDiagramType] = useState<"microarch" | "testbench">("microarch");
  const [copied, setCopied] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Esc key & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus on close
    const prevActiveElement = triggerRef?.current || (document.activeElement as HTMLElement);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Focus close button initially
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      prevActiveElement?.focus?.();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen || !project) return null;

  const copyCode = () => {
    if (project.code?.src) {
      navigator.clipboard?.writeText(project.code.src);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderDiagram = () => {
    if (project.id === "riscv") {
      return <RiscVDiagrams type={diagramType} />;
    } else if (project.id === "fifo") {
      return <FifoDiagrams type={diagramType} />;
    } else if (project.id === "apb") {
      return <ApbDiagrams type={diagramType} />;
    } else if (project.id === "memctl") {
      return <MemCtrlDiagrams type={diagramType} />;
    } else {
      return <EmbeddedDiagrams type={diagramType} />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      aria-describedby="case-study-summary"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-black/80 transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-5xl max-h-[92vh] rounded-3xl border border-white/15 bg-gradient-to-b from-[#111828]/95 to-[#080B11]/95 shadow-2xl backdrop-blur-2xl overflow-hidden font-sans"
      >
        {/* Modal Silicon Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0E1424] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trace opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-trace"></span>
            </span>
            <div>
              <span className="font-mono text-[11px] font-bold text-trace uppercase tracking-wider">
                {project.category} // ARCHITECTURAL CASE STUDY
              </span>
              <h2 id="case-study-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close case study dialog"
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 hover:text-white hover:border-trace transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-edge/80 bg-die/90 px-6 py-2.5">
          <div className="flex gap-2">
            {[
              { key: "diagrams", label: "Architectural Diagrams", icon: <Layers size={14} /> },
              { key: "details", label: "Technical Deep-Dive", icon: <Cpu size={14} /> },
              { key: "code", label: "RTL / C Code Snippet", icon: <Terminal size={14} /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 font-mono text-xs transition ${
                  activeTab === tab.key
                    ? "bg-trace text-die font-bold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-card"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "diagrams" && (
            <div className="flex items-center gap-1 rounded-lg border border-edge bg-card p-1">
              <button
                onClick={() => setDiagramType("microarch")}
                className={`rounded px-2.5 py-1 font-mono text-xs transition ${
                  diagramType === "microarch"
                    ? "bg-trace/20 text-trace font-bold border border-trace/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Microarchitecture
              </button>
              <button
                onClick={() => setDiagramType("testbench")}
                className={`rounded px-2.5 py-1 font-mono text-xs transition ${
                  diagramType === "testbench"
                    ? "bg-pass/20 text-pass font-bold border border-pass/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Testbench (UVM / SVA)
              </button>
            </div>
          )}
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: DIAGRAMS */}
          {activeTab === "diagrams" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">
                  Interactive Vector Diagram // {diagramType.toUpperCase()} ARCHITECTURE
                </span>
                <span className="font-mono text-xs text-pass">High-Resolution Vector SVG</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-edge bg-die/95 p-4 shadow-inner">
                {renderDiagram()}
              </div>
              <div className="rounded-lg border border-edge bg-card p-4 text-xs text-slate-300 leading-relaxed font-mono">
                <span className="text-trace font-bold">ARCHITECTURAL NOTE: </span>
                {project.id === "riscv"
                  ? "5-stage pipeline resolves hazards through dedicated forwarding muxes (EX/MEM and MEM/WB stages) and stalls only on load-use data dependencies, delivering near 1.0 CPI on computation sequences."
                  : project.id === "fifo"
                  ? "Asynchronous Gray-code pointers are synchronized across dual clock domains using two-stage flip-flop synchronizers to guarantee zero metastability hazard."
                  : project.id === "apb"
                  ? "Standard AMBA-APB protocol state machine with deterministic single-cycle IDLE -> SETUP -> ACCESS progression and programmable wait-state support via PREADY."
                  : project.id === "memctl"
                  ? "Exhaustive JasperGold formal property verification guarantees that no write-collision, address out-of-bounds, or uninitialized read can ever occur across all infinite execution traces."
                  : "Preemptive FreeRTOS multitasking architecture isolating critical high-speed ADC and sensor communications from communication drivers."}
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL DEEP DIVE */}
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h3 className="font-mono text-xs font-bold text-trace uppercase tracking-wider">Project Overview</h3>
                <p id="case-study-summary" className="mt-1 text-slate-200 text-sm sm:text-base leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">Technology Stack</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded border border-edge bg-die px-3 py-1 font-mono text-xs text-trace">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs & Strategy Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-edge bg-die/80 p-5">
                  <h4 className="font-mono text-xs font-bold text-clock uppercase tracking-wider">
                    Microarchitecture & Specifications
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {project.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <span className="text-clock mt-1">▸</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-edge bg-die/80 p-5">
                  <h4 className="font-mono text-xs font-bold text-pass uppercase tracking-wider">
                    Verification / Implementation Strategy
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {project.strategy.map((st) => (
                      <li key={st} className="flex items-start gap-2">
                        <span className="text-pass mt-1">▸</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quantified Results */}
              <div>
                <h4 className="font-mono text-xs font-bold text-trace uppercase tracking-wider">
                  Quantified Engineering Results
                </h4>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {project.results.map((r) => (
                    <div key={r.label} className="rounded-lg border border-edge bg-die p-4">
                      <div className="text-xs text-slate-400">{r.label}</div>
                      <div className="mt-1 font-mono text-xl font-bold text-pass">{r.value}</div>
                      {r.pct !== undefined && (
                        <div className="mt-2 h-1.5 w-full rounded bg-edge overflow-hidden">
                          <div className="h-full rounded bg-pass" style={{ width: `${r.pct}%` }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CODE */}
          {activeTab === "code" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-clock">
                  {project.code?.lang === "c" ? "SOURCE FILE: driver.c" : `SOURCE FILE: ${project.id}.sv`}
                </span>
                {project.code && (
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1.5 rounded border border-edge bg-die px-3 py-1 font-mono text-xs text-slate-300 hover:text-trace hover:border-trace transition"
                  >
                    {copied ? <Check size={13} className="text-pass" /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy Source"}
                  </button>
                )}
              </div>

              {project.code ? (
                <pre className="overflow-x-auto rounded-xl border border-edge bg-die p-4 font-mono text-xs text-slate-200 leading-relaxed max-h-[500px]">
                  <code>{project.code.src}</code>
                </pre>
              ) : (
                <div className="rounded-xl border border-edge bg-die p-8 text-center text-slate-400 font-mono text-xs">
                  No source code snippet attached for this module. Refer to Architectural Diagrams tab.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="flex items-center justify-between border-t border-edge bg-die px-6 py-3 font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-pass" />
            Cadence Xcelium &bull; JasperGold &bull; SystemVerilog Verified
          </span>
          <button
            onClick={onClose}
            className="rounded border border-edge bg-card px-4 py-1.5 text-white hover:border-trace transition font-semibold"
          >
            Close Window (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
