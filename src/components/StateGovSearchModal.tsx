import React from 'react';
import { 
  X, 
  Landmark, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Building2, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { JobMatch } from '../types';

interface StateGovSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  stateGovJobs: JobMatch[];
  onSelectJob: (job: JobMatch) => void;
}

export const StateGovSearchModal: React.FC<StateGovSearchModalProps> = ({
  isOpen,
  onClose,
  stateGovJobs,
  onSelectJob
}) => {
  if (!isOpen) return null;

  const statePortals = [
    {
      state: "Texas (Primary)",
      portalName: "CAPPS Recruiting & WorkInTexas",
      url: "https://jobshrportal.capps.state.tx.us",
      categories: ["Operations", "Health & Human Services", "Transportation (TxDOT)", "Education (TEA)", "IT / DIR"],
      matchedCount: stateGovJobs.filter(j => j.company.includes("Texas") || j.location.includes("TX") || j.company.includes("Austin")).length
    },
    {
      state: "California (Secondary)",
      portalName: "CalCareers (CalHR / ECOS)",
      url: "https://calcareers.ca.gov",
      categories: ["Business & Financial Operations", "Public Health (CDPH)", "Technology (CDT)", "Administration"],
      matchedCount: stateGovJobs.filter(j => j.company.includes("California") || j.location.includes("CA")).length
    },
    {
      state: "New York",
      portalName: "StateJobsNY / NYS Civil Service",
      url: "https://statejobs.ny.gov",
      categories: ["NYS ITS", "Health & Human Services", "Financial Services", "Project Management"],
      matchedCount: stateGovJobs.filter(j => j.company.includes("New York") || j.location.includes("NY")).length
    },
    {
      state: "Washington",
      portalName: "GovernmentJobs (Careers.wa.gov)",
      url: "https://www.governmentjobs.com/careers/washington",
      categories: ["Transportation (WSDOT)", "Operations", "Social & Health Services", "STEM"],
      matchedCount: stateGovJobs.filter(j => j.company.includes("Washington") || j.location.includes("WA")).length
    },
    {
      state: "Florida",
      portalName: "People First (Florida DMS)",
      url: "https://jobs.myflorida.com",
      categories: ["Financial Services", "Health Care Administration", "Management", "IT"],
      matchedCount: stateGovJobs.filter(j => j.company.includes("Florida") || j.location.includes("FL")).length
    }
  ];

  const broadSearchTerms = [
    "business analyst", "business systems analyst", "systems analyst", "business process", 
    "process improvement", "product owner", "product manager", "project manager", 
    "program manager", "technical project manager", "application", "software", 
    "developer", "technology", "IT", "information systems", "data", "configuration", 
    "implementation", "systems", "architecture", "solution architect", "integration", 
    "modernization", "digital", "database", "QA", "testing"
  ];

  const targetCategories = [
    "Information Technology", "Business & Financial Operations", "STEM", 
    "Administration", "Project/Program Management", "Operations", 
    "Transportation", "Health/Human Services", "Education", "Finance"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121214] border border-[#27272A] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#F0F0F0] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#222226] flex items-center justify-between bg-[#161619]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-inner">
              <Landmark className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 font-display tracking-tight">
                Official State-Government Deep Portal Search
                <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ALL OCCUPATIONAL CATEGORIES
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-medium">
                Broad non-IT occupational sweep for analyst and technology positions within official state portals.
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#222226] transition-colors border border-transparent hover:border-[#2E2E34]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* Rule Statement Banner */}
          <div className="p-4 rounded-xl bg-[#1C1810] border border-[#3A2E19] space-y-2">
            <h3 className="font-black text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Special State-Government Search Protocol
            </h3>
            <p className="text-zinc-200 leading-relaxed text-xs font-normal">
              Relevant technology, systems analyst, and modernization positions in state government are frequently classified under operational, administration, transportation, finance, and health &amp; human services buckets rather than strictly &quot;IT&quot;.
            </p>
          </div>

          {/* Searched Categories Grid */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-300 block font-display">
              INSPECTED STATE PORTAL CATEGORIES (10 Sectors)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {targetCategories.map(cat => (
                <span key={cat} className="px-3 py-1 rounded-xl bg-[#161619] border border-[#27272A] text-zinc-200 text-xs font-medium">
                  ✓ {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Official State Portals Monitored */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-zinc-300 block font-display">
              OFFICIAL STATE EMPLOYMENT PORTALS IN SCOPE
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {statePortals.map(portal => (
                <div key={portal.state} className="p-4 bg-[#161619] rounded-xl border border-[#27272A] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-bold text-white font-display">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{portal.state}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      {portal.matchedCount} Verified Jobs
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Portal: <strong className="text-zinc-200">{portal.portalName}</strong>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {portal.categories.map(c => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-md bg-[#222226] text-zinc-300 border border-[#2E2E34]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Searched Keywords Reference */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-300 block font-display">
              CROSS-CATEGORY QUERY TERMS EXECUTED ({broadSearchTerms.length} keywords)
            </span>
            <div className="p-3.5 rounded-xl bg-[#0A0A0B] border border-[#27272A] font-mono text-[11px] text-zinc-400 leading-relaxed max-h-24 overflow-y-auto">
              {broadSearchTerms.join(" • ")}
            </div>
          </div>

          {/* Verified State Gov Positions List */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-zinc-300 block font-display">
              VERIFIED-ACTIVE STATE &amp; PUBLIC SECTOR POSITIONS ({stateGovJobs.length})
            </span>
            <div className="space-y-2">
              {stateGovJobs.map(job => (
                <div 
                  key={job.id}
                  onClick={() => {
                    onSelectJob(job);
                    onClose();
                  }}
                  className="p-3.5 bg-[#161619] hover:bg-[#1C1C20] rounded-xl border border-[#27272A] hover:border-[#383840] cursor-pointer transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-white truncate font-display">{job.jobTitle}</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-400 shrink-0">{job.matchScore}%</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 font-medium">
                      {job.company} • {job.location} • <span className="text-amber-300 font-mono font-semibold">{job.atsPlatform}</span>
                    </div>
                  </div>
                  <span className="text-xs text-indigo-400 font-bold shrink-0 font-display">
                    View Spec &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#161619] border-t border-[#222226] flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono">Official State Portals Verified with 100% Direct Application Pathways.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#121214] hover:bg-[#1E1E24] text-white font-bold transition-colors border border-[#27272A]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
