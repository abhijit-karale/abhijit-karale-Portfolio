"use client";
import React, { useState } from "react";
import {
  Cpu,
  CircuitBoard,
  BadgeCheck,
  Copy,
  Check,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  FileText,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  Download,
  Terminal,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { timeline, certifications, profile, JourneyItem } from "@/data/portfolioData";

/* =========================================================================
   1. DUAL ADVANTAGE COMPONENT
   ========================================================================= */
export function DualAdvantage() {
  const [activeTab, setActiveTab] = useState<"both" | "hw" | "rtl">("both");

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-trace">
            Architectural Synergy
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-gradient-silver">
            From the Bench to the Testbench
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl text-base leading-relaxed">
            I know how timing misbehaves on real physical silicon and multi-layer PCBs, and I leverage that deep physical intuition when architecting SystemVerilog assertions, CDC synchronizers, and UVM covergroups.
          </p>
        </div>

        {/* Filter view pills */}
        <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#0E1422] p-1 font-mono text-xs self-start md:self-auto">
          {[
            { id: "both", label: "Full Synergy" },
            { id: "rtl", label: "RTL & DV" },
            { id: "hw", label: "HW & Bring-Up" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`rounded-lg px-3 py-1.5 transition duration-200 ${
                activeTab === tab.id
                  ? "bg-trace text-slate-950 font-bold shadow-md shadow-trace/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Card 1: Physical Hardware & Firmware Bring-up */}
        {(activeTab === "both" || activeTab === "hw") && (
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#111828]/90 to-[#0A0E18]/90 p-7 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-2.5 text-amber-400">
                  <CircuitBoard size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Physical Hardware &amp; Bring-Up
                  </h3>
                  <div className="font-mono text-xs text-amber-400 font-medium">
                    2+ Years Production Embedded Hardware
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                BOARD-LEVEL
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Extensive hands-on lab experience debugging multi-layer industrial PCBs, isolating timing glitches, and authoring bare-metal drivers on ARM Cortex-M microcontrollers.
            </p>

            <div className="mt-5 space-y-2.5 font-mono text-xs text-slate-300">
              {[
                "Oscilloscope & logic-analyzer led root-cause signal isolation",
                "UART, SPI, I2C, ADC, PWM driver bring-up on FreeRTOS",
                "Ultra-low-power BLE (Nordic nRF52) System ON/OFF wake tuning",
                "Schematic-to-board correlation & industrial SCR firing package repair",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-2.5">
                  <span className="text-amber-400 mt-0.5">▸</span>
                  <span className="leading-snug">{pt}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
              {["STM32", "FreeRTOS", "nRF52840", "Oscilloscope", "Logic Analyzer", "PCB Debug"].map((t) => (
                <span key={t} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-amber-300/90">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Card 2: RTL Microarchitecture & Formal Verification */}
        {(activeTab === "both" || activeTab === "rtl") && (
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#111828]/90 to-[#0A0E18]/90 p-7 backdrop-blur-xl transition-all duration-300 hover:border-trace/40 hover:shadow-2xl hover:shadow-trace/10">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-trace/10 border border-trace/25 p-2.5 text-trace">
                  <Cpu size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    RTL Design &amp; Verification
                  </h3>
                  <div className="font-mono text-xs text-trace font-medium">
                    Silicon Sign-Off: UVM &amp; JasperGold
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-trace bg-trace/10 px-2 py-0.5 rounded border border-trace/20">
                SILICON-DIE
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Designing high-performance pipelined compute cores, protocol interfaces, and closed-loop verification architectures ensuring 100% bug elimination before tape-out.
            </p>

            <div className="mt-5 space-y-2.5 font-mono text-xs text-slate-300">
              {[
                "5-stage pipelined RV32I RISC-V with 95%+ UVM coverage closure",
                "Exhaustive SVA formal proofs in JasperGold for memory controllers",
                "Dual-clock Gray-code CDC FIFOs with 2-flop metastability immunity",
                "AMBA APB interconnects & synthesis to timing closure on FPGA/ASIC",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-2.5">
                  <span className="text-trace mt-0.5">▸</span>
                  <span className="leading-snug">{pt}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
              {["SystemVerilog", "UVM", "Cadence Xcelium", "JasperGold", "RISC-V", "SVA", "CDC"].map((t) => (
                <span key={t} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-cyan-300/90">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================================
   2. TIMELINE (CAREER & EDUCATION) COMPONENT
   ========================================================================= */
export function Timeline() {
  const [filter, setFilter] = useState<"all" | "experience" | "education" | "leadership">("all");

  const filteredItems = timeline.filter((t) => {
    if (filter === "all") return true;
    return t.category === filter;
  });

  const getIcon = (item: JourneyItem) => {
    if (item.category === "education") return <GraduationCap size={16} className="text-bus" />;
    if (item.category === "leadership") return <Award size={16} className="text-clock" />;
    return <Briefcase size={16} className="text-trace" />;
  };

  const getTypeBadgeClass = (type: JourneyItem["type"]) => {
    switch (type) {
      case "Internship":
        return "border-trace/30 bg-trace/10 text-trace";
      case "Full-time":
        return "border-pass/30 bg-pass/10 text-pass";
      case "Degree":
      case "Diploma":
        return "border-bus/30 bg-bus/10 text-purple-300";
      case "Leadership":
        return "border-clock/30 bg-clock/10 text-amber-300";
      default:
        return "border-white/10 text-slate-400";
    }
  };

  const getNodeColor = (item: JourneyItem) => {
    if (item.category === "education") return "#8B5CF6";
    if (item.category === "leadership") return "#F59E0B";
    return "#00F2FE";
  };

  return (
    <section id="career" className="relative mx-auto max-w-5xl px-5 py-20 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-trace font-semibold">
            Track Record &amp; Academics
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-gradient-silver">
            Career &amp; Education Journey
          </h2>
          <p className="mt-2 text-slate-400 max-w-xl text-base leading-relaxed">
            From hands-on industrial embedded firmware and hardware bring-up to advanced digital RTL design, SystemVerilog verification, and UVM methodologies.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-[#0E1422] p-1 self-start md:self-auto font-mono text-xs">
          {[
            { key: "all", label: "All Journey", count: timeline.length },
            { key: "experience", label: "Experience", count: timeline.filter((i) => i.category === "experience").length },
            { key: "education", label: "Education", count: timeline.filter((i) => i.category === "education").length },
            { key: "leadership", label: "Leadership", count: timeline.filter((i) => i.category === "leadership").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`rounded-lg px-3 py-1.5 transition duration-200 ${
                filter === tab.key
                  ? "bg-trace text-slate-950 font-bold shadow-md shadow-trace/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label} <span className="opacity-70">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 relative border-l-2 border-white/[0.08] pl-6 sm:pl-9 space-y-10">
        {filteredItems.map((t) => (
          <div key={t.id} className="relative group">
            {/* Timeline Node Icon */}
            <div
              className="absolute -left-[35px] sm:-left-[47px] top-1.5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 bg-[#0E1424] shadow-lg transition duration-300 group-hover:scale-110"
              style={{ borderColor: getNodeColor(t) }}
            >
              {getIcon(t)}
            </div>

            {/* Journey Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1424]/85 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#121B30]/90 hover:shadow-xl">
              {/* Header: Title, Org & Type Badges */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {t.title}
                    </h3>
                    <span className={`rounded-lg border px-2.5 py-0.5 font-mono text-xs font-semibold ${getTypeBadgeClass(t.type)}`}>
                      {t.type}
                    </span>
                    {t.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-pass/40 bg-pass/15 px-3 py-0.5 font-mono text-xs font-bold text-pass">
                        <span className="h-1.5 w-1.5 rounded-full bg-pass animate-ping" /> Present
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 text-base font-semibold text-slate-200">
                    {t.org}
                  </div>
                </div>

                {t.grade && (
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-pass/30 bg-pass/10 px-3 py-1 font-mono text-xs font-bold text-pass">
                      <CheckCircle2 size={14} /> {t.grade}
                    </span>
                  </div>
                )}
              </div>

              {/* Meta: Period, Duration, Location */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-slate-400 border-b border-white/[0.06] pb-3">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Calendar size={13} className="text-trace" />
                  {t.when} {t.duration ? `· ${t.duration}` : ""}
                </span>
                <span className="text-slate-700">•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400" />
                  {t.location} {t.mode ? `(${t.mode})` : ""}
                </span>
              </div>

              {/* Achievements / Points */}
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-trace mt-1 text-xs">▸</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* Skill Tags */}
              {t.skills && t.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/[0.04]">
                  {t.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[11px] text-slate-300 hover:border-trace/30 transition"
                    >
                      #{s}
                    </span>
                  ))}
                </div>
              )}

              {/* Attached Credential / Document */}
              {t.credential && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-trace/30 bg-trace/[0.06] px-3.5 py-1.5 font-mono text-xs text-trace">
                  <FileText size={14} />
                  <span>{t.credential}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   3. CERTS COMPONENT
   ========================================================================= */
export function Certs() {
  return (
    <section id="certs" className="border-y border-white/[0.06] bg-[#0A0E18]/80 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-pass">
              Verified Qualifications
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-gradient-silver">
              Professional Certifications
            </h2>
            <p className="mt-2 text-slate-400 max-w-xl text-base">
              Accredited coursework and industry-recognized certifications spanning ASIC verification, RISC-V, and industrial embedded architectures.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="group flex gap-3.5 rounded-2xl border border-white/[0.08] bg-[#0E1424]/80 p-5 backdrop-blur-md transition-all duration-300 hover:border-pass/40 hover:bg-[#121B30] hover:-translate-y-1 hover:shadow-xl hover:shadow-pass/5"
            >
              <div className="mt-0.5 rounded-xl bg-pass/10 p-2 text-pass border border-pass/20 shrink-0 group-hover:scale-105 transition">
                <BadgeCheck size={20} />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-white text-base tracking-tight group-hover:text-pass transition">
                  {c.name}
                </div>
                <div className="mt-1 font-mono text-xs text-slate-400">
                  {c.issuer}
                </div>
                {c.note && (
                  <div className="mt-2 inline-block rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] text-amber-300 font-medium">
                    {c.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   4. EXECUTIVE CONTACT SUITE
   ========================================================================= */
export function ContactTerminal() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("interview");

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard?.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const templates: Record<string, { label: string; subject: string; body: string }> = {
    interview: {
      label: "Schedule an Interview",
      subject: `RTL / Verification Role Discussion - ${profile.name}`,
      body: `Hi Abhijit,\n\nI reviewed your portfolio and was impressed with your work in RV32I RTL design, UVM coverage closure, and JasperGold formal proofs. We would like to connect with you regarding an engineering opportunity.\n\nBest regards,`,
    },
    fulltime: {
      label: "Full-Time Opportunity",
      subject: `Full-Time RTL / Embedded Role Inquiry`,
      body: `Hi Abhijit,\n\nWe have an opening for an RTL Design & Verification Engineer that matches your skill set. Let's schedule a call to discuss the role details.\n\nBest regards,`,
    },
    consult: {
      label: "Technical Collaboration",
      subject: `Technical Consultation / Collaboration`,
      body: `Hi Abhijit,\n\nI came across your silicon projects and would like to discuss a technical collaboration or consulting project.\n\nBest regards,`,
    },
  };

  const active = templates[selectedTemplate];

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-trace">
          Connect &amp; Collaborate
        </span>
        <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-gradient-silver">
          Get in Touch
        </h2>
        <p className="mt-2 text-slate-400 text-base">
          Actively available for RTL Design, UVM Verification, and Embedded Systems engineering roles in Bangalore, Ahmedabad, and remote global teams.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
        
        {/* Left Column: Direct Contact Card (7 cols) */}
        <div className="lg:col-span-6 rounded-3xl border border-white/[0.08] bg-[#0E1424]/90 p-7 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="rounded-2xl bg-trace/10 border border-trace/25 p-3 text-trace">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Direct Contact Hub
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Primary channels for hiring managers &amp; recruiters
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Email item */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-trace/40">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/[0.05] p-2 text-trace">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Email Address</div>
                  <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-white hover:text-trace transition">
                    {profile.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(profile.email, "email")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-300 hover:text-white hover:border-trace transition self-start sm:self-auto"
              >
                {copiedEmail ? (
                  <>
                    <Check size={13} className="text-pass" />
                    <span className="text-pass">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone item */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-pass/40">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/[0.05] p-2 text-pass">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Mobile Phone</div>
                  <a href={`tel:${profile.phone}`} className="text-sm font-semibold text-white hover:text-pass transition">
                    {profile.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(profile.phone, "phone")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-300 hover:text-white hover:border-pass transition self-start sm:self-auto"
              >
                {copiedPhone ? (
                  <>
                    <Check size={13} className="text-pass" />
                    <span className="text-pass">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Location item */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="rounded-xl bg-white/[0.05] p-2 text-clock">
                <MapPin size={16} />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">Current Base &amp; Relocation</div>
                <div className="text-sm font-semibold text-white">
                  Ahmedabad &amp; Bengaluru, India &bull; Open to Onsite / Relocation
                </div>
              </div>
            </div>
          </div>

          {/* Quick Resume Download Cards */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold mb-3">
              Download Verified Resumes:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/Abhijit_Karale_RTL_DV_Resume.pdf"
                download
                className="flex items-center gap-2.5 rounded-xl border border-trace/30 bg-trace/[0.06] p-3 text-xs text-trace hover:bg-trace/15 transition font-mono font-medium group"
              >
                <Download size={15} className="group-hover:translate-y-0.5 transition" />
                <span>RTL &amp; DV Resume (PDF)</span>
              </a>
              <a
                href="/Abhijit_Karale_Embedded_Resume.pdf"
                download
                className="flex items-center gap-2.5 rounded-xl border border-pass/30 bg-pass/[0.06] p-3 text-xs text-pass hover:bg-pass/15 transition font-mono font-medium group"
              >
                <Download size={15} className="group-hover:translate-y-0.5 transition" />
                <span>Embedded Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Pre-composed Message Dispatcher (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl border border-white/[0.08] bg-[#0A0E18]/95 p-7 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2.5">
              <Terminal size={18} className="text-trace" />
              <span className="font-mono text-xs font-bold text-white tracking-wide">
                DISPATCH_MESSAGE.SH
              </span>
            </div>
            <span className="font-mono text-[10px] text-pass font-bold bg-pass/15 border border-pass/30 px-2 py-0.5 rounded-full">
              INTERACTIVE
            </span>
          </div>

          <div className="mt-5">
            <div className="text-xs font-mono text-slate-400 mb-2.5">
              Select inquiry template:
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(templates).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`rounded-xl px-3 py-1.5 font-mono text-xs transition duration-200 ${
                    selectedTemplate === key
                      ? "border border-trace bg-trace/15 text-trace font-bold shadow-sm"
                      : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Email Preview Box */}
            <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#080B11] p-4 font-mono text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-slate-500 border-b border-white/[0.06] pb-2">
                <span>To: {profile.email}</span>
                <span className="text-trace">Protocol: mailto</span>
              </div>
              <div className="text-slate-400 pt-1">
                <strong className="text-white">Subject:</strong> {active.subject}
              </div>
              <pre className="mt-2 font-sans text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                {active.body}
              </pre>
            </div>

            {/* Launch Button */}
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(active.subject)}&body=${encodeURIComponent(active.body)}`}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-trace to-cyan-400 py-3.5 font-semibold text-slate-950 shadow-lg shadow-trace/20 transition duration-200 hover:brightness-110 hover:-translate-y-0.5"
            >
              <Send size={16} />
              <span>Send Pre-Filled Email Now</span>
            </a>

            <div className="mt-3 text-center font-mono text-[11px] text-slate-500">
              Opens your default mail app with the formatted message above
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
