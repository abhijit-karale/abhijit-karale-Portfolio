"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import SkillGrid from "@/components/SkillGrid";
import { DualAdvantage, Timeline, Certs, ContactTerminal } from "@/components/Sections";
import WaveformDivider from "@/components/WaveformDivider";
import CanvasBackground from "@/components/CanvasBackground";
import TerminalDrawer from "@/components/TerminalDrawer";
import { Terminal, ArrowUp, Github, Linkedin, Mail, Download, ShieldCheck } from "lucide-react";
import { profile } from "@/data/portfolioData";

export default function Page() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
      {/* Animated Wafer/PCB-Trace Canvas Background with Cursor Proximity Glow */}
      <CanvasBackground />

      {/* Top Navbar with Glassmorphism, Status Indicator & Dual Resume Drops */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Waveform Divider 1: System Clock Pulses */}
        <WaveformDivider variant="clock" label="SYS_CLK_100MHz // DIGITAL_LOGIC_POSEDGE" />

        {/* Dual Advantage: Physical HW Bring-Up <-> RTL Verification */}
        <DualAdvantage />

        {/* Waveform Divider 2: AMBA APB Bus Transactions */}
        <WaveformDivider variant="bus" label="AMBA_APB_INTERCONNECT // 32-BIT_BUS_TRANSFERS" />

        {/* Technical Projects with Inline SVG Case Study Modals */}
        <Projects />

        {/* Waveform Divider 3: FSM Transitions */}
        <WaveformDivider variant="fsm" label="CDC_GRAY_SYNC // METASTABILITY_IMMUNE_FLOPS" />

        {/* Skill Chips with Proficiency Levels & Register-Map Table View */}
        <SkillGrid />

        {/* Waveform Divider 4: Analog to Digital SPICE Signal */}
        <WaveformDivider variant="analog" label="SPICE_ANALOG_AFE // MOSFET_CHARACTERIZATION_FLOW" />

        {/* Professional Career & Education Journey */}
        <Timeline />

        {/* Waveform Divider 5: Verification Sign-Off */}
        <WaveformDivider variant="clock" label="TAPE_OUT_READY // 100%_JASPERGOLD_PROOFS" />

        {/* Professional Certifications */}
        <Certs />

        {/* Contact Terminal & Interactive Dispatcher */}
        <ContactTerminal />
      </main>

      {/* Modern Executive Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#080B11]/95 py-12 text-slate-400 font-mono text-xs">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            {/* Left Brand Identity */}
            <div className="flex items-center gap-3 text-center md:text-left">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pass opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pass"></span>
              </span>
              <div>
                <div className="text-white font-bold tracking-tight text-sm">
                  {profile.name}
                </div>
                <div className="text-slate-500 text-[11px]">
                  RTL Design &amp; Verification Engineer &bull; Ahmedabad &amp; Bengaluru, India
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-slate-400">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-trace transition flex items-center gap-1.5"
              >
                <Github size={15} />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-trace transition flex items-center gap-1.5"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-trace transition flex items-center gap-1.5"
              >
                <Mail size={15} />
                <span>Email</span>
              </a>
              <button
                onClick={() => setTerminalOpen(true)}
                className="hover:text-trace transition flex items-center gap-1.5 text-trace bg-trace/10 border border-trace/25 px-2.5 py-1 rounded-lg"
              >
                <Terminal size={14} />
                <span>$ terminal</span>
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} {profile.name}. All Rights Reserved. Built for Silicon &amp; Hardware Engineering.
            </div>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-slate-300 hover:text-trace hover:border-trace/40 transition"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </footer>

      {/* Working Silicon Terminal Drawer */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}
