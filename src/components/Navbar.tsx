import React from 'react';
import { 
  Briefcase, 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  Download, 
  Landmark, 
  Sparkles,
  Search,
  SlidersHorizontal,
  TableProperties,
  LayoutGrid
} from 'lucide-react';

interface NavbarProps {
  totalActiveCount: number;
  appliedCount: number;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  onOpenProfile: () => void;
  onOpenReport: () => void;
  onOpenQc: () => void;
  onOpenStateGov: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalActiveCount,
  appliedCount,
  viewMode,
  setViewMode,
  onOpenProfile,
  onOpenReport,
  onOpenQc,
  onOpenStateGov
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#222226] text-[#F0F0F0] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & App Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#161619] border border-[#27272A] flex items-center justify-center shadow-md">
              <Briefcase className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-display">
                  Daily Job Matches
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  STEP 1: VERIFIED ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium hidden sm:block">
                Direct Employer Discovery &amp; 0–100% Resume Match Verification
              </p>
            </div>
          </div>

          {/* Center Stats Badges */}
          <div className="hidden md:flex items-center space-x-2.5 bg-[#121214] px-3.5 py-1.5 rounded-xl border border-[#222226] text-xs font-mono">
            <div className="flex items-center space-x-1.5 text-zinc-300">
              <span className="font-bold text-emerald-400">{totalActiveCount}</span>
              <span className="text-zinc-400">Verified</span>
            </div>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <span>Applied Exclusions:</span>
              <span className="font-bold text-amber-400">{appliedCount}</span>
            </div>
            <span className="text-zinc-700">|</span>
            <span className="text-indigo-400 font-semibold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              100% Direct ATS
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#121214] rounded-lg p-0.5 border border-[#222226]">
              <button
                id="toggle-grid-view"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs font-semibold transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                id="toggle-table-view"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs font-semibold transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Dense Table View"
              >
                <TableProperties className="w-4 h-4" />
              </button>
            </div>

            {/* State Gov Portal Search Tool */}
            <button
              id="open-state-gov-btn"
              onClick={onOpenStateGov}
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#121214] hover:bg-[#1A1A1E] text-zinc-200 border border-[#27272A] hover:border-zinc-600 transition-colors"
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>State Gov Search</span>
            </button>

            {/* QC Audit Checklist */}
            <button
              id="open-qc-btn"
              onClick={onOpenQc}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#121214] hover:bg-[#1A1A1E] text-zinc-200 border border-[#27272A] hover:border-zinc-600 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">12-Point QC</span>
            </button>

            {/* Profile & Search Parameters */}
            <button
              id="open-profile-btn"
              onClick={onOpenProfile}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#121214] hover:bg-[#1A1A1E] text-zinc-200 border border-[#27272A] hover:border-zinc-600 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Resume &amp; Search Params</span>
            </button>

            {/* Export Step 1 Final Report */}
            <button
              id="export-report-btn"
              onClick={onOpenReport}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all border border-indigo-400/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export 100 Jobs</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
