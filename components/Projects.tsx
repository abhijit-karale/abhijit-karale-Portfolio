"use client";
import { useState } from "react";
import { CATEGORIES, projects, Project } from "@/data/portfolioData";
import ProjectCard from "./ProjectCard";
import CaseStudyModal from "./CaseStudyModal";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const list = projects.filter(
    (p) => activeCategory === "All Projects" || p.category === activeCategory
  );

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-trace">
            Silicon &amp; Firmware Portfolio
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-gradient-silver">
            Featured Engineering Projects
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl text-base leading-relaxed">
            Click &ldquo;Case Study &amp; Schematics&rdquo; on any project to explore full architectural block diagrams, UVM layered testbench structures, and JasperGold formal verification proofs.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div
        className="mt-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects"
      >
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All Projects"
              ? projects.length
              : projects.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-mono font-medium transition duration-200 ${
                activeCategory === cat
                  ? "bg-trace text-slate-950 font-bold shadow-lg shadow-trace/20 scale-[1.02]"
                  : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span>{cat}</span> <span className="opacity-70 ml-1">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {list.map((p) => (
          <ProjectCard
            key={p.id}
            p={p}
            onOpenCaseStudy={(proj) => setSelectedProject(proj)}
          />
        ))}
      </div>

      {/* Accessible Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
