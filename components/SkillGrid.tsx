"use client";
import React, { useState } from "react";
import { Table, LayoutGrid, Search, ShieldCheck, CheckCircle2, Cpu, Sparkles } from "lucide-react";
import { skills, registerMap, Proficiency } from "@/data/portfolioData";

export default function SkillGrid() {
  const [viewMode, setViewMode] = useState<"chips" | "registers">("chips");
  const [filterQuery, setFilterQuery] = useState("");
  const [activeSubsystem, setActiveSubsystem] = useState<string>("ALL");

  const getProficiencyBadge = (level: Proficiency) => {
    switch (level) {
      case "Strong":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "Working":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Familiar":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    }
  };

  const subsystems = ["ALL", ...Array.from(new Set(registerMap.map((r) => r.subsystem)))];

  const filteredRegisters = registerMap.filter((r) => {
    const matchesSubsystem = activeSubsystem === "ALL" || r.subsystem === activeSubsystem;
    const matchesQuery =
      filterQuery === "" ||
      r.registerName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.field.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.offset.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesSubsystem && matchesQuery;
  });

  return (
    <section id="skills" className="relative border-y border-white/[0.06] bg-[#0A0E18]/80 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        {/* Header with Title and Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/[0.06] pb-6">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-trace">
              Core Competencies &amp; Register Architecture
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-gradient-silver">
              Technical Skills &amp; Memory Map
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl text-base leading-relaxed">
              Explore competencies grouped by silicon subsystem domains or inspect the interactive memory-mapped register table specifying hardware control registers and verified methodology vectors.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-xl border border-white/10 bg-[#0E1422] p-1 font-mono text-xs">
              <button
                onClick={() => setViewMode("chips")}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition duration-200 ${
                  viewMode === "chips"
                    ? "bg-trace text-slate-950 font-bold shadow-md shadow-trace/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={14} />
                <span>Domain View</span>
              </button>
              <button
                onClick={() => setViewMode("registers")}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition duration-200 ${
                  viewMode === "registers"
                    ? "bg-trace text-slate-950 font-bold shadow-md shadow-trace/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Table size={14} />
                <span>Register-Map View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Proficiency Legend Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500 font-semibold">Proficiency:</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-cyan-300 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Strong (Tape-Out / Production)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-300 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Working (Hands-On Bench/DV)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-amber-300 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Familiar (Foundations)
            </span>
          </div>
        </div>

        {/* 1. CHIPS / DOMAIN CATEGORIZED VIEW */}
        {viewMode === "chips" && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {skills.map((s) => (
              <div
                key={s.id}
                className="group rounded-3xl border border-white/[0.08] bg-[#0E1424]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#121B30]/90 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full shrink-0 shadow-[0_0_8px]"
                      style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }}
                    />
                    <h3 className="font-bold text-white text-lg tracking-tight">{s.title}</h3>
                  </div>
                  <span className="font-mono text-xs font-bold" style={{ color: s.color }}>
                    0x{s.level.toString(16).toUpperCase()} &bull; {s.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 shadow-sm"
                    style={{ width: `${s.level}%`, background: s.color }}
                  />
                </div>

                {/* Skill Chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <div
                      key={item.name}
                      className="group/item flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs font-mono text-slate-200 transition duration-150 hover:border-trace/40 hover:bg-white/[0.05]"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span
                        className={`rounded-md border px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${getProficiencyBadge(
                          item.level
                        )}`}
                      >
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. REGISTER-MAP STYLE TABLE VIEW */}
        {viewMode === "registers" && (
          <div className="mt-8 space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0E1424] p-3 rounded-2xl border border-white/[0.08] shadow-lg">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search register offset, field, or methodology..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#080B11] pl-9 pr-4 py-2 font-mono text-xs text-white placeholder-slate-500 outline-none focus:border-trace transition"
                />
              </div>

              {/* Subsystem Filters */}
              <div className="flex flex-wrap gap-1">
                {subsystems.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubsystem(sub)}
                    className={`rounded-xl px-3 py-1.5 font-mono text-xs transition duration-150 ${
                      activeSubsystem === sub
                        ? "bg-trace text-slate-950 font-bold shadow-sm"
                        : "text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06]"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Register Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0E1424]/90 shadow-2xl backdrop-blur-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="border-b border-white/[0.08] bg-white/[0.03] text-slate-400">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">OFFSET</th>
                    <th className="py-3.5 px-4 font-semibold">REGISTER NAME</th>
                    <th className="py-3.5 px-4 font-semibold">BITS</th>
                    <th className="py-3.5 px-4 font-semibold">FIELD / COMPETENCY</th>
                    <th className="py-3.5 px-4 font-semibold">ACCESS</th>
                    <th className="py-3.5 px-4 font-semibold">PROFICIENCY</th>
                    <th className="py-3.5 px-4 font-semibold">SUBSYSTEM</th>
                    <th className="py-3.5 px-4 font-semibold min-w-[280px]">DESCRIPTION &amp; SPECS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-slate-300">
                  {filteredRegisters.map((reg) => (
                    <tr key={reg.offset} className="hover:bg-white/[0.03] transition duration-150">
                      <td className="py-3 px-4 font-bold text-trace">{reg.offset}</td>
                      <td className="py-3 px-4 font-bold text-white tracking-wide">{reg.registerName}</td>
                      <td className="py-3 px-4 text-slate-400">{reg.bits}</td>
                      <td className="py-3 px-4 text-slate-200 font-semibold">{reg.field}</td>
                      <td className="py-3 px-4">
                        <span className="rounded bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 text-[10px] text-slate-300">
                          {reg.access}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getProficiencyBadge(
                            reg.level
                          )}`}
                        >
                          {reg.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{reg.subsystem}</td>
                      <td className="py-3 px-4 text-slate-300 text-[11px] leading-relaxed">
                        {reg.description}
                      </td>
                    </tr>
                  ))}
                  {filteredRegisters.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-slate-500">
                        No registers match your query &quot;{filterQuery}&quot;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-slate-500 font-mono text-[11px] px-2">
              <span>MEMORY MAP BASE: 0x4000_0000 // APB SLAVE PERIPHERAL</span>
              <span>TOTAL REGISTERS: {registerMap.length} (32-BIT ALIGNED)</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
