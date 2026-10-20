const fs = require('fs');
const path = require('path');

function createSimplePDF({ title, subject, sections }) {
  // Simple PDF 1.4 generator in pure JS
  let objects = [];
  function addObject(content) {
    objects.push(content);
    return objects.length;
  }

  // 1: Catalog
  // 2: Pages
  // 3: Page 1
  // 4: Font Helvetica
  // 5: Font Helvetica-Bold
  // 6: Page content stream

  let textLines = [];
  let y = 750;
  const left = 50;

  function addTitle(txt) {
    textLines.push(`BT /F2 18 Tf ${left} ${y} Td (${escapePDF(txt)}) Tj ET`);
    y -= 22;
  }

  function addSubtitle(txt) {
    textLines.push(`BT /F2 10 Tf ${left} ${y} Td (${escapePDF(txt)}) Tj ET`);
    y -= 14;
  }

  function addHeader(txt) {
    y -= 6;
    textLines.push(`BT /F2 12 Tf ${left} ${y} Td (${escapePDF(txt.toUpperCase())}) Tj ET`);
    textLines.push(`0.2 G 1 w ${left} ${y - 3} m 550 ${y - 3} l S`);
    y -= 15;
  }

  function addSubheader(title, meta) {
    textLines.push(`BT /F2 10 Tf ${left} ${y} Td (${escapePDF(title)}) Tj ET`);
    if (meta) {
      textLines.push(`BT /F1 9 Tf 350 ${y} Td (${escapePDF(meta)}) Tj ET`);
    }
    y -= 13;
  }

  function addBullet(txt) {
    const maxLen = 85;
    if (txt.length <= maxLen) {
      textLines.push(`BT /F1 9 Tf ${left + 10} ${y} Td (\x95 ${escapePDF(txt)}) Tj ET`);
      y -= 12;
    } else {
      let words = txt.split(' ');
      let l1 = '', l2 = '';
      for (let w of words) {
        if ((l1 + ' ' + w).length <= maxLen && l2 === '') {
          l1 += (l1 ? ' ' : '') + w;
        } else {
          l2 += (l2 ? ' ' : '') + w;
        }
      }
      textLines.push(`BT /F1 9 Tf ${left + 10} ${y} Td (\x95 ${escapePDF(l1)}) Tj ET`);
      y -= 11;
      if (l2) {
        textLines.push(`BT /F1 9 Tf ${left + 18} ${y} Td (${escapePDF(l2)}) Tj ET`);
        y -= 12;
      }
    }
  }

  function addText(txt) {
    textLines.push(`BT /F1 9 Tf ${left} ${y} Td (${escapePDF(txt)}) Tj ET`);
    y -= 12;
  }

  function escapePDF(str) {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  // Populate document
  for (let sec of sections) {
    if (sec.type === 'title') addTitle(sec.text);
    else if (sec.type === 'subtitle') addSubtitle(sec.text);
    else if (sec.type === 'header') addHeader(sec.text);
    else if (sec.type === 'sub') addSubheader(sec.title, sec.meta);
    else if (sec.type === 'bullet') addBullet(sec.text);
    else if (sec.type === 'text') addText(sec.text);
  }

  const streamContent = textLines.join('\n');
  const streamLength = Buffer.byteLength(streamContent);

  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`;
  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`;
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 6 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> >>\nendobj`;
  const obj4 = `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`;
  const obj5 = `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`;
  const obj6 = `6 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`;

  const allObjs = [obj1, obj2, obj3, obj4, obj5, obj6];

  let body = '%PDF-1.4\n';
  let offsets = [];

  for (let i = 0; i < allObjs.length; i++) {
    offsets.push(Buffer.byteLength(body));
    body += allObjs[i] + '\n';
  }

  const xrefOffset = Buffer.byteLength(body);
  body += `xref\n0 ${allObjs.length + 1}\n`;
  body += `0000000000 65535 f \n`;
  for (let off of offsets) {
    body += `${String(off).padStart(10, '0')} 00000 n \n`;
  }
  body += `trailer\n<< /Size ${allObjs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(body, 'utf-8');
}

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// 1. RTL / DV Resume
const rtlSections = [
  { type: 'title', text: 'Abhijit Karale' },
  { type: 'subtitle', text: 'RTL Design & Verification Engineer | SystemVerilog | UVM | Formal Verification' },
  { type: 'subtitle', text: 'Ahmedabad, India | abhijitkarale8@gmail.com | +91 9552067110 | linkedin.com/in/abhijitkarale | github.com/abhijitkarale' },
  { type: 'header', text: 'Professional Summary' },
  { type: 'text', text: 'RTL Design and Verification Engineer with strong expertise in SystemVerilog, UVM, and Formal Verification (JasperGold).' },
  { type: 'text', text: 'Hands-on experience in 5-stage RISC-V core design, APB bus slaves, CDC-safe dual-clock FIFOs, and Cadence Xcelium.' },
  { type: 'text', text: 'Unique dual advantage: 2+ years of embedded firmware and board bring-up allowing correlation of silicon issues to real boards.' },
  { type: 'header', text: 'Technical Skills' },
  { type: 'bullet', text: 'HDLs & Languages: SystemVerilog, Verilog, VHDL, C/C++, Embedded C, Python, Shell Scripting' },
  { type: 'bullet', text: 'Verification Methodologies: UVM, Constrained-Random, SVA, Functional/Code Coverage, Formal Verification (JasperGold)' },
  { type: 'bullet', text: 'EDA Tools: Cadence Xcelium, JasperGold, Synopsys Design Compiler, QuestaSim, Vivado, ModelSim, Verdi' },
  { type: 'bullet', text: 'Protocols & Architecture: RISC-V (RV32I), AMBA-APB, AXI4-Lite, Gray-code CDC FIFOs, UART, SPI, I2C, Low Power (UPF)' },
  { type: 'header', text: 'Experience & Training' },
  { type: 'sub', title: 'The Silicon Sandbox — Trainee - Advanced RTL Design & Verification Intern', meta: 'Jun 2026 - Present | Bangalore' },
  { type: 'bullet', text: 'Advanced industrial verification in SystemVerilog and Universal Verification Methodology (UVM).' },
  { type: 'bullet', text: 'Developed constrained-random tests, drivers, scoreboards, and functional coverage closure in Cadence Xcelium.' },
  { type: 'bullet', text: 'Applied Low Power Design concepts with Unified Power Format (UPF) on digital architectures.' },
  { type: 'sub', title: 'Velaxtra Pvt Ltd — Sr Embedded Firmware Engineer', meta: 'Oct 2025 - Jun 2026 | Bangalore' },
  { type: 'bullet', text: 'Developed embedded C firmware, peripheral drivers (UART, SPI, I2C, ADC, PWM) and FreeRTOS task scheduling.' },
  { type: 'bullet', text: 'Led board-level defect isolation, correlating hardware timing anomalies with firmware behavior.' },
  { type: 'sub', title: 'Minilec India Pvt Ltd — Embedded System Engineer', meta: 'Jul 2024 - Sep 2025 | Pune' },
  { type: 'bullet', text: 'Designed and debugged STM32 / ARM Cortex-M control systems, multi-layer PCB signal integrity, and analog circuits.' },
  { type: 'sub', title: 'Saksham Semiconductors — Analog Circuit Design Intern', meta: 'May 2024 - Jul 2024 | Hyderabad' },
  { type: 'bullet', text: 'Characterized MOSFET behavior, designed current mirrors and differential amplifiers using SPICE simulations.' },
  { type: 'header', text: 'Key RTL & Verification Projects' },
  { type: 'sub', title: '32-bit RISC-V (RV32I) Pipelined Core & Layered UVM Environment', meta: 'SystemVerilog, UVM, Xcelium' },
  { type: 'bullet', text: 'Designed 5-stage pipeline with hazard detection and operand forwarding; built layered UVM testbench achieving 95%+ coverage.' },
  { type: 'sub', title: 'Memory Controller with Formal Property Verification (JasperGold)', meta: 'SystemVerilog, SVA, JasperGold' },
  { type: 'bullet', text: 'Wrote comprehensive SVA properties for address boundaries and no-read-before-write; achieved 100% formal mathematical proofs.' },
  { type: 'sub', title: 'Parameterizable Asynchronous FIFO with Gray-code CDC', meta: 'Verilog, CDC, SVA' },
  { type: 'bullet', text: 'Implemented 2-flip-flop synchronizers, Gray pointer conversion, full/empty flag generation with zero metastability.' },
  { type: 'header', text: 'Education' },
  { type: 'sub', title: "MAEER's MIT College of Railway Engineering & Research, Barshi — B.Tech EXTC", meta: '2023 - 2026 | CGPA: 7.86' },
  { type: 'sub', title: "MAEER's MIT College of Railway Engineering & Research — Diploma in Railway Engineering", meta: '2021 - 2024 | Grade: 9.6' }
];

// 2. Embedded Resume
const embSections = [
  { type: 'title', text: 'Abhijit Karale' },
  { type: 'subtitle', text: 'Embedded Systems & Firmware Engineer | STM32 | ARM Cortex-M | FreeRTOS | Hardware Bring-Up' },
  { type: 'subtitle', text: 'Ahmedabad, India | abhijitkarale8@gmail.com | +91 9552067110 | linkedin.com/in/abhijitkarale | github.com/abhijitkarale' },
  { type: 'header', text: 'Professional Summary' },
  { type: 'text', text: 'Embedded Systems and Firmware Engineer with 2+ years of production experience in firmware architecture and board bring-up.' },
  { type: 'text', text: 'Expertise in STM32 / ARM Cortex-M, Nordic nRF52 BLE, FreeRTOS preemptive multitasking, and peripheral driver development.' },
  { type: 'text', text: 'Adept in laboratory hardware debugging: multi-layer PCB fault isolation, oscilloscope signal analysis, and analog conditioning.' },
  { type: 'header', text: 'Technical Skills' },
  { type: 'bullet', text: 'Microcontrollers & Platforms: STM32, ARM Cortex-M0/M3/M4, Nordic nRF52840/nRF52833, LPC1768, 8/32-bit MCUs' },
  { type: 'bullet', text: 'Firmware & Software: Embedded C, C++, FreeRTOS (tasks, queues, mutexes, semaphores), Bare-metal, Bare-metal HAL, Git' },
  { type: 'bullet', text: 'Communication Protocols: UART, SPI, I2C, BLE 5.0 (Low-Power System ON/OFF), RS-485, Modbus, ADC, PWM, GPIO' },
  { type: 'bullet', text: 'Hardware & Lab Tools: Multi-layer PCB Debugging, Signal Integrity, Oscilloscopes, Logic Analyzers, Multimeters, Soldering' },
  { type: 'bullet', text: 'Development Environments: Keil uVision, STM32CubeIDE, Nordic nRF Connect SDK, J-Link, OpenOCD' },
  { type: 'header', text: 'Professional Experience' },
  { type: 'sub', title: 'Velaxtra Pvt Ltd — Sr Embedded Firmware Engineer', meta: 'Oct 2025 - Jun 2026 | Bangalore' },
  { type: 'bullet', text: 'Architected and implemented production embedded C firmware for smart industrial and remote-asset monitoring devices.' },
  { type: 'bullet', text: 'Developed non-blocking drivers for UART, SPI, I2C, ADC, and PWM peripherals managed under FreeRTOS priority queues.' },
  { type: 'bullet', text: 'Accelerated board bring-up by correlating firmware execution traces with hardware oscilloscope captures.' },
  { type: 'sub', title: 'Minilec India Pvt Ltd — Embedded System Engineer', meta: 'Jul 2024 - Sep 2025 | Pune' },
  { type: 'bullet', text: 'Engineered STM32 and ARM Cortex-M control firmware for high-volume industrial motor protection and monitoring relays.' },
  { type: 'bullet', text: 'Diagnosed analog signal-conditioning circuits, resolved PCB signal-integrity issues, and eliminated intermittent field faults.' },
  { type: 'bullet', text: 'Standardized factory production testing and hardware verification procedures for electronic relay units.' },
  { type: 'sub', title: 'Saksham Semiconductors — Analog Circuit Design Intern', meta: 'May 2024 - Jul 2024 | Hyderabad' },
  { type: 'bullet', text: 'Simulated MOSFET characteristics and designed differential amplifiers and current mirrors in SPICE.' },
  { type: 'sub', title: 'The Silicon Sandbox — Trainee, Advanced RTL & Verification', meta: 'Jun 2026 - Present | Bangalore' },
  { type: 'bullet', text: 'Gained advanced RTL architecture, SystemVerilog, and UVM verification training bridging firmware with silicon design.' },
  { type: 'header', text: 'Key Hardware & Embedded Projects' },
  { type: 'sub', title: 'Multi-Peripheral Industrial Firmware Engine', meta: 'STM32, FreeRTOS, Embedded C' },
  { type: 'bullet', text: 'Built robust preemptive multitasking framework integrating 5 peripherals (UART, SPI, I2C, ADC, PWM) with zero task starvation.' },
  { type: 'sub', title: 'Ultra-Low-Power BLE Firmware for Edge Devices', meta: 'Nordic nRF52840, BLE, Low Power' },
  { type: 'bullet', text: 'Optimized battery autonomy via fine-grained System ON / System OFF sleep states and RTC wake-up triggers.' },
  { type: 'sub', title: 'Industrial SCR Motor Drive Firing Package Diagnostics', meta: 'Komatsu/Joy SCR 601849-121' },
  { type: 'bullet', text: 'Isolated firing-circuit failure modes in high-power industrial SCR motor drive modules and established testing protocol.' },
  { type: 'header', text: 'Education & Leadership' },
  { type: 'sub', title: "MAEER's MIT College of Railway Engineering & Research, Barshi — B.Tech EXTC", meta: '2023 - 2026 | CGPA: 7.86' },
  { type: 'sub', title: "MAEER's MIT College of Railway Engineering & Research — Diploma in Railway Engineering", meta: '2021 - 2024 | Grade: 9.6' },
  { type: 'sub', title: 'Vice President — ETSA (Electronics & Telecomm Students Association)', meta: '2024 - 2025' }
];

fs.writeFileSync(path.join(publicDir, 'Abhijit_Karale_RTL_DV_Resume.pdf'), createSimplePDF({ title: 'Abhijit Karale - RTL & DV Resume', sections: rtlSections }));
fs.writeFileSync(path.join(publicDir, 'Abhijit_Karale_Embedded_Resume.pdf'), createSimplePDF({ title: 'Abhijit Karale - Embedded Resume', sections: embSections }));

console.log('Successfully generated both PDF resumes into public directory!');
