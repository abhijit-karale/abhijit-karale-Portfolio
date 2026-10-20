"use client";
import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles, Download } from "lucide-react";
import { profile, skills } from "@/data/portfolioData";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export default function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-trace font-bold">AK_SILICON OS (v2.4-rtos-uvm) x86_64-verif</p>
          <p className="text-xs text-slate-400">
            Type <span className="text-pass font-semibold">help</span> to view available commands. Use <span className="text-clock font-semibold">Up/Down arrows</span> for command history.
          </p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    let resultNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        resultNode = (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-pass font-bold">SUPPORTED HARDWARE & SYSTEM COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-1 text-slate-300">
              <div><span className="text-trace font-semibold">help</span> - Display list of available commands</div>
              <div><span className="text-trace font-semibold">ls</span> - List directory contents & files</div>
              <div><span className="text-trace font-semibold">cat contact_info.json</span> - View contact details</div>
              <div><span className="text-trace font-semibold">cat skills.json</span> - View classified skills & levels</div>
              <div><span className="text-trace font-semibold">open projects</span> - Navigate to portfolio projects</div>
              <div><span className="text-trace font-semibold">cat resume</span> - Get links to both PDF resumes</div>
              <div><span className="text-trace font-semibold">whoami</span> - Display engineer profile & headline</div>
              <div><span className="text-trace font-semibold">clear</span> - Clear terminal output buffer</div>
              <div><span className="text-trace font-semibold">exit</span> - Close this terminal session</div>
            </div>
          </div>
        );
        break;

      case "ls":
        resultNode = (
          <div className="flex flex-wrap gap-4 font-mono text-xs">
            <span className="text-pass font-semibold">contact_info.json</span>
            <span className="text-pass font-semibold">skills.json</span>
            <span className="text-clock font-semibold">projects/</span>
            <span className="text-trace font-semibold">Abhijit_Karale_RTL_DV_Resume.pdf</span>
            <span className="text-trace font-semibold">Abhijit_Karale_Embedded_Resume.pdf</span>
            <span className="text-slate-400">README.md</span>
          </div>
        );
        break;

      case "cat":
        if (arg === "contact_info.json" || arg === "./contact_info.json") {
          resultNode = (
            <pre className="overflow-x-auto text-xs text-trace/90 bg-die/80 p-3 rounded border border-edge">
{`{
  "name": "${profile.name}",
  "role": "${profile.role}",
  "email": "${profile.email}",
  "phone": "${profile.phone}",
  "location": "${profile.location}",
  "github": "${profile.github}",
  "linkedin": "${profile.linkedin}",
  "status": "Available for RTL / ASIC / Verification Roles"
}`}
            </pre>
          );
        } else if (arg === "skills.json" || arg === "./skills.json") {
          resultNode = (
            <pre className="overflow-x-auto text-xs text-pass/90 bg-die/80 p-3 rounded border border-edge max-h-60">
{JSON.stringify(
  skills.map((s) => ({
    subsystem: s.title,
    proficiency_score: `${s.level}%`,
    technologies: s.items,
  })),
  null,
  2
)}
            </pre>
          );
        } else if (arg.includes("resume")) {
          resultNode = (
            <div className="space-y-2 p-3 bg-die/80 rounded border border-edge text-xs">
              <p className="text-slate-300 font-semibold">Available resume downloads:</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/Abhijit_Karale_RTL_DV_Resume.pdf"
                  download
                  className="inline-flex items-center gap-1.5 rounded border border-trace bg-trace/10 px-3 py-1.5 font-mono text-trace hover:bg-trace/20 transition"
                >
                  <Download size={13} /> RTL / DV Engineer Resume.pdf
                </a>
                <a
                  href="/Abhijit_Karale_Embedded_Resume.pdf"
                  download
                  className="inline-flex items-center gap-1.5 rounded border border-pass bg-pass/10 px-3 py-1.5 font-mono text-pass hover:bg-pass/20 transition"
                >
                  <Download size={13} /> Embedded Systems Resume.pdf
                </a>
              </div>
            </div>
          );
        } else if (arg === "readme.md") {
          resultNode = (
            <p className="text-xs text-slate-300">
              # Abhijit Karale — Silicon Portfolio (Next.js 14 + Tailwind). Edit data in data/portfolioData.ts.
            </p>
          );
        } else {
          resultNode = (
            <p className="text-xs text-rose-400">
              cat: {arg || "[missing file]"}: No such file or directory. Try <span className="underline">ls</span> to view files.
            </p>
          );
        }
        break;

      case "open":
      case "goto":
      case "cd":
        if (arg === "projects" || arg === "./projects" || arg === "projects/") {
          resultNode = <p className="text-xs text-pass">Navigating to #projects section...</p>;
          setTimeout(() => {
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            onClose();
          }, 350);
        } else if (arg === "about" || arg === "skills" || arg === "career" || arg === "contact") {
          resultNode = <p className="text-xs text-pass">Navigating to #{arg} section...</p>;
          setTimeout(() => {
            const el = document.getElementById(arg);
            if (el) el.scrollIntoView({ behavior: "smooth" });
            onClose();
          }, 350);
        } else {
          resultNode = (
            <p className="text-xs text-rose-400">
              open: cannot open &apos;{arg}&apos;. Available targets: projects, skills, career, about, contact.
            </p>
          );
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "whoami":
        resultNode = (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <p className="text-trace font-bold">{profile.name}</p>
            <p className="text-slate-400">{profile.role}</p>
            <p className="text-slate-300 pt-1 leading-relaxed">&ldquo;{profile.headline}&rdquo;</p>
            <p className="text-pass">Verification Intern @ The Silicon Sandbox | Ex-Sr Embedded Firmware @ Velaxtra</p>
          </div>
        );
        break;

      case "exit":
      case "quit":
        onClose();
        return;

      case "date":
        resultNode = <p className="text-xs font-mono text-slate-300">{new Date().toString()}</p>;
        break;

      case "uptime":
        resultNode = (
          <p className="text-xs font-mono text-pass">
            silicon_clock: 100 MHz PLL active | uptime: 99.999% | 0 timing violations | JasperGold: 100% proofs pass
          </p>
        );
        break;

      default:
        resultNode = (
          <p className="text-xs text-rose-400">
            zsh: command not found: {cmd}. Type <span className="text-trace underline font-semibold">help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output: resultNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputVal("");
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm bg-black/60 transition-all duration-300"
    >
      <div
        className={`relative flex flex-col w-full bg-die border border-edge shadow-2xl transition-all duration-300 font-mono ${
          isExpanded
            ? "h-full sm:h-[95vh] sm:max-w-5xl rounded-none sm:rounded-xl"
            : "h-[85vh] sm:h-[650px] sm:max-w-3xl rounded-t-2xl sm:rounded-xl"
        }`}
      >
        {/* Top Silicon Window Bar */}
        <div className="flex items-center justify-between border-b border-edge bg-card px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                aria-label="Close terminal window"
                className="h-3 w-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition"
              />
              <button
                onClick={() => setHistory([])}
                aria-label="Clear terminal buffer"
                className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition"
              />
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Toggle expand terminal"
                className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition"
              />
            </div>
            <div className="ml-3 flex items-center gap-2 text-xs font-semibold text-slate-300" id="terminal-title">
              <TerminalIcon size={14} className="text-trace" />
              <span>abhijit@silicon-host: ~</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Restore terminal window" : "Maximize terminal window"}
              className="p-1 hover:text-white transition"
            >
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close terminal drawer"
              className="p-1 hover:text-white transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Screen / Output Log */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm cursor-text scrollbar-thin scrollbar-thumb-edge"
        >
          {history.map((h, i) => (
            <div key={i} className="space-y-1.5">
              {h.command !== "welcome" && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-pass">abhijit@silicon-host:~$</span>
                  <span className="text-white font-semibold">{h.command}</span>
                </div>
              )}
              <div>{h.output}</div>
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-pass shrink-0">abhijit@silicon-host:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal input prompt"
              className="flex-1 bg-transparent text-white outline-none font-mono caret-trace"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Quick Commands Helper Bar */}
        <div className="border-t border-edge/80 bg-die/95 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500">Quick:</span>
            {["help", "ls", "cat contact_info.json", "cat skills.json", "open projects", "cat resume", "clear"].map(
              (btnCmd) => (
                <button
                  key={btnCmd}
                  onClick={() => {
                    executeCommand(btnCmd);
                    setInputVal("");
                  }}
                  className="rounded border border-edge bg-card px-2 py-0.5 hover:border-trace/60 hover:text-trace transition"
                >
                  {btnCmd}
                </button>
              )
            )}
          </div>
          <span className="text-slate-500 hidden sm:inline">ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
