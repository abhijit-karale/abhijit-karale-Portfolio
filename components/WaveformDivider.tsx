"use client";
import React from "react";

interface WaveformDividerProps {
  variant?: "clock" | "bus" | "analog" | "fsm";
  label?: string;
  className?: string;
}

export default function WaveformDivider({
  variant = "clock",
  label,
  className = "",
}: WaveformDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden py-3 select-none opacity-70 hover:opacity-100 transition-opacity duration-300 ${className}`}
      aria-hidden="true"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 font-mono text-[10px] text-slate-400">
        <span className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-trace animate-pulse" />
          <span className="text-slate-300 font-medium">
            {label ? label : variant === "clock" ? "SYS_CLK // 100 MHz" : variant === "bus" ? "AMBA_APB_BUS // 32-bit" : variant === "fsm" ? "CDC_GRAY_SYNC // METASTABLE_SAFE" : "SPICE_ADC // MIXED_SIGNAL"}
          </span>
        </span>
        <span className="hidden sm:inline text-slate-500 font-mono">
          {variant === "clock" ? "DUT_CLK_POSEDGE_SAMPLED" : "PHASE_LOCKED // TSMC_FLOW"}
        </span>
      </div>

      <div className="relative mt-2 h-9 w-full overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#080B11] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#080B11] to-transparent pointer-events-none" />

        {variant === "clock" && (
          <svg
            className="waveform-pulse h-full w-[200%] sm:w-[150%] max-w-none"
            viewBox="0 0 1200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Guide line */}
            <line x1="0" y1="28" x2="1200" y2="28" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="12" x2="1200" y2="12" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Repeating clock wave */}
            <path
              d="M0 28 
                L40 28 L40 12 L80 12 L80 28
                L120 28 L120 12 L160 12 L160 28
                L200 28 L200 12 L240 12 L240 28
                L280 28 L280 12 L320 12 L320 28
                L360 28 L360 12 L400 12 L400 28
                L440 28 L440 12 L480 12 L480 28
                L520 28 L520 12 L560 12 L560 28
                L600 28 L600 12 L640 12 L640 28
                L680 28 L680 12 L720 12 L720 28
                L760 28 L760 12 L800 12 L800 28
                L840 28 L840 12 L880 12 L880 28
                L920 28 L920 12 L960 12 L960 28
                L1000 28 L1000 12 L1040 12 L1040 28
                L1080 28 L1080 12 L1120 12 L1120 28
                L1160 28 L1160 12 L1200 12"
              stroke="#00F2FE"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_5px_rgba(0,242,254,0.3)]"
            />

            {/* Rising edge sample markers */}
            {[40, 120, 200, 280, 360, 440, 520, 600, 680, 760, 840, 920, 1000, 1080, 1160].map((x) => (
              <g key={x}>
                <polygon points={`${x-2},10 ${x+2},10 ${x},7`} fill="#10B981" />
                <circle cx={x} cy={12} r="1.5" fill="#10B981" />
              </g>
            ))}
          </svg>
        )}

        {variant === "bus" && (
          <svg
            className="waveform-pulse-reverse h-full w-[200%] sm:w-[150%] max-w-none"
            viewBox="0 0 1200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bus rails */}
            <path
              d="M0 14 L70 14 L85 20 L100 14 L170 14 L185 20 L200 14 L270 14 L285 20 L300 14 L370 14 L385 20 L400 14 L470 14 L485 20 L500 14 L570 14 L585 20 L600 14 L670 14 L685 20 L700 14 L770 14 L785 20 L800 14 L870 14 L885 20 L900 14 L970 14 L985 20 L1000 14 L1070 14 L1085 20 L1100 14 L1170 14 L1200 14"
              stroke="#8B5CF6"
              strokeWidth="1.25"
            />
            <path
              d="M0 26 L70 26 L85 20 L100 26 L170 26 L185 20 L200 26 L270 26 L285 20 L300 26 L370 26 L385 20 L400 26 L470 26 L485 20 L500 26 L570 26 L585 20 L600 26 L670 26 L685 20 L700 26 L770 26 L785 20 L800 26 L870 26 L885 20 L900 26 L970 26 L985 20 L1000 26 L1070 26 L1085 20 L1100 26 L1170 26 L1200 26"
              stroke="#8B5CF6"
              strokeWidth="1.25"
            />
            {/* Cross intersections */}
            {[85, 185, 285, 385, 485, 585, 685, 785, 885, 985, 1085].map((x) => (
              <circle key={x} cx={x} cy={20} r="1.5" fill="#00F2FE" />
            ))}
            {/* Hex bus labels */}
            {[
              { x: 35, val: "0xRV32I" },
              { x: 135, val: "0xUVM_OK" },
              { x: 235, val: "0xJASPER" },
              { x: 335, val: "0xPWRITE" },
              { x: 435, val: "0xPREADY" },
              { x: 535, val: "0xCDC_FF" },
              { x: 635, val: "0xSTM32" },
              { x: 735, val: "0xRTOS_Q" },
              { x: 835, val: "0xBLE_50" },
              { x: 935, val: "0xSPICE" },
              { x: 1035, val: "0xXCELIUM" },
            ].map(({ x, val }) => (
              <text
                key={x}
                x={x}
                y={22}
                fill="#94A3B8"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                {val}
              </text>
            ))}
          </svg>
        )}

        {variant === "analog" && (
          <svg
            className="waveform-pulse h-full w-[200%] sm:w-[150%] max-w-none"
            viewBox="0 0 1200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20 
                C 25 5, 50 35, 75 20
                C 100 5, 125 35, 150 20
                C 175 5, 200 35, 225 20
                C 250 5, 275 35, 300 20
                C 325 5, 350 35, 375 20
                L 410 20 L 410 10 L 450 10 L 450 30 L 490 30 L 490 10 L 530 10 L 530 30 L 570 30 L 570 10
                C 595 5, 620 35, 645 20
                C 670 5, 695 35, 720 20
                L 755 20 L 755 10 L 795 10 L 795 30 L 835 30 L 835 10 L 875 10 L 875 30 L 915 30
                C 940 5, 965 35, 990 20
                C 1015 5, 1040 35, 1065 20
                L 1100 20 L 1100 10 L 1140 10 L 1140 30 L 1200 30"
              stroke="#F59E0B"
              strokeWidth="1.25"
              strokeLinecap="round"
              className="drop-shadow-[0_0_5px_rgba(245,158,11,0.25)]"
            />
          </svg>
        )}

        {variant === "fsm" && (
          <svg
            className="waveform-pulse-reverse h-full w-[200%] sm:w-[150%] max-w-none"
            viewBox="0 0 1200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12 L100 12 L100 28 L200 28 L200 12 L300 12 L300 28 L400 28 L400 12 L500 12 L500 28 L600 28 L600 12 L700 12 L700 28 L800 28 L800 12 L900 12 L900 28 L1000 28 L1000 12 L1100 12 L1100 28 L1200 28"
              stroke="#10B981"
              strokeWidth="1.25"
            />
            <path
              d="M0 24 L50 24 L70 8 L170 8 L190 24 L250 24 L270 8 L370 8 L390 24 L450 24 L470 8 L570 8 L590 24 L650 24 L670 8 L770 8 L790 24 L850 24 L870 8 L970 8 L990 24 L1050 24 L1070 8 L1170 8 L1190 24 L1200 24"
              stroke="#00F2FE"
              strokeWidth="1.25"
            />
          </svg>
        )}
      </div>

      <style jsx>{`
        @keyframes waveform-move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes waveform-move-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .waveform-pulse {
          animation: waveform-move 28s linear infinite;
        }
        .waveform-pulse-reverse {
          animation: waveform-move-reverse 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .waveform-pulse,
          .waveform-pulse-reverse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
