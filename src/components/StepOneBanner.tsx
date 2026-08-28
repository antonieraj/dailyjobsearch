import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Clock, MapPin, Building, Sparkles } from 'lucide-react';

export const StepOneBanner: React.FC = () => {
  return (
    <div className="bg-[#101014] border-b border-[#222226] text-[#F0F0F0] py-4 px-4 sm:px-6 shadow-inner">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Main Statement */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-[11px] font-extrabold font-mono tracking-wider uppercase">
                STEP 1 MANDATE
              </span>
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight font-display flex items-center gap-2">
                100 Verified-Active Job Matches &amp; Direct ATS Verification
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed font-normal">
              Every position has been evaluated against the candidate resume with defensible <strong className="text-emerald-400 font-semibold">0–100% match scores</strong>, fully disclosed <strong className="text-amber-400 font-semibold">material gaps</strong>, authoritative <strong className="text-indigo-400 font-semibold">direct employer ATS URLs</strong>, and verified active submission pathways.
            </p>
          </div>

          {/* Core Rule Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="flex items-center space-x-1.5 bg-[#161619] px-3 py-2 rounded-xl border border-[#27272A] shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-zinc-200 font-medium">100% Direct ATS</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#161619] px-3 py-2 rounded-xl border border-[#27272A] shadow-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-zinc-200 font-medium">Deadline &ge; Today</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#161619] px-3 py-2 rounded-xl border border-[#27272A] col-span-2 sm:col-span-1 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-zinc-200 font-medium">Applied Exclusions</span>
            </div>
          </div>

        </div>

        {/* Disclaimer / Step 1 Scope Rule */}
        <div className="mt-3 pt-2.5 border-t border-[#1E1E22] flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-[11px]">
              <strong className="text-zinc-200">Scope Enforcement:</strong> Discovery, ATS verification, gap analysis &amp; ranking ONLY. No resume tailoring or ZIP packages generated in Step 1.
            </span>
          </div>
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
            Live 2026 Direct Employer ATS Sweep
          </span>
        </div>
      </div>
    </div>
  );
};
