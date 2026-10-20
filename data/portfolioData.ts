export type Category = "Digital RTL & UVM" | "Formal Verification" | "SoC & Protocols" | "Embedded & Low-Power";
export const CATEGORIES: ("All Projects" | Category)[] = ["All Projects", "Digital RTL & UVM", "Formal Verification", "SoC & Protocols", "Embedded & Low-Power"];
export interface Project {
  id: string; title: string; category: Category; tech: string[]; overview: string;
  specs: string[]; strategy: string[]; results: { label: string; value: string; pct?: number }[];
  code?: { lang: string; src: string };
}
export const profile = {
  name: "Abhijit Karale",
  avatar: "/profile.jpg",
  role: "RTL Design & Verification Engineer | Embedded Systems & Firmware Engineer",
  headline: "I verify the chip, and I've debugged the board it ends up on.",
  summary: "RTL architecture, constrained-random and formal verification, plus 2+ years of firmware and hardware bring-up. Hands-on in Cadence Xcelium and JasperGold.",
  email: "abhijitkarale8@gmail.com", phone: "+91 9552067110", location: "Ahmedabad, Gujarat, India",
  github: "https://github.com/abhijit-karale", linkedin: "https://linkedin.com/in/abhijitkarale",
  portfolio: "https://abhijit-karale.github.io/abhijit-karale-Portfolio/",
};
export const metrics = [
  { label: "UVM functional coverage", value: 95, suffix: "%+", color: "#00F2FE", note: "Cadence Xcelium benchmark (RV32I)" },
  { label: "Properties proven in JasperGold", value: 100, suffix: "%", color: "#10B981", note: "Exhaustive formal proof (SVA)" },
  { label: "FPGA-validated ASIC flow", value: 100, suffix: " MHz", color: "#F59E0B", note: "Hardware timing closure benchmark" },
  { label: "Years of hardware bring-up", value: 2, suffix: "+", color: "#8B5CF6", note: "Minilec & Velaxtra verified experience" },
];
export const projects: Project[] = [
  { id: "riscv", title: "32-bit RISC-V Processor Design & Verification", category: "Digital RTL & UVM",
    tech: ["Verilog", "SystemVerilog", "UVM", "Cadence Xcelium"],
    overview: "A 5-stage pipelined RV32I core with a complete layered UVM environment.",
    specs: ["Stages: Fetch, Decode, Execute, Memory, Writeback", "Hazard detection unit and pipeline stalls", "Operand forwarding unit"],
    strategy: ["UVM driver, monitor and scoreboard", "Constrained-random instruction sequences", "Functional coverage closure in Xcelium"],
    results: [{ label: "Functional coverage", value: "95%+", pct: 95 }],
    code: { lang: "systemverilog", src: "// Forwarding unit (EX stage)\nalways_comb begin\n  fwd_a = 2'b00; fwd_b = 2'b00;\n  if (ex_mem_regwrite && ex_mem_rd != 0 && ex_mem_rd == id_ex_rs1) fwd_a = 2'b10;\n  else if (mem_wb_regwrite && mem_wb_rd != 0 && mem_wb_rd == id_ex_rs1) fwd_a = 2'b01;\n  if (ex_mem_regwrite && ex_mem_rd != 0 && ex_mem_rd == id_ex_rs2) fwd_b = 2'b10;\n  else if (mem_wb_regwrite && mem_wb_rd != 0 && mem_wb_rd == id_ex_rs2) fwd_b = 2'b01;\nend" } },
  { id: "risc8", title: "8-bit RISC Processor: Complete ASIC Flow", category: "Digital RTL & UVM",
    tech: ["Verilog", "VHDL", "Synopsys Tools", "FPGA"],
    overview: "A 32-instruction RISC architecture taken from RTL to gate level.",
    specs: ["32-instruction ISA", "Verilog and VHDL implementations", "Synthesis, floorplanning, place & route, DFT, static timing closure"],
    strategy: ["Directed self-checking tests", "350+ test cases", "FPGA validation at speed"],
    results: [{ label: "Simulation coverage", value: "100%", pct: 100 }, { label: "Test cases", value: "350+" }, { label: "FPGA clock", value: "100 MHz" }] },
  { id: "memctl", title: "Memory Controller with Formal Property Verification", category: "Formal Verification",
    tech: ["SystemVerilog", "SVA", "JasperGold"],
    overview: "A single-port read/write controller with address decoding, proven formally.",
    specs: ["Single-port read/write access", "Address range decoding", "Deterministic reset"],
    strategy: ["SVA for address boundaries, no-read-before-write, reset behavior", "JasperGold exhaustive proofs", "Complements dynamic simulation"],
    results: [{ label: "Key properties", value: "Proven", pct: 100 }],
    code: { lang: "systemverilog", src: "// No read before write\nproperty p_no_rbw;\n  @(posedge clk) disable iff (!rst_n)\n  (rd_en && !written[addr]) |-> ##1 err;\nendproperty\nassert property (p_no_rbw);\n\n// Address boundary\nassert property (@(posedge clk) disable iff (!rst_n)\n  (wr_en || rd_en) |-> (addr < DEPTH));" } },
  { id: "apb", title: "AMBA-APB Slave Peripheral", category: "SoC & Protocols",
    tech: ["SystemVerilog", "AMBA-APB"],
    overview: "An APB-compliant slave with address decoding and register mapping.",
    specs: ["IDLE / SETUP / ACCESS FSM", "Register map with address decode"],
    strategy: ["Directed bus stimulus", "Constrained-random transactions", "Coverage-driven closure"],
    results: [{ label: "Functional coverage", value: "Full closure", pct: 100 }] },
  { id: "fifo", title: "Parameterizable Sync & Async FIFOs with CDC", category: "SoC & Protocols",
    tech: ["Verilog", "SystemVerilog", "CDC"],
    overview: "Dual-clock FIFO with Gray-code pointers and 2-flop synchronizers.",
    specs: ["Parameterizable width and depth", "Gray-code pointer synchronization", "Full/empty flag generation"],
    strategy: ["Self-checking testbench", "Max-throughput and cross-frequency stress", "Flag assertions"],
    results: [{ label: "CDC", value: "Metastability-safe" }],
    code: { lang: "verilog", src: "// 2-flop synchronizer\nalways @(posedge clk_dst or negedge rst_n)\n  if (!rst_n) {sync2, sync1} <= 0;\n  else        {sync2, sync1} <= {sync1, gray_src};\n\nfunction [W:0] bin2gray(input [W:0] b);\n  bin2gray = b ^ (b >> 1);\nendfunction" } },
  { id: "uart", title: "Configurable UART Controller RTL & Verification", category: "SoC & Protocols",
    tech: ["Verilog", "SystemVerilog", "SVA"],
    overview: "A transmitter/receiver with programmable baud rate and parity modes.",
    specs: ["Variable baud rates", "Parity modes", "Framing and error flags"],
    strategy: ["Protocol assertions for framing and timing", "Baud accuracy checks", "Error recovery tests"],
    results: [{ label: "Checks", value: "Framing, baud, recovery" }] },
  { id: "ecc", title: "Reversible-Logic ECC ALU", category: "Digital RTL & UVM",
    tech: ["Verilog", "SECDED"],
    overview: "An ALU with a SECDED reversible-logic data path and clock gating.",
    specs: ["Single-error correction, double-error detection", "Reversible-logic data path", "Clock gating"],
    strategy: ["2,439 test cases", "Switching-activity comparison"],
    results: [{ label: "Clock-toggle reduction", value: "67.4%", pct: 67.4 }, { label: "Test cases", value: "2,439" }] },
  { id: "ble", title: "nRF52840 / nRF52833 Ultra-Low-Power BLE Firmware", category: "Embedded & Low-Power",
    tech: ["Embedded C", "Nordic SDK", "BLE"],
    overview: "System ON and System OFF sleep modes on battery-powered edge hardware.",
    specs: ["System ON / System OFF modes", "Tuned wake-up sources", "Peripheral state retention"],
    strategy: ["Validated each power state on hardware", "Wake-source tuning"],
    results: [{ label: "Outcome", value: "Longer field autonomy" }] },
  { id: "fw", title: "Multi-Peripheral Industrial Firmware Engine", category: "Embedded & Low-Power",
    tech: ["Embedded C", "FreeRTOS", "STM32"],
    overview: "Drivers for five peripherals with preemptive RTOS scheduling.",
    specs: ["UART, SPI, I2C, ADC, PWM drivers", "FreeRTOS tasks, queues, mutexes"],
    strategy: ["Real-time multi-sensor acquisition", "Signal-level integration debugging"],
    results: [{ label: "Peripherals integrated", value: "5" }],
    code: { lang: "c", src: "static void sensor_task(void *arg) {\n  TickType_t t = xTaskGetTickCount();\n  for (;;) {\n    uint16_t v = adc_read(CH0);\n    xQueueSend(q_data, &v, 0);\n    vTaskDelayUntil(&t, pdMS_TO_TICKS(10));\n  }\n}" } },
  { id: "scr", title: "Industrial SCR Motor Drive Firing Package Diagnostics", category: "Embedded & Low-Power",
    tech: ["Analog Diagnostics", "Oscilloscope"],
    overview: "Fault isolation and repair of a Joy/Komatsu Mining SCR firing package (Part No. 601849-121).",
    specs: ["Signal tracing with oscilloscope and multimeter"],
    strategy: ["Root-caused firing-circuit faults", "Turned ad-hoc diagnostics into a repeatable test procedure"],
    results: [{ label: "Outcome", value: "Repaired + test standard" }] },
  { id: "stm", title: "STM32 Industrial Control System Bring-Up", category: "Embedded & Low-Power",
    tech: ["STM32", "ARM Cortex-M", "PCB"],
    overview: "Hardware bring-up of an industrial control system.",
    specs: ["Schematic-to-board correlation", "Signal-integrity fixes on multi-layer PCBs"],
    strategy: ["Analog signal-conditioning diagnostics", "Isolated intermittent field faults"],
    results: [{ label: "Outcome", value: "Intermittent faults resolved" }] },
];
export type Proficiency = "Strong" | "Working" | "Familiar";

export interface SkillItem {
  name: string;
  level: Proficiency;
}

export interface SkillCategory {
  id: string;
  title: string;
  color: string;
  level: number;
  items: SkillItem[];
}

export interface RegisterEntry {
  offset: string;
  registerName: string;
  bits: string;
  field: string;
  access: "RW" | "RO" | "W1C";
  level: Proficiency;
  subsystem: string;
  description: string;
}

export const skills: SkillCategory[] = [
  {
    id: "rtl",
    title: "RTL Design & Microarchitecture",
    color: "#00F2FE",
    level: 90,
    items: [
      { name: "SystemVerilog", level: "Strong" },
      { name: "Verilog", level: "Strong" },
      { name: "Pipelined Datapath & FSM", level: "Strong" },
      { name: "Sync/Async FIFOs", level: "Strong" },
      { name: "CDC & Gray Synchronizers", level: "Strong" },
      { name: "Low Power (UPF)", level: "Working" },
      { name: "FPGA Prototyping", level: "Working" },
      { name: "Clock Gating / SECDED ALU", level: "Working" },
      { name: "VHDL", level: "Familiar" },
      { name: "DFT / Scan Insertion", level: "Familiar" },
    ],
  },
  {
    id: "dv",
    title: "Verification & Methodologies",
    color: "#10B981",
    level: 90,
    items: [
      { name: "UVM Methodology", level: "Strong" },
      { name: "Sequences & Sequencers", level: "Strong" },
      { name: "Drivers & Monitors", level: "Strong" },
      { name: "Agents & Scoreboards", level: "Strong" },
      { name: "Functional Coverage Closure", level: "Strong" },
      { name: "SVA (SystemVerilog Assertions)", level: "Strong" },
      { name: "Formal (JasperGold)", level: "Strong" },
      { name: "Constrained-Random TB", level: "Strong" },
      { name: "Code Coverage Analysis", level: "Strong" },
      { name: "TLM & Factory Overrides", level: "Working" },
      { name: "DPI-C / BFM Models", level: "Working" },
    ],
  },
  {
    id: "soc",
    title: "Protocols & Interconnects",
    color: "#8B5CF6",
    level: 85,
    items: [
      { name: "AMBA-APB Protocol", level: "Strong" },
      { name: "UART / SPI / I2C", level: "Strong" },
      { name: "RV32I ISA & Buses", level: "Strong" },
      { name: "AXI4-Lite Fundamentals", level: "Working" },
      { name: "ADC & PWM Interfaces", level: "Strong" },
      { name: "GPIO & Interrupt Controllers", level: "Strong" },
    ],
  },
  {
    id: "eda",
    title: "EDA & Verification Tools",
    color: "#F59E0B",
    level: 85,
    items: [
      { name: "Cadence Xcelium", level: "Strong" },
      { name: "JasperGold Formal FPV", level: "Strong" },
      { name: "QuestaSim / ModelSim", level: "Strong" },
      { name: "Xilinx Vivado", level: "Working" },
      { name: "Synopsys Design Compiler", level: "Working" },
      { name: "Verdi / SimVision", level: "Working" },
      { name: "Keil µVision", level: "Strong" },
      { name: "STM32CubeIDE", level: "Strong" },
      { name: "SPICE Simulation", level: "Working" },
    ],
  },
  {
    id: "fw",
    title: "Embedded Firmware & RTOS",
    color: "#00F2FE",
    level: 95,
    items: [
      { name: "Embedded C", level: "Strong" },
      { name: "FreeRTOS Scheduling", level: "Strong" },
      { name: "Task Queues & Mutexes", level: "Strong" },
      { name: "ISR & Interrupt Vectors", level: "Strong" },
      { name: "Bare-Metal Driver Architecture", level: "Strong" },
      { name: "BLE Low-Power States", level: "Working" },
      { name: "C++ Fundamentals", level: "Working" },
      { name: "Bootloaders & JTAG/SWD", level: "Working" },
    ],
  },
  {
    id: "mcu",
    title: "Microcontrollers & Platforms",
    color: "#10B981",
    level: 90,
    items: [
      { name: "STM32 / ARM Cortex-M", level: "Strong" },
      { name: "ARM Cortex-M0/M3/M4", level: "Strong" },
      { name: "Nordic nRF52840 / nRF52833", level: "Working" },
      { name: "LPC1768 Cortex-M3", level: "Working" },
      { name: "8/16/32-bit MCUs", level: "Strong" },
    ],
  },
  {
    id: "hw",
    title: "Hardware Bring-Up & Lab",
    color: "#8B5CF6",
    level: 90,
    items: [
      { name: "Multi-layer PCB Debugging", level: "Strong" },
      { name: "Signal Integrity & Noise Isolation", level: "Strong" },
      { name: "Oscilloscope & Logic Analyzer", level: "Strong" },
      { name: "Schematic-to-Board Correlation", level: "Strong" },
      { name: "Analog Signal Conditioning", level: "Working" },
      { name: "SCR Firing Drive Diagnostics", level: "Working" },
    ],
  },
  {
    id: "dev",
    title: "Languages & DevOps",
    color: "#F59E0B",
    level: 80,
    items: [
      { name: "Python (Vectors & Parsing)", level: "Working" },
      { name: "Shell Scripting (Bash)", level: "Working" },
      { name: "Git Version Control", level: "Strong" },
      { name: "Linux / Unix Environment", level: "Working" },
    ],
  },
];

export const registerMap: RegisterEntry[] = [
  {
    offset: "0x0000",
    registerName: "RTL_CORE_CTRL",
    bits: "[31:24]",
    field: "SystemVerilog / Verilog",
    access: "RW",
    level: "Strong",
    subsystem: "Digital RTL",
    description: "Pipelined RV32I datapath, hazard forwarding, FSM synthesis, clock-gating.",
  },
  {
    offset: "0x0004",
    registerName: "CDC_FIFO_SYNC",
    bits: "[31:0]",
    field: "Async FIFO & Gray CDC",
    access: "RW",
    level: "Strong",
    subsystem: "Digital RTL",
    description: "Dual-clock domain crossings, 2-stage Gray synchronizers, metastability safety.",
  },
  {
    offset: "0x0008",
    registerName: "UVM_VERIF_ENV",
    bits: "[31:0]",
    field: "UVM Layered Testbench",
    access: "RW",
    level: "Strong",
    subsystem: "Verification",
    description: "Sequencers, drivers, monitors, in-order scoreboards, 95%+ functional coverage.",
  },
  {
    offset: "0x000C",
    registerName: "FORMAL_JASPER_STS",
    bits: "[31:0]",
    field: "SVA & JasperGold FPV",
    access: "RO",
    level: "Strong",
    subsystem: "Verification",
    description: "Bounded model checking, 100% formal mathematical proofs, safety invariants.",
  },
  {
    offset: "0x0010",
    registerName: "AMBA_APB_SLAVE",
    bits: "[31:16]",
    field: "AMBA-APB Interconnect",
    access: "RW",
    level: "Strong",
    subsystem: "SoC & Protocols",
    description: "IDLE/SETUP/ACCESS FSM, address decoding, wait-state handshake.",
  },
  {
    offset: "0x0014",
    registerName: "UPF_PWR_INTENT",
    bits: "[15:0]",
    field: "Low Power Design (UPF)",
    access: "RW",
    level: "Working",
    subsystem: "Digital RTL",
    description: "Unified Power Format power intent, isolation strategies, power domains.",
  },
  {
    offset: "0x0018",
    registerName: "EDA_SIM_XCELIUM",
    bits: "[31:0]",
    field: "Cadence Xcelium",
    access: "RO",
    level: "Strong",
    subsystem: "EDA Tools",
    description: "High-speed multi-core simulation, randomized constraints, coverage analysis.",
  },
  {
    offset: "0x001C",
    registerName: "EDA_SYNTH_FPGA",
    bits: "[15:0]",
    field: "Synopsys DC & Vivado",
    access: "RW",
    level: "Working",
    subsystem: "EDA Tools",
    description: "Logic synthesis, static timing analysis (STA), 100 MHz FPGA timing closure.",
  },
  {
    offset: "0x0020",
    registerName: "EMBED_RTOS_KERN",
    bits: "[31:0]",
    field: "FreeRTOS Multitasking",
    access: "RW",
    level: "Strong",
    subsystem: "Firmware",
    description: "Preemptive priority scheduling, mutexes, inter-task queues, zero starvation.",
  },
  {
    offset: "0x0024",
    registerName: "MCU_STM32_DRV",
    bits: "[31:16]",
    field: "STM32 / ARM Cortex-M",
    access: "RW",
    level: "Strong",
    subsystem: "Microcontrollers",
    description: "Bare-metal & HAL drivers: UART, SPI, I2C, ADC, PWM, DMA, watchdog timers.",
  },
  {
    offset: "0x0028",
    registerName: "BLE_LOW_POWER",
    bits: "[15:0]",
    field: "Nordic nRF52 BLE",
    access: "RW",
    level: "Working",
    subsystem: "Firmware",
    description: "System ON / OFF sleep states, wake-up sources, battery lifetime optimization.",
  },
  {
    offset: "0x002C",
    registerName: "SPICE_ANALOG_AFE",
    bits: "[15:0]",
    field: "SPICE CMOS Simulation",
    access: "RO",
    level: "Working",
    subsystem: "Analog & Lab",
    description: "MOSFET small-signal characterization, current-mirrors, differential amplifiers.",
  },
  {
    offset: "0x0030",
    registerName: "PCB_LAB_BRINGUP",
    bits: "[31:0]",
    field: "Hardware Bring-Up",
    access: "RO",
    level: "Strong",
    subsystem: "Hardware Lab",
    description: "Multi-layer PCB defect isolation, oscilloscope probing, schematic correlation.",
  },
  {
    offset: "0x0034",
    registerName: "DEV_PY_SCRIPT",
    bits: "[15:0]",
    field: "Python & Shell Regressions",
    access: "RW",
    level: "Working",
    subsystem: "Languages",
    description: "Vector generators, log parsing, automated regression test runs, git workflow.",
  },
  {
    offset: "0x0038",
    registerName: "VHDL_LEGACY_MDL",
    bits: "[7:0]",
    field: "VHDL RTL Modeling",
    access: "RW",
    level: "Familiar",
    subsystem: "Digital RTL",
    description: "Directed self-checking testbenches and ASIC flow modules.",
  },
  {
    offset: "0x003C",
    registerName: "DFT_SCAN_INSERT",
    bits: "[7:0]",
    field: "DFT & Scan Chains",
    access: "RO",
    level: "Familiar",
    subsystem: "ASIC Flow",
    description: "Scan chain methodology, boundary scan concepts, fault coverage metrics.",
  },
];
export interface JourneyItem {
  id: string;
  title: string;
  org: string;
  type: "Internship" | "Full-time" | "Degree" | "Diploma" | "Leadership";
  category: "experience" | "education" | "leadership";
  when: string;
  duration?: string;
  location: string;
  mode?: "On-site" | "Hybrid" | "Remote";
  isCurrent?: boolean;
  grade?: string;
  points: string[];
  skills?: string[];
  credential?: string;
}

export const timeline: JourneyItem[] = [
  {
    id: "silicon-sandbox",
    title: "Trainee – Advanced RTL Design & Verification Intern",
    org: "The Silicon Sandbox",
    type: "Internship",
    category: "experience",
    when: "Jun 2026 – Present",
    duration: "5 mos",
    location: "Bengaluru, Karnataka, India",
    mode: "On-site",
    isCurrent: true,
    points: [
      "Advanced industrial training in RTL design, SystemVerilog, and Universal Verification Methodology (UVM).",
      "Building constrained-random verification environments, scoreboard/monitors, assertions (SVA), and functional coverage closure in Cadence Xcelium.",
      "Hands-on low-power design methodology using Unified Power Format (UPF).",
      "The Silicon Sandbox, Bangalore (MSME Registered, AICTE & VTU Approved)."
    ],
    skills: ["Low Power Design (UPF)", "UVM", "SystemVerilog", "RTL Design", "Cadence Xcelium", "SVA"],
    credential: "Offer letter: RTL Verification Intern"
  },
  {
    id: "velaxtra",
    title: "Sr Embedded Firmware Engineer",
    org: "Velaxtra Pvt Ltd",
    type: "Full-time",
    category: "experience",
    when: "Oct 2025 – Jun 2026",
    duration: "9 mos",
    location: "Bengaluru, Karnataka, India",
    mode: "On-site",
    points: [
      "Engineered production embedded firmware and device drivers for industrial & smart asset hardware.",
      "Implemented high-reliability UART, SPI, I2C, ADC, and PWM peripheral drivers.",
      "Configured FreeRTOS preemptive task scheduling, queues, and mutexes for hard real-time systems.",
      "Collaborated with hardware and board designers for seamless board bring-up and firmware-to-hardware defect isolation."
    ],
    skills: ["Embedded C", "FreeRTOS", "UART / SPI / I2C", "Board Bring-Up", "STM32", "Real-Time Systems"]
  },
  {
    id: "minilec",
    title: "Embedded System Engineer",
    org: "Minilec India Private Limited",
    type: "Full-time",
    category: "experience",
    when: "Jul 2024 – Sep 2025",
    duration: "1 yr 3 mos",
    location: "Pune City, Maharashtra, India",
    mode: "On-site",
    points: [
      "Designed and debugged STM32 / ARM Cortex-M embedded control systems for high-volume production units.",
      "Conducted extensive multi-layer PCB-level debugging, signal-integrity diagnostics, and schematic-to-board correlation.",
      "Diagnosed and resolved analog signal-conditioning anomalies and intermittent industrial field faults.",
      "Streamlined production testing procedures for motor protection and industrial monitoring relays."
    ],
    skills: ["STM32", "ARM Cortex-M", "PCB Debugging", "Signal Integrity", "Industrial Controls", "Analog Diagnostics"]
  },
  {
    id: "saksham",
    title: "Analog Circuit Design Intern",
    org: "Saksham Semiconductors",
    type: "Internship",
    category: "experience",
    when: "May 2024 – Jul 2024",
    duration: "3 mos",
    location: "Hyderabad, Telangana, India",
    mode: "On-site",
    points: [
      "Characterized MOSFET small-signal and large-signal behavior across process, voltage, and temperature corners.",
      "Designed and simulated CMOS current-mirror references and differential-amplifier topologies in SPICE.",
      "Conducted DC, AC, transient, and parametric sweep analyses for analog front-end blocks."
    ],
    skills: ["Analog Circuit Design", "CMOS Analog Design", "SPICE Simulation", "MOSFET Characterization", "Differential Amplifiers"],
    credential: "Certificate of Internship: Analog Circuit Design (Saksham Semiconductors)"
  },
  {
    id: "mit-btech",
    title: "Bachelor of Technology — Electronics & Communication Engineering",
    org: "MAEER's MIT College of Railway Engineering & Research, Barshi",
    type: "Degree",
    category: "education",
    when: "Aug 2023 – Jun 2026",
    location: "Barshi, Maharashtra, India",
    grade: "CGPA: 7.86",
    points: [
      "Coursework and independent projects spanning RTL design, digital VLSI architectures, and SoC verification alongside the core EXTC curriculum.",
      "Specialized in digital IC design, processor pipelines (RV32I RISC-V), and hardware description languages (Verilog, SystemVerilog).",
      "Active contributor to robotics and embedded electronics labs."
    ],
    skills: ["VLSI Design", "RTL Architecture", "SoC Verification", "Digital Systems", "Embedded Hardware"]
  },
  {
    id: "mit-diploma",
    title: "Diploma of Education — Railway Engineering",
    org: "MAEER's MIT College of Railway Engineering & Research, Barshi, Solapur",
    type: "Diploma",
    category: "education",
    when: "Sep 2021 – Jul 2024",
    location: "Barshi, Solapur, Maharashtra, India",
    grade: "Grade: 9.6 / 10",
    points: [
      "Graduated with distinction with deep foundations in electrical machines, instrumentation, control systems, and power electronics.",
      "Practical training in industrial automation, circuit troubleshooting, and electrical distribution."
    ],
    skills: ["Electrical Engineering", "Control Systems", "Power Electronics", "Circuit Analysis"]
  },
  {
    id: "mit-lead",
    title: "Vice President — ETSA (Electronics & Telecommunication Students Association)",
    org: "MAEER's MIT College of Railway Engineering & Research",
    type: "Leadership",
    category: "leadership",
    when: "2024 – 2025",
    location: "Barshi, Maharashtra, India",
    points: [
      "Organized technical workshops and competitive hackathons for 200+ engineering students.",
      "Mentored juniors on embedded systems, microcontroller firmware, and VLSI career pathways."
    ],
    skills: ["Technical Mentorship", "Student Leadership", "Workshop Management"]
  }
];
export const certifications: { name: string; issuer: string; note?: string }[] = [
  { name: "Advanced RTL Design & Verification", issuer: "The Silicon Sandbox", note: "In progress, due Dec 2026. MSME Registered, AICTE & VTU Approved" },
  { name: "VLSI System On Chip (SoC) Design", issuer: "Maven Silicon" },
  { name: "RTL Design & Verification", issuer: "ChipXpert" },
  { name: "VLSI Design Flow: RTL to GDS", issuer: "ChipXpert" },
  { name: "Semiconductor Technology", issuer: "IIT (BHU), Varanasi" },
  { name: "ARM Cortex-M3 LPC1768 Microcontroller", issuer: "Indian Institute of Embedded Systems" },
  { name: "ARM Assembly Programming Foundations", issuer: "OliveStem U" },
];
