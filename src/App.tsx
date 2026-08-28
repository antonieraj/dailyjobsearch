import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  TableProperties,
  LayoutGrid,
  Filter,
  Download,
  Landmark,
  FileText,
  UserCheck
} from 'lucide-react';
import { JobMatch, CandidateProfile, SearchFilters } from './types';
import { defaultCandidateProfile } from './data/defaultProfile';
import { generateFull100Jobs } from './data/jobsData';
import { Navbar } from './components/Navbar';
import { StepOneBanner } from './components/StepOneBanner';
import { SearchAndFilters } from './components/SearchAndFilters';
import { JobCard } from './components/JobCard';
import { JobTableView } from './components/JobTableView';
import { JobDetailModal } from './components/JobDetailModal';
import { StepOneReportModal } from './components/StepOneReportModal';
import { QualityControlPanel } from './components/QualityControlPanel';
import { ProfileModal } from './components/ProfileModal';
import { StateGovSearchModal } from './components/StateGovSearchModal';

export default function App() {
  const [profile, setProfile] = useState<CandidateProfile>(defaultCandidateProfile);
  const [jobPool, setJobPool] = useState<JobMatch[]>(() => generateFull100Jobs());
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);

  // Modal States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isQcOpen, setIsQcOpen] = useState(false);
  const [isStateGovOpen, setIsStateGovOpen] = useState(false);

  // Search & Filter State
  const [filters, setFilters] = useState<SearchFilters>({
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

  // Calculate 100 active verified jobs (excluding applied) with updated ranks
  const activeVerified100 = useMemo(() => {
    // 1. Exclude applied jobs
    const eligible = jobPool.filter(j => !appliedJobIds.includes(j.id));
    
    // 2. Re-assign ranks 1..N based on match score descending
    const sorted = [...eligible].sort((a, b) => b.matchScore - a.matchScore);
    return sorted.map((job, index) => ({
      ...job,
      rank: index + 1
    }));
  }, [jobPool, appliedJobIds]);

  // Apply User UI Filters on top of the 100 verified jobs
  const filteredJobs = useMemo(() => {
    return activeVerified100.filter(job => {
      // Query filter
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const matchesQuery = 
          job.jobTitle.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.atsPlatform.toLowerCase().includes(q) ||
          job.discoverySource.toLowerCase().includes(q) ||
          job.matchExplanation.toLowerCase().includes(q) ||
          job.materialGaps.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category
      if (filters.category !== 'All Categories' && job.category !== filters.category) {
        return false;
      }

      // Work arrangement
      if (filters.workArrangement !== 'All' && job.workArrangement !== filters.workArrangement) {
        return false;
      }

      // Employment type
      if (filters.employmentType !== 'All' && job.employmentType !== filters.employmentType) {
        return false;
      }

      // Min Match Score
      if (job.matchScore < filters.minScore) {
        return false;
      }

      // State Gov Only
      if (filters.stateGovOnly && !job.stateGovEntity) {
        return false;
      }

      // ATS Platform
      if (filters.atsFilter !== 'All ATS Platforms') {
        if (!job.atsPlatform.toLowerCase().includes(filters.atsFilter.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [activeVerified100, filters]);

  // Applied jobs list for exclusion drawer
  const appliedJobsList = useMemo(() => {
    return jobPool.filter(j => appliedJobIds.includes(j.id));
  }, [jobPool, appliedJobIds]);

  // State Gov jobs list
  const stateGovJobsList = useMemo(() => {
    return activeVerified100.filter(j => j.stateGovEntity);
  }, [activeVerified100]);

  // Action handlers
  const handleMarkApplied = (jobId: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds(prev => [...prev, jobId]);
    }
  };

  const handleUnmarkApplied = (jobId: string) => {
    setAppliedJobIds(prev => prev.filter(id => id !== jobId));
  };

  const handleToggleSave = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleTriggerRescore = () => {
    // Re-score algorithm dynamically weighting candidate's target roles and skills
    setJobPool(prev => {
      return prev.map(job => {
        let score = job.matchScore;
        // Boost if matches user's specific target roles
        const titleMatch = profile.targetRoles.some(r => 
          job.jobTitle.toLowerCase().includes(r.toLowerCase()) || 
          r.toLowerCase().includes(job.jobTitle.toLowerCase())
        );
        if (titleMatch && score < 95) {
          score = Math.min(98, score + 2);
        }
        return {
          ...job,
          matchScore: score
        };
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F0F0F0] flex flex-col antialiased font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        totalActiveCount={activeVerified100.length}
        appliedCount={appliedJobIds.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenQc={() => setIsQcOpen(true)}
        onOpenStateGov={() => setIsStateGovOpen(true)}
      />

      {/* Step 1 Scope & Protocol Banner */}
      <StepOneBanner />

      {/* Sticky Search and Filter Controls */}
      <SearchAndFilters
        filters={filters}
        onUpdateFilters={setFilters}
        totalFilteredCount={filteredJobs.length}
        totalActiveCount={activeVerified100.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Candidate Profile Context Capsule */}
        <div className="bg-[#121214] border border-[#222226] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs shadow-xl">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black font-mono text-sm shadow-inner">
              AM
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-white text-base font-display">{profile.fullName}</span>
                <span className="text-zinc-400 font-medium">• {profile.title}</span>
              </div>
              <span className="text-zinc-400 text-xs font-normal">
                {profile.yearsOfExperience} Years Exp • {profile.location} • Preferences: Remote (${(profile.compensationPreferences.remoteMin / 1000).toFixed(0)}k+) / Hybrid (${(profile.compensationPreferences.hybridMin / 1000).toFixed(0)}k+) / Contract (${profile.compensationPreferences.contractHourlyMin}/hr)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#161619] hover:bg-[#1E1E24] text-zinc-300 hover:text-white border border-[#27272A] text-xs font-bold font-display transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Edit Resume / Parameters</span>
            </button>
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-display shadow-lg shadow-indigo-600/30 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Full 100 Report</span>
            </button>
          </div>
        </div>

        {/* Jobs Grid or Table View */}
        {filteredJobs.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#121214] rounded-2xl border border-[#222226] p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#161619] border border-[#27272A] flex items-center justify-center mx-auto text-zinc-400">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white font-display">No matching jobs found</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              No positions match the current combination of filters. Try lowering the minimum match score or clearing category selections.
            </p>
            <button
              onClick={() => setFilters({
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
              })}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold font-display transition-colors inline-block mt-2 shadow-lg shadow-indigo-600/30"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSelect={(j) => setSelectedJob(j)}
                onMarkApplied={handleMarkApplied}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        ) : (
          <JobTableView
            jobs={filteredJobs}
            onSelect={(j) => setSelectedJob(j)}
            onMarkApplied={handleMarkApplied}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#222226] bg-[#121214] py-6 text-xs text-zinc-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="font-black text-white font-display">
              Daily Job Matches — Step 1: Discovery &amp; Verification
            </span>
            <p className="text-[11px] text-zinc-400 font-normal">
              Direct employer vacancy verification, 0–100% resume match scoring, transparent gap disclosure &amp; applied exclusions.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <button 
              onClick={() => setIsQcOpen(true)}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold font-display"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              12-Point QC Checklist
            </button>
            <button 
              onClick={() => setIsStateGovOpen(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-bold font-display"
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              State Gov Search
            </button>
            <button 
              onClick={() => setIsReportOpen(true)}
              className="hover:text-indigo-400 transition-colors flex items-center gap-1 font-bold font-display"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              Export 100 Jobs
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onMarkApplied={handleMarkApplied}
        profile={profile}
      />

      <StepOneReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        jobs={activeVerified100}
        profile={profile}
      />

      <QualityControlPanel
        isOpen={isQcOpen}
        onClose={() => setIsQcOpen(false)}
        jobs={activeVerified100}
        appliedJobIds={appliedJobIds}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={setProfile}
        appliedJobs={appliedJobsList}
        onUnmarkApplied={handleUnmarkApplied}
        onTriggerRescore={handleTriggerRescore}
      />

      <StateGovSearchModal
        isOpen={isStateGovOpen}
        onClose={() => setIsStateGovOpen(false)}
        stateGovJobs={stateGovJobsList}
        onSelectJob={(j) => setSelectedJob(j)}
      />

    </div>
  );
}
