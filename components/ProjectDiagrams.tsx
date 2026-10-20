"use client";
import React from "react";

interface DiagramProps {
  type: "microarch" | "testbench";
}

// 1. RISC-V 5-stage pipeline
export function RiscVDiagrams({ type }: DiagramProps) {
  if (type === "microarch") {
    return (
      <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="440" y="24" textAnchor="middle" fill="#00F2FE" fontSize="13" fontWeight="bold" fontFamily="monospace">
          RV32I 5-STAGE PIPELINED CORE MICROARCHITECTURE WITH HAZARD & FORWARDING
        </text>

        {/* 5 Stages Background Columns */}
        <rect x="20" y="40" width="150" height="270" rx="6" fill="#131B2E" stroke="#1E293B" />
        <text x="95" y="60" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace">IF (FETCH)</text>

        <rect x="190" y="40" width="150" height="270" rx="6" fill="#131B2E" stroke="#1E293B" />
        <text x="265" y="60" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace">ID (DECODE)</text>

        <rect x="360" y="40" width="160" height="270" rx="6" fill="#131B2E" stroke="#1E293B" />
        <text x="440" y="60" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace">EX (EXECUTE)</text>

        <rect x="540" y="40" width="150" height="270" rx="6" fill="#131B2E" stroke="#1E293B" />
        <text x="615" y="60" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace">MEM (MEMORY)</text>

        <rect x="710" y="40" width="150" height="270" rx="6" fill="#131B2E" stroke="#1E293B" />
        <text x="785" y="60" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace">WB (WRITEBACK)</text>

        {/* Pipeline Registers */}
        {[{ x: 175, name: "IF/ID" }, { x: 345, name: "ID/EX" }, { x: 525, name: "EX/MEM" }, { x: 695, name: "MEM/WB" }].map(r => (
          <g key={r.name}>
            <rect x={r.x} y="45" width="10" height="260" rx="2" fill="#00F2FE" opacity="0.6" />
            <text x={r.x + 5} y="180" textAnchor="middle" fill="#0A0D14" fontSize="8" fontWeight="bold" fontFamily="monospace" transform={`rotate(-90 ${r.x+5} 180)`}>{r.name}</text>
          </g>
        ))}

        {/* Blocks inside IF */}
        <rect x="40" y="80" width="110" height="45" rx="4" fill="#0F172A" stroke="#00F2FE" />
        <text x="95" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">PC Register</text>

        <rect x="40" y="145" width="110" height="60" rx="4" fill="#0F172A" stroke="#10B981" />
        <text x="95" y="172" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">Instruction</text>
        <text x="95" y="187" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace">Memory (IMEM)</text>

        {/* Blocks inside ID */}
        <rect x="210" y="80" width="110" height="40" rx="4" fill="#0F172A" stroke="#F59E0B" />
        <text x="265" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">Control / Decode</text>

        <rect x="210" y="140" width="110" height="70" rx="4" fill="#0F172A" stroke="#00F2FE" />
        <text x="265" y="170" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">Register File</text>
        <text x="265" y="185" textAnchor="middle" fill="#00F2FE" fontSize="9" fontFamily="monospace">32x 32-bit (x0-x31)</text>

        <rect x="210" y="230" width="110" height="40" rx="4" fill="#0F172A" stroke="#8B5CF6" />
        <text x="265" y="255" textAnchor="middle" fill="#8B5CF6" fontSize="9" fontFamily="monospace">Hazard Unit (Stall)</text>

        {/* Blocks inside EX */}
        <rect x="380" y="85" width="120" height="40" rx="4" fill="#0F172A" stroke="#F59E0B" />
        <text x="440" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Branch Target Adder</text>

        {/* ALU Polygon */}
        <path d="M 390 145 L 470 165 L 470 205 L 390 225 L 390 195 L 405 185 L 390 175 Z" fill="#0F172A" stroke="#00F2FE" strokeWidth="1.5" />
        <text x="430" y="188" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">ALU</text>

        <rect x="380" y="240" width="120" height="45" rx="4" fill="#0F172A" stroke="#10B981" />
        <text x="440" y="262" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace">Forwarding Unit</text>
        <text x="440" y="275" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">EX/MEM & MEM/WB</text>

        {/* Blocks inside MEM */}
        <rect x="560" y="140" width="110" height="75" rx="4" fill="#0F172A" stroke="#10B981" />
        <text x="615" y="172" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">Data Memory</text>
        <text x="615" y="187" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace">(DMEM) Load/Store</text>

        {/* Blocks inside WB */}
        <rect x="730" y="150" width="110" height="55" rx="4" fill="#0F172A" stroke="#00F2FE" />
        <text x="785" y="175" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">Writeback Mux</text>
        <text x="785" y="190" textAnchor="middle" fill="#00F2FE" fontSize="9" fontFamily="monospace">ALU / Mem Data</text>

        {/* Forwarding lines back to EX */}
        <path d="M 650 215 L 650 300 L 440 300 L 440 285" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="545" y="295" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Forwarding Path (MEM -&gt; EX)</text>
      </svg>
    );
  }

  // RV32I Testbench Architecture (Layered UVM)
  return (
    <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="440" y="24" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="bold" fontFamily="monospace">
        LAYERED UVM VERIFICATION ENVIRONMENT FOR RV32I CORE
      </text>

      {/* UVM Top / Test Box */}
      <rect x="30" y="45" width="820" height="270" rx="8" fill="#131B2E" stroke="#1E293B" strokeWidth="1.5" />
      <text x="50" y="68" fill="#00F2FE" fontSize="11" fontWeight="bold" fontFamily="monospace">uvm_test (rv32i_base_test / random_instr_test)</text>

      {/* UVM Env Box */}
      <rect x="50" y="80" width="560" height="220" rx="6" fill="#0F172A" stroke="#8B5CF6" />
      <text x="70" y="100" fill="#8B5CF6" fontSize="10" fontWeight="bold" fontFamily="monospace">uvm_env (rv32i_env)</text>

      {/* RV32I Agent Box */}
      <rect x="70" y="115" width="280" height="170" rx="4" fill="#131B2E" stroke="#00F2FE" />
      <text x="85" y="133" fill="#00F2FE" fontSize="9" fontWeight="bold" fontFamily="monospace">rv32i_agent (ACTIVE)</text>

      {/* Sequencer */}
      <rect x="85" y="145" width="110" height="35" rx="3" fill="#0F172A" stroke="#F59E0B" />
      <text x="140" y="167" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">rv32i_sequencer</text>

      {/* Sequence Item */}
      <rect x="85" y="190" width="110" height="35" rx="3" fill="#0F172A" stroke="#F59E0B" />
      <text x="140" y="212" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">instruction_seq</text>

      {/* Driver */}
      <rect x="215" y="145" width="120" height="50" rx="3" fill="#0F172A" stroke="#10B981" />
      <text x="275" y="170" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">rv32i_driver</text>
      <text x="275" y="183" textAnchor="middle" fill="#10B981" fontSize="7" fontFamily="monospace">Drive Pin Stimulus</text>

      {/* Monitor */}
      <rect x="215" y="210" width="120" height="50" rx="3" fill="#0F172A" stroke="#00F2FE" />
      <text x="275" y="235" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">rv32i_monitor</text>
      <text x="275" y="248" textAnchor="middle" fill="#00F2FE" fontSize="7" fontFamily="monospace">Sample Protocol</text>

      {/* Scoreboard & Reference Model */}
      <rect x="375" y="115" width="215" height="80" rx="4" fill="#131B2E" stroke="#10B981" />
      <text x="482" y="135" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">rv32i_scoreboard</text>
      <text x="482" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Golden Reference Model</text>
      <text x="482" y="170" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="monospace">In-Order Architectural Compare</text>

      {/* Functional Coverage Subscriber */}
      <rect x="375" y="205" width="215" height="80" rx="4" fill="#131B2E" stroke="#F59E0B" />
      <text x="482" y="225" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="bold" fontFamily="monospace">coverage_subscriber</text>
      <text x="482" y="245" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Cross-Coverage: Op x Reg x Imm</text>
      <text x="482" y="260" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Closure: 95%+ Achieved</text>

      {/* Virtual Interface (vif) */}
      <rect x="630" y="115" width="40" height="170" rx="3" fill="#0F172A" stroke="#00F2FE" />
      <text x="650" y="205" textAnchor="middle" fill="#00F2FE" fontSize="9" fontWeight="bold" fontFamily="monospace" transform="rotate(-90 650 205)">VIRTUAL IF</text>

      {/* DUT Box */}
      <rect x="690" y="80" width="140" height="220" rx="6" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
      <text x="760" y="130" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="monospace">DUT</text>
      <text x="760" y="150" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">RV32I Core</text>
      <text x="760" y="170" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">5-Stage RTL</text>
      <text x="760" y="210" textAnchor="middle" fill="#00F2FE" fontSize="8" fontFamily="monospace">Cadence Xcelium</text>
      <text x="760" y="225" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">Simulation Flow</text>

      {/* Connecting arrows */}
      <path d="M 335 170 L 630 170" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <path d="M 630 235 L 335 235" stroke="#00F2FE" strokeWidth="1.5" />
      <path d="M 670 170 L 690 170" stroke="#00F2FE" strokeWidth="1.5" />
      <path d="M 335 235 L 375 160" stroke="#00F2FE" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M 335 235 L 375 245" stroke="#00F2FE" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}

// 2. Async FIFO with Gray-code CDC
export function FifoDiagrams({ type }: DiagramProps) {
  if (type === "microarch") {
    return (
      <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="440" y="24" textAnchor="middle" fill="#00F2FE" fontSize="13" fontWeight="bold" fontFamily="monospace">
          DUAL-CLOCK ASYNCHRONOUS FIFO WITH 2-FF GRAY CODE CDC SYNCHRONIZATION
        </text>

        {/* Write Clock Domain Box */}
        <rect x="30" y="45" width="280" height="265" rx="6" fill="#131B2E" stroke="#00F2FE" strokeWidth="1.5" />
        <text x="170" y="68" textAnchor="middle" fill="#00F2FE" fontSize="11" fontWeight="bold" fontFamily="monospace">WRITE CLOCK DOMAIN (wclk)</text>

        <rect x="50" y="85" width="110" height="45" rx="3" fill="#0F172A" stroke="#1E293B" />
        <text x="105" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">wptr Binary</text>
        <text x="105" y="118" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Pointer Counter</text>

        <rect x="180" y="85" width="110" height="45" rx="3" fill="#0F172A" stroke="#F59E0B" />
        <text x="235" y="105" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace">Bin-to-Gray</text>
        <text x="235" y="118" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">b ^ (b &gt;&gt; 1)</text>

        <rect x="50" y="180" width="240" height="50" rx="3" fill="#0F172A" stroke="#10B981" />
        <text x="170" y="202" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">wfull Generation Logic</text>
        <text x="170" y="217" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">wptr_gray[MSB:MSB-1] != sync_rptr[MSB:MSB-1]</text>

        <rect x="50" y="245" width="240" height="50" rx="3" fill="#0F172A" stroke="#8B5CF6" />
        <text x="170" y="267" textAnchor="middle" fill="#8B5CF6" fontSize="9" fontWeight="bold" fontFamily="monospace">2-Stage FF Synchronizer (rptr -&gt; wclk)</text>
        <text x="170" y="280" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Metastability Safe Flops</text>

        {/* Dual-Port SRAM Array */}
        <rect x="340" y="85" width="200" height="190" rx="6" fill="#0F172A" stroke="#00F2FE" strokeWidth="2" />
        <text x="440" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">DUAL-PORT</text>
        <text x="440" y="132" textAnchor="middle" fill="#00F2FE" fontSize="11" fontWeight="bold" fontFamily="monospace">SRAM BUFFER</text>
        <text x="440" y="165" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">Width: Parameterized (DWIDTH)</text>
        <text x="440" y="180" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">Depth: Parameterized (DEPTH)</text>
        <text x="440" y="210" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace">wdata[W-1:0] / rdata[W-1:0]</text>
        <text x="440" y="225" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace">Independent Read/Write Clocks</text>

        {/* Read Clock Domain Box */}
        <rect x="570" y="45" width="280" height="265" rx="6" fill="#131B2E" stroke="#10B981" strokeWidth="1.5" />
        <text x="710" y="68" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="monospace">READ CLOCK DOMAIN (rclk)</text>

        <rect x="720" y="85" width="110" height="45" rx="3" fill="#0F172A" stroke="#1E293B" />
        <text x="775" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">rptr Binary</text>
        <text x="775" y="118" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Pointer Counter</text>

        <rect x="590" y="85" width="110" height="45" rx="3" fill="#0F172A" stroke="#F59E0B" />
        <text x="645" y="105" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace">Bin-to-Gray</text>
        <text x="645" y="118" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">b ^ (b &gt;&gt; 1)</text>

        <rect x="590" y="180" width="240" height="50" rx="3" fill="#0F172A" stroke="#10B981" />
        <text x="710" y="202" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">rempty Generation Logic</text>
        <text x="710" y="217" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">rptr_gray == sync_wptr</text>

        <rect x="590" y="245" width="240" height="50" rx="3" fill="#0F172A" stroke="#8B5CF6" />
        <text x="710" y="267" textAnchor="middle" fill="#8B5CF6" fontSize="9" fontWeight="bold" fontFamily="monospace">2-Stage FF Synchronizer (wptr -&gt; rclk)</text>
        <text x="710" y="280" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Metastability Safe Flops</text>

        {/* Cross Domain Arrows */}
        <path d="M 290 107 L 590 270" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 590 107 L 290 270" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
    );
  }

  // CDC Verification TB Diagram
  return (
    <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="440" y="24" textAnchor="middle" fill="#8B5CF6" fontSize="13" fontWeight="bold" fontFamily="monospace">
        ASYNC FIFO CDC VERIFICATION ENVIRONMENT & METASTABILITY TESTBENCH
      </text>

      <rect x="40" y="50" width="800" height="260" rx="8" fill="#131B2E" stroke="#1E293B" />

      {/* Clock generators */}
      <rect x="60" y="75" width="160" height="70" rx="4" fill="#0F172A" stroke="#00F2FE" />
      <text x="140" y="98" textAnchor="middle" fill="#00F2FE" fontSize="10" fontWeight="bold" fontFamily="monospace">Fast Clock Gen</text>
      <text x="140" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">wclk: 133 MHz + Jitter</text>
      <text x="140" y="128" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="monospace">Randomized Phase Drifts</text>

      <rect x="60" y="165" width="160" height="70" rx="4" fill="#0F172A" stroke="#10B981" />
      <text x="140" y="188" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="monospace">Slow Clock Gen</text>
      <text x="140" y="205" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">rclk: 33 MHz + Jitter</text>
      <text x="140" y="218" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="monospace">Cross-Frequency Corner Tests</text>

      {/* Write Transactor */}
      <rect x="250" y="75" width="170" height="70" rx="4" fill="#0F172A" stroke="#00F2FE" />
      <text x="335" y="98" textAnchor="middle" fill="#00F2FE" fontSize="9" fontWeight="bold" fontFamily="monospace">Write Transactor</text>
      <text x="335" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Max-Burst Write Stress</text>
      <text x="335" y="128" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">Overflow Condition Assertions</text>

      {/* Read Transactor */}
      <rect x="250" y="165" width="170" height="70" rx="4" fill="#0F172A" stroke="#10B981" />
      <text x="335" y="188" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">Read Transactor</text>
      <text x="335" y="205" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Random Wait States</text>
      <text x="335" y="218" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">Underflow Assertions (SVA)</text>

      {/* FIFO DUT */}
      <rect x="460" y="75" width="150" height="160" rx="4" fill="#0F172A" stroke="#8B5CF6" strokeWidth="2" />
      <text x="535" y="120" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold" fontFamily="monospace">ASYNC FIFO</text>
      <text x="535" y="140" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">DUT</text>
      <text x="535" y="170" textAnchor="middle" fill="#00F2FE" fontSize="8" fontFamily="monospace">2-FF Synchronizers</text>
      <text x="535" y="185" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Gray Code Pointers</text>

      {/* Scoreboard & Protocol SVA */}
      <rect x="640" y="75" width="180" height="160" rx="4" fill="#0F172A" stroke="#F59E0B" />
      <text x="730" y="105" textAnchor="middle" fill="#F59E0B" fontSize="10" fontWeight="bold" fontFamily="monospace">CDC Scoreboard & SVA</text>
      <text x="730" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Zero Data Corruption</text>
      <text x="730" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Order Preservation (FIFO)</text>
      <text x="730" y="170" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">No Overwrite on Full</text>
      <text x="730" y="185" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">No Garbage Read on Empty</text>
      <text x="730" y="210" textAnchor="middle" fill="#00F2FE" fontSize="8" fontFamily="monospace">100% Functional Coverage</text>
    </svg>
  );
}

// 3. APB FSM (IDLE / SETUP / ACCESS)
export function ApbDiagrams({ type }: DiagramProps) {
  if (type === "microarch") {
    return (
      <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="440" y="24" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold" fontFamily="monospace">
          AMBA-APB PROTOCOL SLAVE STATE MACHINE (IDLE / SETUP / ACCESS) & TIMING
        </text>

        {/* FSM Bubble 1: IDLE */}
        <circle cx="160" cy="170" r="60" fill="#131B2E" stroke="#00F2FE" strokeWidth="2" />
        <text x="160" y="165" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace">IDLE</text>
        <text x="160" y="185" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">PSEL=0, PENABLE=0</text>

        {/* FSM Bubble 2: SETUP */}
        <circle cx="440" cy="90" r="60" fill="#131B2E" stroke="#F59E0B" strokeWidth="2" />
        <text x="440" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace">SETUP</text>
        <text x="440" y="105" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace">PSEL=1, PENABLE=0</text>

        {/* FSM Bubble 3: ACCESS */}
        <circle cx="720" cy="170" r="60" fill="#131B2E" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="165" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace">ACCESS</text>
        <text x="720" y="185" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace">PSEL=1, PENABLE=1</text>

        {/* Self-loop IDLE */}
        <path d="M 120 130 C 90 90, 110 50, 160 110" stroke="#00F2FE" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="90" y="80" fill="#00F2FE" fontSize="9" fontFamily="monospace">!Transfer</text>

        {/* IDLE -> SETUP */}
        <path d="M 215 145 Q 310 90 380 90" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="270" y="100" fill="#F59E0B" fontSize="9" fontFamily="monospace">Transfer Req (PSEL=1)</text>

        {/* SETUP -> ACCESS */}
        <path d="M 500 90 Q 580 90 665 145" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="590" y="100" fill="#10B981" fontSize="9" fontFamily="monospace">Next clk (PENABLE=1)</text>

        {/* ACCESS Wait State (!PREADY) loop */}
        <path d="M 770 135 C 830 110, 830 220, 780 185" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="835" y="165" fill="#F59E0B" fontSize="9" fontFamily="monospace">!PREADY (Wait)</text>

        {/* ACCESS -> IDLE */}
        <path d="M 660 180 Q 440 260 220 180" stroke="#00F2FE" strokeWidth="2" />
        <text x="440" y="245" textAnchor="middle" fill="#00F2FE" fontSize="9" fontFamily="monospace">PREADY &amp;&amp; !Transfer -&gt; Return to IDLE</text>

        {/* ACCESS -> SETUP back-to-back */}
        <path d="M 680 140 L 480 120" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="550" y="145" fill="#8B5CF6" fontSize="9" fontFamily="monospace">PREADY &amp;&amp; Transfer (Burst)</text>

        {/* Timing strip summary at bottom */}
        <rect x="40" y="275" width="800" height="45" rx="4" fill="#0F172A" stroke="#1E293B" />
        <text x="60" y="302" fill="#94A3B8" fontSize="9" fontFamily="monospace">
          KEY PROTOCOL SIGNALS: PCLK (Synchronous) | PSELx (Slave Select) | PENABLE (Strobe) | PWRITE (R/W) | PREADY (Handshake) | PSLVERR
        </text>
      </svg>
    );
  }

  // APB Testbench Architecture
  return (
    <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="440" y="24" textAnchor="middle" fill="#00F2FE" fontSize="13" fontWeight="bold" fontFamily="monospace">
        AMBA-APB BUS FUNCTIONAL MODEL (BFM) & PROTOCOL ASSERTION TESTBENCH
      </text>

      <rect x="40" y="50" width="800" height="260" rx="8" fill="#131B2E" stroke="#1E293B" />

      {/* APB Master BFM */}
      <rect x="70" y="80" width="220" height="200" rx="6" fill="#0F172A" stroke="#00F2FE" strokeWidth="1.5" />
      <text x="180" y="110" textAnchor="middle" fill="#00F2FE" fontSize="11" fontWeight="bold" fontFamily="monospace">APB MASTER BFM</text>
      <text x="180" y="140" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Constrained-Random Master</text>
      <text x="180" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Random Burst/Single Transfers</text>
      <text x="180" y="180" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">Setup-to-Access Timing Engine</text>
      <text x="180" y="200" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Back-to-Back Burst Injector</text>

      {/* APB Protocol Checker & SVA */}
      <rect x="330" y="80" width="220" height="200" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="440" y="110" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold" fontFamily="monospace">PROTOCOL CHECKER (SVA)</text>
      <text x="440" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">p_setup_to_access:</text>
      <text x="440" y="150" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="monospace">PSEL &amp;&amp; !PENABLE |=&gt; PENABLE</text>
      <text x="440" y="175" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">p_stable_addr_data:</text>
      <text x="440" y="190" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="monospace">PADDR &amp; PWDATA held stable</text>
      <text x="440" y="215" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">100% Protocol Rule Check Passed</text>

      {/* APB Slave DUT */}
      <rect x="590" y="80" width="220" height="200" rx="6" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
      <text x="700" y="110" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="monospace">APB SLAVE (DUT)</text>
      <text x="700" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Address Decoder</text>
      <text x="700" y="155" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Memory-Mapped Register Bank</text>
      <text x="700" y="175" textAnchor="middle" fill="#00F2FE" fontSize="8" fontFamily="monospace">Wait-State Insertion Logic</text>
      <text x="700" y="195" textAnchor="middle" fill="#8B5CF6" fontSize="8" fontFamily="monospace">Read/Write Data Path</text>
      <text x="700" y="215" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">Full Functional Coverage</text>
    </svg>
  );
}

// 4. Memory Controller + SVA / JasperGold Formal Flow
export function MemCtrlDiagrams({ type }: DiagramProps) {
  if (type === "microarch") {
    return (
      <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="440" y="24" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="bold" fontFamily="monospace">
          MEMORY CONTROLLER MICROARCHITECTURE WITH ARBITRATION & ADDRESS DECODING
        </text>

        {/* Host Interface */}
        <rect x="40" y="60" width="160" height="240" rx="6" fill="#131B2E" stroke="#00F2FE" />
        <text x="120" y="90" textAnchor="middle" fill="#00F2FE" fontSize="11" fontWeight="bold" fontFamily="monospace">HOST INTERFACE</text>
        <text x="120" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Read / Write Ports</text>
        <text x="120" y="150" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">addr[ADDR_W-1:0]</text>
        <text x="120" y="170" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">wdata[DATA_W-1:0]</text>
        <text x="120" y="190" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">rdata[DATA_W-1:0]</text>
        <text x="120" y="210" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">rd_en / wr_en</text>
        <text x="120" y="235" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">err / ready flags</text>

        {/* Command Queue & Arbiter */}
        <rect x="240" y="60" width="180" height="240" rx="6" fill="#131B2E" stroke="#F59E0B" />
        <text x="330" y="90" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold" fontFamily="monospace">QUEUE &amp; ARBITER</text>
        <rect x="260" y="110" width="140" height="40" rx="3" fill="#0F172A" stroke="#1E293B" />
        <text x="330" y="133" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Command FIFO Queue</text>
        <rect x="260" y="165" width="140" height="50" rx="3" fill="#0F172A" stroke="#1E293B" />
        <text x="330" y="187" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Priority Arbiter</text>
        <text x="330" y="200" textAnchor="middle" fill="#10B981" fontSize="7" fontFamily="monospace">Write-Before-Read Bypass</text>
        <rect x="260" y="230" width="140" height="45" rx="3" fill="#0F172A" stroke="#10B981" />
        <text x="330" y="250" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Address Range</text>
        <text x="330" y="263" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="monospace">Boundary Checker</text>

        {/* Control State Machine */}
        <rect x="460" y="60" width="170" height="240" rx="6" fill="#131B2E" stroke="#8B5CF6" />
        <text x="545" y="90" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontWeight="bold" fontFamily="monospace">FSM CONTROLLER</text>
        <text x="545" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Deterministic Reset</text>
        <text x="545" y="150" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">IDLE -&gt; DECODE</text>
        <text x="545" y="170" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">READ_CYCLE</text>
        <text x="545" y="190" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">WRITE_CYCLE</text>
        <text x="545" y="215" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">Error Flag Assert</text>
        <text x="545" y="235" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">No Read-Before-Write</text>

        {/* Memory Macro Array */}
        <rect x="670" y="60" width="170" height="240" rx="6" fill="#131B2E" stroke="#00F2FE" strokeWidth="2" />
        <text x="755" y="90" textAnchor="middle" fill="#00F2FE" fontSize="11" fontWeight="bold" fontFamily="monospace">MEMORY ARRAY</text>
        <text x="755" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">SRAM Macro</text>
        <text x="755" y="155" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Single-Port Access</text>
        <text x="755" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Synchronous Clocked</text>
        <text x="755" y="210" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Registered Outputs</text>
      </svg>
    );
  }

  // JasperGold Formal Verification Flow
  return (
    <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="440" y="24" textAnchor="middle" fill="#00F2FE" fontSize="13" fontWeight="bold" fontFamily="monospace">
        FORMAL PROPERTY VERIFICATION FLOW WITH SVA &amp; JASPERGOLD
      </text>

      <rect x="40" y="50" width="800" height="260" rx="8" fill="#131B2E" stroke="#1E293B" />

      {/* Input: RTL + SVA */}
      <rect x="70" y="80" width="200" height="90" rx="4" fill="#0F172A" stroke="#00F2FE" />
      <text x="170" y="105" textAnchor="middle" fill="#00F2FE" fontSize="10" fontWeight="bold" fontFamily="monospace">SystemVerilog RTL</text>
      <text x="170" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Memory Controller Design</text>
      <text x="170" y="140" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="monospace">Synthesizable Microarchitecture</text>

      <rect x="70" y="190" width="200" height="95" rx="4" fill="#0F172A" stroke="#10B981" />
      <text x="170" y="215" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="monospace">Formal SVA Properties</text>
      <text x="170" y="235" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">assume property (Legal Stimulus)</text>
      <text x="170" y="250" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">assert property (Safety Proofs)</text>
      <text x="170" y="265" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">cover property (Reachability)</text>

      {/* JasperGold Formal Engine */}
      <rect x="320" y="90" width="230" height="180" rx="6" fill="#0F172A" stroke="#8B5CF6" strokeWidth="2" />
      <text x="435" y="120" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold" fontFamily="monospace">JASPERGOLD ENGINE</text>
      <text x="435" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Cadence JasperGold FPV</text>
      <text x="435" y="170" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Bounded Model Checking (BMC)</text>
      <text x="435" y="190" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Inductive Prover Engines</text>
      <text x="435" y="215" textAnchor="middle" fill="#00F2FE" fontSize="8" fontFamily="monospace">State Space Exploration</text>
      <text x="435" y="235" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Mathematical Proof Engine</text>

      {/* Proof Results */}
      <rect x="600" y="80" width="210" height="95" rx="4" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
      <text x="705" y="105" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="monospace">100% FORMAL PROOFS</text>
      <text x="705" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">p_no_rbw: PROVEN</text>
      <text x="705" y="140" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">p_addr_boundary: PROVEN</text>
      <text x="705" y="155" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Zero Invariant Violations</text>

      {/* Counter Example Debug */}
      <rect x="600" y="190" width="210" height="95" rx="4" fill="#0F172A" stroke="#F59E0B" />
      <text x="705" y="215" textAnchor="middle" fill="#F59E0B" fontSize="10" fontWeight="bold" fontFamily="monospace">Exhaustive Trace Analysis</text>
      <text x="705" y="235" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Deep State Bug Hunting</text>
      <text x="705" y="250" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Cycle-Accurate Waveforms</text>
      <text x="705" y="265" textAnchor="middle" fill="#00F2FE" fontSize="8" fontFamily="monospace">Complements Simulation</text>
    </svg>
  );
}

// 5. Generic / Embedded diagrams for other projects
export function EmbeddedDiagrams({ type }: DiagramProps) {
  return (
    <svg viewBox="0 0 880 340" className="w-full h-auto bg-die/90 rounded-lg p-2 border border-edge" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="440" y="24" textAnchor="middle" fill="#00F2FE" fontSize="13" fontWeight="bold" fontFamily="monospace">
        EMBEDDED FIRMWARE ARCHITECTURE &amp; MULTITASKING FREERTOS SYSTEM
      </text>
      <rect x="40" y="50" width="800" height="260" rx="8" fill="#131B2E" stroke="#1E293B" />
      <rect x="70" y="80" width="210" height="200" rx="4" fill="#0F172A" stroke="#F59E0B" />
      <text x="175" y="110" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold" fontFamily="monospace">HARDWARE / MCU</text>
      <text x="175" y="140" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">STM32 / nRF52 BLE</text>
      <text x="175" y="165" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">ARM Cortex-M0/M3/M4</text>
      <text x="175" y="190" textAnchor="middle" fill="#00F2FE" fontSize="8" fontFamily="monospace">UART, SPI, I2C, ADC, PWM</text>
      <text x="175" y="215" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Multi-layer PCB Debugging</text>

      <rect x="320" y="80" width="240" height="200" rx="4" fill="#0F172A" stroke="#00F2FE" />
      <text x="440" y="110" textAnchor="middle" fill="#00F2FE" fontSize="11" fontWeight="bold" fontFamily="monospace">FREERTOS KERNEL</text>
      <text x="440" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Preemptive Scheduler</text>
      <text x="440" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Priority Task Queues</text>
      <text x="440" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Mutexes &amp; Semaphores</text>
      <text x="440" y="205" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">Interrupt Service Handlers</text>
      <text x="440" y="225" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Low-Power Sleep Modes</text>

      <rect x="600" y="80" width="210" height="200" rx="4" fill="#0F172A" stroke="#10B981" />
      <text x="705" y="110" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="monospace">APPLICATION &amp; FIELD</text>
      <text x="705" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Industrial Relays</text>
      <text x="705" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">Motor Control Diagnostics</text>
      <text x="705" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">SCR Firing Package Fixes</text>
      <text x="705" y="205" textAnchor="middle" fill="#00F2FE" fontSize="8" fontFamily="monospace">Zero Task Starvation</text>
      <text x="705" y="225" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">High Reliability Bring-Up</text>
    </svg>
  );
}
