"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Terminal, Download, Menu, X, ChevronDown, FileText, CheckCircle2, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolioData";

const links = [
  ["about", "Advantage"],
  ["projects", "Projects"],
  ["skills", "Skills & Regs"],
  ["career", "Career"],
  ["certs", "Certs"],
  ["contact", "Contact"],
];

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const resumeMenuRef = useRef<HTMLDivElement | null>(null);

  // Monitor scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(e.target as Node)) {
        setResumeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#080B11]/90 backdrop-blur-xl shadow-lg shadow-black/30"
          : "border-b border-white/[0.04] bg-[#080B11]/75 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5" aria-label="Primary">
        {/* Brand / Profile Avatar */}
        <a href="#top" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-trace/30 p-0.5 transition duration-300 group-hover:border-trace group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/profile.jpg"
                alt={profile.name}
                width={40}
                height={40}
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>
            {/* Online Green Indicator */}
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-pass ring-2 ring-[#080B11]" />
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white transition duration-200 group-hover:text-trace flex items-center gap-1.5">
              {profile.name}
              <span className="inline-block text-[10px] font-mono font-normal text-slate-500 border border-slate-700/60 rounded px-1.5 py-0.2">
                RTL / DV
              </span>
            </span>
            <span className="font-mono text-[11px] text-slate-400 group-hover:text-slate-300 transition">
              Silicon Design &amp; Verification
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {links.map(([id, label]) => (
            <li key={id}>
              <a
                className="rounded-lg px-3.5 py-1.5 text-slate-300 transition duration-200 hover:text-white hover:bg-white/[0.06]"
                href={`#${id}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Download Resume Dropdown */}
          <div className="relative" ref={resumeMenuRef}>
            <button
              onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-xs text-slate-200 transition duration-200 hover:border-trace/50 hover:bg-white/[0.06] hover:text-white shadow-sm"
              aria-expanded={resumeDropdownOpen}
              aria-haspopup="true"
            >
              <Download size={14} className="text-trace" />
              <span className="font-medium">Resume</span>
              <ChevronDown
                size={13}
                className={`transition duration-200 text-slate-400 ${resumeDropdownOpen ? "rotate-180 text-trace" : ""}`}
              />
            </button>

            {resumeDropdownOpen && (
              <div className="absolute right-0 mt-2.5 w-72 rounded-2xl border border-white/10 bg-[#0E1422]/95 p-2 shadow-2xl backdrop-blur-xl z-50 font-mono text-xs space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/[0.06]">
                  Download Verified Resumes
                </div>
                <a
                  href="./Abhijit_Karale_RTL_DV_Resume.pdf"
                  download
                  onClick={() => setResumeDropdownOpen(false)}
                  className="flex items-start gap-3 rounded-xl p-2.5 text-slate-200 hover:bg-white/[0.06] hover:text-trace transition duration-150 group"
                >
                  <div className="rounded-lg bg-trace/10 p-2 text-trace border border-trace/20 group-hover:bg-trace/20 transition shrink-0 mt-0.5">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-trace transition">
                      RTL &amp; Verification PDF
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      SystemVerilog, UVM, JasperGold, RISC-V
                    </div>
                  </div>
                </a>
                <a
                  href="./Abhijit_Karale_Embedded_Resume.pdf"
                  download
                  onClick={() => setResumeDropdownOpen(false)}
                  className="flex items-start gap-3 rounded-xl p-2.5 text-slate-200 hover:bg-white/[0.06] hover:text-pass transition duration-150 group"
                >
                  <div className="rounded-lg bg-pass/10 p-2 text-pass border border-pass/20 group-hover:bg-pass/20 transition shrink-0 mt-0.5">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-pass transition">
                      Embedded Systems PDF
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      STM32, FreeRTOS, Bring-Up, nRF52
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Terminal Toggle Button */}
          <button
            onClick={onOpenTerminal}
            aria-label="Open silicon terminal drawer"
            className="flex items-center gap-2 rounded-xl border border-trace/30 bg-trace/[0.06] px-3.5 py-2 font-mono text-xs text-trace transition duration-200 hover:border-trace hover:bg-trace/15 hover:shadow-[0_0_15px_rgba(0,242,254,0.2)]"
          >
            <Terminal size={14} />
            <span className="font-medium">$ terminal</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenTerminal}
            aria-label="Open silicon terminal drawer"
            className="rounded-xl border border-trace/30 bg-trace/10 p-2 text-trace hover:border-trace transition sm:hidden"
          >
            <Terminal size={16} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 hover:text-white hover:border-white/20 transition"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#080B11]/95 px-5 py-5 font-mono text-sm space-y-4 shadow-2xl backdrop-blur-xl">
          <ul className="space-y-1">
            {links.map(([id, label]) => (
              <li key={id}>
                <a
                  className="block rounded-xl px-4 py-2.5 text-slate-300 hover:bg-white/[0.06] hover:text-trace transition"
                  href={`#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-white/[0.08] space-y-2.5">
            <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">
              Download Specialized Resumes:
            </div>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="./Abhijit_Karale_RTL_DV_Resume.pdf"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl border border-trace/30 bg-trace/[0.08] p-3 text-xs text-trace hover:bg-trace/15 transition"
              >
                <Download size={15} />
                <span className="font-semibold">RTL &amp; DV Resume (PDF)</span>
              </a>
              <a
                href="./Abhijit_Karale_Embedded_Resume.pdf"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl border border-pass/30 bg-pass/[0.08] p-3 text-xs text-pass hover:bg-pass/15 transition"
              >
                <Download size={15} />
                <span className="font-semibold">Embedded Systems Resume (PDF)</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal?.();
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl border border-trace bg-trace/15 py-3 text-xs text-trace font-bold hover:bg-trace/25 transition shadow-[0_0_15px_rgba(0,242,254,0.15)]"
            >
              <Terminal size={15} />
              <span>Launch Silicon Terminal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
