import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Landmark, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Sparkles, 
  Filter, 
  CheckCircle2 
} from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onUpdateFilters: (newFilters: SearchFilters) => void;
  totalFilteredCount: number;
  totalActiveCount: number;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onUpdateFilters,
  totalFilteredCount,
  totalActiveCount
}) => {
  const categories = [
    "All Categories",
    "Business Systems Analysis",
    "Product Management",
    "Architecture & Engineering",
    "IT & Program Management"
  ];

  const arrangements = ["All", "Remote", "Hybrid", "On-site"];
  const empTypes = ["All", "Permanent", "Contract", "Contract-to-hire"];
  const atsPlatforms = [
    "All ATS Platforms",
    "Workday",
    "Greenhouse",
    "Lever",
    "iCIMS",
    "Official State Portal",
    "GovernmentJobs",
    "SmartRecruiters",
    "Taleo / Oracle Recruiting",
    "SuccessFactors"
  ];

  const handleReset = () => {
    onUpdateFilters({
      query: '',
      category: 'All Categories',
      workArrangement: 'All',
      employmentType: 'All',
      minScore: 70,
      stateGovOnly: false,
      atsFilter: 'All ATS Platforms',
      sourceFilter: 'All',
      hideApplied: true,
      salaryPrefOnly: false
    });
  };

  const isFiltered = 
    filters.query !== '' || 
    filters.category !== 'All Categories' || 
    filters.workArrangement !== 'All' || 
    filters.employmentType !== 'All' || 
    filters.minScore > 70 || 
    filters.stateGovOnly || 
    filters.atsFilter !== 'All ATS Platforms' ||
    filters.salaryPrefOnly;

  return (
    <div className="bg-[#0A0A0B]/95 border-b border-[#222226] p-4 sm:p-5 sticky top-16 z-20 backdrop-blur-md shadow-sm space-y-4">
      <div className="max-w-7xl mx-auto space-y-3.5">
        
        {/* Row 1: Search Bar + Category Pills + Clear Button */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title, employer, ATS (Workday, Greenhouse), keywords (SQL, AWS, BPMN), or location..."
              value={filters.query}
              onChange={(e) => onUpdateFilters({ ...filters, query: e.target.value })}
              className="w-full bg-[#121214] border border-[#27272A] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
            />
            {filters.query && (
              <button
                onClick={() => onUpdateFilters({ ...filters, query: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onUpdateFilters({ ...filters, category: cat })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 font-display ${
                  filters.category === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40'
                    : 'bg-[#121214] hover:bg-[#1A1A1E] text-zinc-300 border border-[#27272A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Row 2: Detailed Filters (Arrangement, Employment Type, State Gov Toggle, Min Score, ATS) */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1.5 border-t border-[#1E1E22]">
          
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Work Arrangement */}
            <div className="flex items-center bg-[#121214] rounded-lg p-0.5 border border-[#27272A]">
              {arrangements.map(arr => (
                <button
                  key={arr}
                  onClick={() => onUpdateFilters({ ...filters, workArrangement: arr })}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                    filters.workArrangement === arr
                      ? 'bg-[#27272A] text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {arr}
                </button>
              ))}
            </div>

            {/* Employment Type */}
            <div className="flex items-center bg-[#121214] rounded-lg p-0.5 border border-[#27272A]">
              {empTypes.map(emp => (
                <button
                  key={emp}
                  onClick={() => onUpdateFilters({ ...filters, employmentType: emp })}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                    filters.employmentType === emp
                      ? 'bg-[#27272A] text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {emp}
                </button>
              ))}
            </div>

            {/* State Government Portals Toggle */}
            <button
              onClick={() => onUpdateFilters({ ...filters, stateGovOnly: !filters.stateGovOnly })}
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                filters.stateGovOnly
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-xs'
                  : 'bg-[#121214] text-zinc-400 border-[#27272A] hover:text-zinc-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Official State Portals</span>
            </button>

            {/* ATS Platform Dropdown */}
            <select
              value={filters.atsFilter}
              onChange={(e) => onUpdateFilters({ ...filters, atsFilter: e.target.value })}
              className="bg-[#121214] border border-[#27272A] text-zinc-300 rounded-lg px-2.5 py-1 text-[11px] font-mono focus:outline-none focus:border-indigo-500 font-semibold"
            >
              {atsPlatforms.map(ats => (
                <option key={ats} value={ats}>{ats}</option>
              ))}
            </select>

            {/* Min Match Score Filter Slider */}
            <div className="hidden sm:flex items-center space-x-2 bg-[#121214] px-3 py-1 rounded-lg border border-[#27272A]">
              <span className="text-zinc-400 text-[11px] font-semibold">Min Score:</span>
              <input
                type="range"
                min={70}
                max={95}
                step={1}
                value={filters.minScore}
                onChange={(e) => onUpdateFilters({ ...filters, minScore: Number(e.target.value) })}
                className="w-16 accent-indigo-500 h-1 cursor-pointer"
              />
              <span className="text-emerald-400 font-black font-mono text-[11px]">{filters.minScore}%+</span>
            </div>

          </div>

          {/* Right Status & Reset */}
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-zinc-400 font-mono">
              Showing <strong className="text-white font-bold">{totalFilteredCount}</strong> of <strong className="text-white font-bold">{totalActiveCount}</strong> verified
            </span>
            {isFiltered && (
              <button
                onClick={handleReset}
                className="text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-2 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
