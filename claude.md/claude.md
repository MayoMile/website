# MayoMile Website Technical Blueprint & Execution Guide

This document establishes the comprehensive technical blueprint, branding guidelines, and implementation roadmap for building the professional, high-converting recruiting website for **MayoMile** commercial logistics. 

It synthesizes the advanced design and deployment methodologies derived from top developer workflows using the Claude ecosystem (Claude Artifacts, Claude Code, and Anthropic APIs).

---

## 1. Information Retrieval & Claude Web Workflows
To bypass generic, "AI-vibe-coded" landing pages, our architecture incorporates several key hacks and advanced web development workflows:

### A. Core Configuration & Design Skills
*   **The `claude.md` System File**: We establish a local `claude.md` file in our root workspace directory [570]. This file serves as a persistent system prompt, instructing Claude on our branding constraints, formatting preferences, and workflow rules so that we do not have to re-explain the brand in every fresh chat session [189, 487].
*   **Front-End Design Skill (Anthropic-Vetted)**: We globally install and invoke Anthropic's native `front-end-design` skill [490]. This guides Claude to avoid standard boilerplate styling and instead reach for high-craft typography, layout grids, and elegant micro-interactions [449, 491].
*   **UI/UX ProMax Skill**: An advanced reference skill installed via NPM globally that supplies extensive color palettes, typography pairings, and modern responsive layouts [450, 451].

### B. Prototyping & The Screenshot Loop
*   **Automated Screenshot Quality Loops**: In our `claude.md`, we define a screenshot workflow powered by Puppeteer [499]. When Claude Code writes or edits the website codebase locally, it programmatically launches a headless browser, takes screenshots of the page, and conducts a multi-pass visual review to compare the actual layout against the target reference designs, self-correcting any visual rendering bugs [497, 498, 505, 506].
*   **Section-by-Section Iteration**: Building an entire site in a single chat thread leads to context overpopulation, where Claude begins to hallucinate or degrade in reasoning quality [674]. Our roadmap enforces a strict section-by-section workflow [676]. We start by wireframing draft skeletons in Claude Design, then move those components into a fresh Claude Code session where our custom **MayoMile Brand Skill** applies our styling system [675, 677].

### C. Advanced Competitive Research & QA
*   **Mobin MCP Integration**: To establish our look and feel, we connect Claude to Mobin via a Custom MCP Connector [640, 641]. This allows Claude to browse real-world, award-winning UI patterns of top logistics and fintech portals to inform our wireframes and layout decisions [637, 638, 642].
*   **Brand QA Verification Skill**: We compile a dedicated Quality Assurance (QA) skill [711, 712]. Once a section is written, we invoke this skill; it takes screenshots of our local build, compares them against our brand guidelines and reference files, and generates a structured verdict table highlighting any visual drift, spacing errors, or text contrast violations [712, 713, 714].

### D. Production Deployment Pipelines
*   **The GitHub-Vercel Autodeploy Pipeline (Recommended Best Practice)**: We push our local workspace repository to GitHub, configuring Vercel to watch our main branch [521, 715]. Any local adjustments or bug-fixes pushed via Claude Code automatically trigger Vercel to rebuild and update the production domain within seconds [521, 529].
*   **Hostinger / Netlify Drag-and-Drop alternative**: For rapid static hosting, we instruct Claude to compress only the contents of our build directory into a flat `archive.zip` (excluding the parent folder itself to avoid nesting errors) and migrate it straight to a fast CDN provider [478, 480, 551].

---

## 2. Brand Architecture & Requirements

To capture high-quality drivers, the website is structured around an **authority-first, driver-centric narrative** [614]:
*   **MayoMile Heritage**: Boldly showcases leadership by experienced drivers who understand road realities. This separates MayoMile from typical tech startups selling freight arbitrage [681].
*   **recruiting Hook**: High-impact presentation of the core compensation model:
    *   **$1,700/week guaranteed minimum pay floor** (covers up to 2,300 miles)
    *   **$0.67 per mile overage** for all miles run exceeding 2,300 miles/week
*   **Visual Persona**: An "editorial wealth" and "warm humanist" treatment appropriate for modern logistics [644, 647]. We use deep, high-impact navy blue backgrounds, clean metallic-accent borders, and bold serif/sans-serif typography pairings [647].

---

## 3. MayoMile Code Framework: Single-Page React & Tailwind SPA

The following React component code is a self-contained, fully-styled, and responsive implementation of the MayoMile recruiting portal. It includes an **interactive Driver Compensation Calculator** designed to drive conversions.

```jsx
import React, { useState } from 'react';

export default function MayoMilePortal() {
  const [weeklyMiles, setWeeklyMiles] = useState(2500);

  // MayoMile Compensation Logic
  const BASE_PAY = 1700.00;
  const BASE_MILE_THRESHOLD = 2300;
  const OVERAGE_RATE = 0.67;

  const overageMiles = Math.max(0, weeklyMiles - BASE_MILE_THRESHOLD);
  const overagePay = overageMiles * OVERAGE_RATE;
  const totalWeeklyPay = BASE_PAY + overagePay;
  const estimatedAnnualPay = totalWeeklyPay * 52;

  const handleSliderChange = (e) => {
    setWeeklyMiles(parseInt(e.target.value));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* SVG Logo Placeholder */}
            <svg className="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 15v-3h-3v3H8v-3H5v3H3v2h18v-2h-2zM5 10V5h3v3h8V5h3v5H5z" />
            </svg>
            <span className="text-xl font-bold tracking-wider text-slate-50 uppercase">
              Mayo<span className="text-amber-500">Mile</span>
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <a href="#home" className="hover:text-amber-500 transition-colors">Home</a>
            <a href="#calculator" className="hover:text-amber-500 transition-colors">Driver Pay</a>
            <a href="#about" className="hover:text-amber-500 transition-colors">About Us</a>
            <a href="#apply" className="hover:text-amber-500 transition-colors">Apply</a>
          </nav>
          
          <div>
            <a 
              href="#apply" 
              className="inline-flex items-center px-5 py-2.5 rounded border border-amber-500 text-amber-500 font-semibold tracking-wide text-xs hover:bg-amber-500 hover:text-slate-950 transition-all duration-300"
            >
              APPLY TODAY
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative py-24 md:py-32 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full mb-6 text-amber-500 text-xs font-semibold tracking-wider uppercase">
              <span>★ Driver-Led &amp; Built for the Road</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Driver-First Freight Logistics.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                Respecting Your Craft.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
              MayoMile is built by drivers, for drivers. We don't sell dispatch illusions or AI logistics gimmicks. We guarantee a rock-solid minimum pay floor and real rewards for your mileage. 
            </p>

            {/* recruiting Pay Guarantee Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-l-4 border-amber-500 rounded-r-lg p-6 mb-10 shadow-2xl">
              <h3 className="text-xs uppercase font-bold tracking-widest text-amber-500 mb-2">Weekly Income Floor</h3>
              <p className="text-2xl sm:text-3xl font-black text-white">$1,700/Week Minimum Pay Guarantee</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">Plus $0.67 per mile on all mileage running over 2,300 miles per week.</p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#apply" 
                className="inline-flex justify-center items-center px-8 py-4 rounded bg-amber-500 text-slate-950 font-bold tracking-wider text-sm hover:bg-amber-400 transition-colors shadow-lg hover:shadow-amber-500/20"
              >
                JOIN OUR FLEET
              </a>
              <a 
                href="#calculator" 
                className="inline-flex justify-center items-center px-8 py-4 rounded bg-slate-900 border border-slate-800 text-white font-semibold tracking-wider text-sm hover:bg-slate-800 transition-colors"
              >
                CALCULATE EARNINGS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE COMPENSATION CALCULATOR */}
      <section id="calculator" className="py-24 bg-slate-900/40 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">No Guesswork. Know Your Pay.</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Slide the calculator to estimate your actual weekly and annual compensation with MayoMile's driver-first pay formula.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-950/80 border border-slate-800 rounded-xl p-8 sm:p-12 shadow-2xl">
            {/* Left Col: Interactive Controls */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Estimate Weekly Mileage</h3>
              
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-slate-400">Weekly Target Miles</span>
                  <span className="text-2xl font-black text-amber-500">{weeklyMiles.toLocaleString()} miles</span>
                </div>
                
                <input 
                  type="range" 
                  min="1500" 
                  max="3500" 
                  step="50" 
                  value={weeklyMiles} 
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                />
                
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>1,500 mi</span>
                  <span>2,300 mi (Floor Threshold)</span>
                  <span>3,500 mi</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-900 pb-3 text-sm">
                  <span className="text-slate-400">Guaranteed Weekly Floor</span>
                  <span className="font-semibold text-white">${BASE_PAY.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-3 text-sm">
                  <span className="text-slate-400">Overage Miles driven (&gt;2,300)</span>
                  <span className="font-semibold text-amber-500">{overageMiles} miles</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-3 text-sm">
                  <span className="text-slate-400">Overage Pay Rate</span>
                  <span className="font-semibold text-white">${OVERAGE_RATE.toFixed(2)} / mile</span>
                </div>
              </div>
            </div>

            {/* Right Col: Pay Visualizations */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-8 text-center flex flex-col justify-between h-full">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-4">Estimated Total Weekly Pay</h4>
                <div className="text-5xl font-black text-white mb-2">
                  ${totalWeeklyPay.toFixed(2)}
                </div>
                <div className="inline-flex items-center space-x-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-green-400 text-xs font-semibold">
                  <span>✓ Standard Minimum Pay Met</span>
                </div>
              </div>

              <div className="border-t border-slate-850 my-8 pt-8">
                <h4 className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-2">Estimated Annualized Income</h4>
                <div className="text-3xl font-black text-amber-400">
                  ${estimatedAnnualPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-slate-500 mt-2">Calculated over a standard 52-week operating year.</p>
              </div>

              <a 
                href="#apply" 
                className="block w-full py-4 rounded bg-amber-500 text-slate-950 font-bold tracking-wider text-sm hover:bg-amber-400 transition-colors uppercase"
              >
                LOCK IN THIS RATE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY MAYOMILE SECTION */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
              Honest Logistics. Built by Real Road Professionals.
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              At MayoMile, we respect the road. Our management consists entirely of former commercial drivers. We designed our business model around the operational and financial realities of high-capacity transportation. 
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Our operations never compromise on safety, road compliance, or equipment standards. We establish clear pay expectations with zero hidden deductions.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-amber-500 pl-4">
                <span className="block text-2xl font-black text-white">$500/Wk</span>
                <span className="text-xs text-slate-500">Baseline Truck Fixed Cost</span>
              </div>
              <div className="border-l-2 border-amber-500 pl-4">
                <span className="block text-2xl font-black text-white">Top-Tier</span>
                <span className="text-xs text-slate-500">Late-Model Fleet Equipment</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 p-6 border border-slate-800 rounded">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold mb-4">1</div>
              <h3 className="text-lg font-bold text-slate-50 mb-2">Weekly Income Floor</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Never worry about sluggish freight weeks. The $1,700 base pay guarantee provides absolute security.</p>
            </div>
            <div className="bg-slate-900/60 p-6 border border-slate-800 rounded">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold mb-4">2</div>
              <h3 className="text-lg font-bold text-slate-50 mb-2">Modern Fleet Standard</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Access clean, fully-serviced late-model vehicles backed by a dedicated fixed maintenance model.</p>
            </div>
            <div className="bg-slate-900/60 p-6 border border-slate-800 rounded">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold mb-4">3</div>
              <h3 className="text-lg font-bold text-slate-50 mb-2">Overage Performance</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Earn a robust $0.67 per mile on all overage runs. Drive extra, get rewarded immediately.</p>
            </div>
            <div className="bg-slate-900/60 p-6 border border-slate-800 rounded">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold mb-4">4</div>
              <h3 className="text-lg font-bold text-slate-50 mb-2">True Driver Culture</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Dispatch schedules designed by veteran operators who protect driver safety and home-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DRIVER APPLICATION FORM */}
      <section id="apply" className="py-24 bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-950 border border-slate-800 rounded-xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white mb-3">Join the MayoMile Fleet</h2>
            <p className="text-slate-400 text-sm">
              Submit your preliminary application below. Our recruiting team will reach out within 24 business hours to discuss your routes and rates.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="(555) 000-0000" 
                  className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">CDL License Class</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors">
                  <option value="class-a">Class A CDL</option>
                  <option value="class-b">Class B CDL</option>
                  <option value="other">Other / Permit</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Years of OTR Experience</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors">
                  <option value="under-1">Less than 1 Year</option>
                  <option value="1-3">1 - 3 Years</option>
                  <option value="3-5">3 - 5 Years</option>
                  <option value="5-plus">5+ Years</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Preferred Operating Routes</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors">
                  <option value="regional">Regional (Home Weekly)</option>
                  <option value="otr">OTR (Over the Road)</option>
                  <option value="local">Local Dedicated</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full py-4 rounded bg-amber-500 text-slate-950 font-bold tracking-wider hover:bg-amber-400 transition-colors shadow-lg uppercase"
              >
                SUBMIT PRE-APPLICATION
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 15v-3h-3v3H8v-3H5v3H3v2h18v-2h-2zM5 10V5h3v3h8V5h3v5H5z" />
            </svg>
            <span className="text-lg font-bold tracking-wider text-slate-200 uppercase">
              Mayo<span className="text-amber-500">Mile</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} MayoMile Logistics LLC. All rights reserved. Recruiter Hotline: (800) 555-MAYO
          </p>

          <div className="flex space-x-6 text-xs text-slate-500">
            <a href="#home" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <a href="#home" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            <a href="#home" className="hover:text-amber-500 transition-colors">Safety Standards</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
```

---

## 4. Step-by-Step Implementation Roadmap

Our project execution strategy utilizes local workspaces and a phased developer cycle to maintain strict asset security and pixel perfection.

### Phase 1: Claude Prompting & Code Generation
1.  **Initialize the Environment**: Launch the **Claude Desktop app** [442, 445]. Ensure you have a **Pro or Max subscription** to access the local development environment [442, 484].
2.  **Mount Project Folder**: Open the **Claude Code** tab [445]. Create and select a fresh directory at `~/MayoMile-Website/` [446, 447, 486]. Click **"Trust Workspace"** [448] and choose **"Always Allow"** for local disk actions [34, 89].
3.  **Install Global Skills**: Execute the following commands in Claude Code's shell terminal to install our creative engines:
    ```bash
    # Install Anthropic's frontend-design skill globally
    npm install -g @anthropic/frontend-design
    
    # Install the UI/UX ProMax system globally for design patterns
    npm install -g @anthropic/ui-ux-promax
    ```
4.  **Create brand_assets**: Build a `brand_assets/` subdirectory [493]. Drop the `mayomile-logo.svg` inside [493].
5.  **Initialize the Prompt Sequence**: Paste this initial prompt in your Claude Code window:
    > "Configure a new website build for `MayoMile` using the `claude.md` system template. We want a modern, high-converting Single-Page Application using React and Tailwind CSS. Reference the branding folder, parse `brand_assets/mayomile-logo.svg`, and run a Puppeteer screenshot verification loop during compiling to optimize text contrast and card heights above the fold."

### Phase 2: Local Testing & Asset Customization
1.  **Launch Local Host Server**: Claude Code will compile the React dependencies and spin up a local development server, printing a `localhost` URL (e.g., `http://localhost:5173`) [17, 469, 520].
2.  **Verify the Screenshot Loop**: Look inside the newly populated `temporary_screenshots/` folder [498]. Check how Puppeteer captured your layout [499, 507]. If spacing is uneven, prompt Claude:
    > "Puppeteer captured draft card alignment. Run a 2-pass visual correction loop using the Brand Skill references to refine padding and increase our interactive slider button visibility."
3.  **Local Manual Tweaks**: To adjust code safely without breaking compilation:
    *   Use the **Pencil/Select Element tool** inside the desktop preview windows to flag specific hero layouts [470, 471].
    *   Do not push raw untested drafts directly to your master branch [527]. Always finalize and approve changes on the `localhost` first [527].

### Phase 3: One-Click Production Deployment
1.  **Configure GitHub Sync**: Instruct Claude Code to build your git configuration:
    > "Prepare our folder for remote tracking. Build a `.gitignore` excluding node modules and temporary screenshots, authenticate with GitHub, and push this to a repository named `mayomile-recruiting-portal`." [523]
2.  **Connect Vercel Integration**: 
    *   Log into your **Vercel account** and select "Import Project." [524, 525]
    *   Import `mayomile-recruiting-portal` from your connected GitHub repository [525].
    *   Vercel will detect the Tailwind configuration, build the production assets, and output a live preview URL (e.g., `mayomile-recruiting-portal.vercel.app`) [521, 525].
3.  **Apply Domain Routing**: In Vercel Project Settings &gt; Domains, purchase or claim your custom web domain (e.g., `mayomile.com`) [526]. Vercel automatically deploys SSL certs and sets up the routing pipeline [526]. Any future commits pushed by Claude Code to your GitHub repository will instantly deploy to production [521].
