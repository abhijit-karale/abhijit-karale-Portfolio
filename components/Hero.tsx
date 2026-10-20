"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowRight, Download, CheckCircle, ShieldCheck, Cpu, Sparkles, Terminal } from "lucide-react";
import { profile, metrics } from "@/data/portfolioData";

function MetricCard({ value, suffix, label, color, note }: (typeof metrics)[number]) {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setPercent(1), 250);
    return () => clearTimeout(timer);
  }, []);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value, 100) / 100;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1424]/80 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#121B30]/90 hover:-translate-y-1 hover:shadow-xl"
      style={{
        boxShadow: `0 8px 30px -10px ${color}15`,
      }}
    >
      <div className="flex items-center gap-4">
        {/* Progress Gauge */}
        <div className="relative shrink-0">
          <svg width="68" height="68" viewBox="0 0 68 68" aria-hidden className="shrink-0 -rotate-90">
            <circle
              cx="34"
              cy="34"
              r={radius}
              fill="none"
              stroke="#1E293B"
              strokeWidth="5"
            />
            <circle
              cx="34"
              cy="34"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress * percent)}
              style={{
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                filter: `drop-shadow(0 0 6px ${color}88)`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold" style={{ color }}>
            {value}{suffix}
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0">
          <div className="font-semibold text-sm text-slate-100 group-hover:text-white transition">
            {label}
          </div>
          {note && (
            <div className="mt-1 font-mono text-[11px] text-slate-400 leading-tight">
              {note}
            </div>
          )}
        </div>
      </div>

      {/* Subtle corner accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - b.left}px`);
    el.style.setProperty("--y", `${e.clientY - b.top}px`);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden border-b border-white/[0.06] bg-mesh-radial"
    >
      {/* Background Micro Grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Interactive Cursor Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(550px circle at var(--x, 50%) var(--y, 35%), rgba(0, 242, 254, 0.08), transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Bio, Titles, Actions */}
          <div className="lg:col-span-7">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-pass/30 bg-pass/10 px-4 py-1.5 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pass opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pass"></span>
              </span>
              <span>Open to RTL Design &amp; Verification Opportunities</span>
            </div>

            {/* Main Headings */}
            <div className="mt-5">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-clock">
                <Cpu size={14} className="text-clock" />
                <span>Silicon &amp; FPGA Engineering</span>
              </div>

              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-gradient-silver">
                {profile.name}
              </h1>

              <div className="mt-2.5 text-xl sm:text-2xl font-bold text-gradient-cyan">
                {profile.role}
              </div>
            </div>

            {/* Core Value Proposition */}
            <p className="mt-5 text-lg font-medium leading-relaxed text-slate-200">
              &ldquo;{profile.headline}&rdquo;
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400">
              Specialized in pipelined RV32I RISC-V cores, AMBA APB buses, and metastability-immune CDC FIFOs. Exhaustive SVA formal proofs in <strong className="text-slate-200 font-semibold">JasperGold</strong> and 95%+ functional coverage closure in <strong className="text-slate-200 font-semibold">Cadence Xcelium</strong>, bridged with 2+ years of hands-on physical board bring-up.
            </p>

            {/* High-Impact Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-trace to-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-trace/25 transition duration-200 hover:brightness-110 hover:shadow-trace/40 hover:-translate-y-0.5"
              >
                <span>Explore Silicon Projects</span>
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>

              <a
                href="./Abhijit_Karale_RTL_DV_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4.5 py-3 font-medium text-white backdrop-blur-md transition duration-200 hover:border-trace/60 hover:bg-white/[0.08] hover:text-trace hover:-translate-y-0.5"
              >
                <Download size={16} className="text-trace" />
                <span>Resume (RTL &amp; DV)</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-medium text-slate-200 backdrop-blur-md transition duration-200 hover:border-white/20 hover:text-white hover:-translate-y-0.5"
              >
                <Mail size={16} />
                <span>Contact</span>
              </a>

              <div className="flex items-center gap-2 pl-1">
                <a
                  aria-label="GitHub"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition duration-200 hover:border-trace/60 hover:text-trace hover:-translate-y-0.5"
                >
                  <Github size={18} />
                </a>
                <a
                  aria-label="LinkedIn"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition duration-200 hover:border-trace/60 hover:text-trace hover:-translate-y-0.5"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Quick Badges Footer */}
            <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="text-trace">📍</span> {profile.location}
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck size={14} className="text-pass" /> Cadence Xcelium &bull; JasperGold
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Cpu size={14} className="text-bus" /> STM32 &bull; FreeRTOS
              </span>
            </div>
          </div>

          {/* Right Column: Silicon Package Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Luxury Ambient Glow Halo */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-trace/25 via-bus/20 to-pass/25 blur-3xl opacity-75 -z-10" />

              {/* Silicon Package Container */}
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#141C2E]/90 to-[#0A0E18]/95 p-4 shadow-2xl backdrop-blur-xl">
                
                {/* Silicon Header Bar */}
                <div className="mb-3.5 flex items-center justify-between border-b border-white/[0.08] pb-3 px-1 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pass opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-pass"></span>
                    </span>
                    <span className="font-semibold text-white tracking-wide">SILICON DIE // RV32I</span>
                  </div>
                  <span className="rounded-full bg-pass/15 border border-pass/30 px-2.5 py-0.5 font-bold text-[10px] text-pass">
                    TAPE-OUT SIGN-OFF
                  </span>
                </div>

                {/* Photo Container */}
                <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080B11]">
                  <Image
                    src="/profile.jpg"
                    alt="Abhijit Karale - RTL & Verification Engineer"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                    className="object-cover object-top transition duration-700 ease-out group-hover:scale-105"
                  />

                  {/* High-Tech Reticle Overlays */}
                  <div className="pointer-events-none absolute top-3 left-3 rounded bg-black/60 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] text-trace border border-trace/30">
                    DIE_MAP // X0Y0
                  </div>
                  <div className="pointer-events-none absolute top-3 right-3 rounded bg-black/60 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] text-pass border border-pass/30">
                    UVM_PASS: 95%+
                  </div>

                  {/* Floating Glass Pill at Bottom */}
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-[#080B11]/85 p-3.5 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white tracking-wide">{profile.name}</div>
                        <div className="font-mono text-[11px] text-trace">RTL Design &amp; Verification</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="rounded-full border border-pass/40 bg-pass/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-pass shadow-sm">
                          100% FORMAL
                        </span>
                        <span className="mt-0.5 font-mono text-[9px] text-slate-400">JasperGold &bull; SVA</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* IC Specs Footer Bar */}
                <div className="mt-3.5 flex items-center justify-between px-1 font-mono text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-trace" /> Cadence Xcelium
                  </span>
                  <span className="text-slate-700">|</span>
                  <span className="text-slate-300">STM32 &bull; FreeRTOS</span>
                  <span className="text-slate-700">|</span>
                  <span className="text-clock font-medium">CDC Gray FIFOs</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Metrics Row */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
