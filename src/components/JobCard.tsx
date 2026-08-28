import React from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Bookmark, 
  Check, 
  Landmark, 
  Layers, 
  ArrowUpRight,
  Info
} from 'lucide-react';
import { JobMatch } from '../types';

interface JobCardProps {
  job: JobMatch;
  onSelect: (job: JobMatch) => void;
  onMarkApplied: (jobId: string) => void;
  onToggleSave: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onSelect,
  onMarkApplied,
  onToggleSave
}) => {
  const isSaved = job.status === 'saved';

  // Color code based on match score
  const getScoreBadge = (score: number) => {
    if (score >= 95) {
      return {
        bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
        ring: 'ring-emerald-500/30',
        label: 'Strong Match'
      };
    }
    if (score >= 90) {
      return {
        bg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
        ring: 'ring-cyan-500/30',
        label: 'High Match'
      };
    }
    if (score >= 80) {
      return {
        bg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
        ring: 'ring-indigo-500/30',
        label: 'Solid Match'
      };
    }
    return {
      bg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      ring: 'ring-amber-500/30',
      label: 'Competitive'
    };
  };

  const scoreMeta = getScoreBadge(job.matchScore);

  const isDeadlineRolling = job.applicationDeadline.toLowerCase().includes('rolling') || 
                            job.applicationDeadline.toLowerCase().includes('not displayed');

  return (
    <div className="bg-[#121214] border border-[#222226] hover:border-zinc-700/80 rounded-2xl p-5 shadow-lg transition-all duration-200 flex flex-col justify-between group hover:shadow-2xl hover:shadow-indigo-950/20 text-[#F0F0F0]">
      
      {/* Top Header Row: Rank Badge, Title, Company & Match Score Gauge */}
      <div className="space-y-3.5">
        
        <div className="flex items-start justify-between gap-3">
          
          <div className="flex items-start space-x-3 min-w-0">
            {/* Rank Number Badge */}
            <div className="w-9 h-9 rounded-xl bg-[#161619] border border-[#27272A] font-mono font-extrabold text-sm text-zinc-300 flex items-center justify-center shrink-0 shadow-inner group-hover:border-indigo-500/40 transition-colors">
              #{job.rank}
            </div>

            {/* Title & Company */}
            <div className="min-w-0">
              <h3 
                onClick={() => onSelect(job)}
                className="font-black text-base sm:text-[17px] text-white hover:text-indigo-400 cursor-pointer transition-colors leading-tight line-clamp-2 font-display tracking-tight"
              >
                {job.jobTitle}
              </h3>
              <div className="flex items-center space-x-2 mt-1 text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                  {job.company}
                </span>
                {job.stateGovEntity && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Landmark className="w-2.5 h-2.5 mr-1" />
                    STATE PORTAL
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 0-100% Match Score Badge */}
          <div className="flex flex-col items-end shrink-0">
            <div className={`px-2.5 py-1 rounded-xl border font-mono font-black text-xs flex items-center gap-1 shadow-sm ${scoreMeta.bg}`}>
              <Sparkles className="w-3 h-3" />
              <span>{job.matchScore}%</span>
            </div>
            <span className="text-[10px] text-zinc-400 mt-0.5 font-bold uppercase tracking-wider font-mono">
              {scoreMeta.label}
            </span>
          </div>

        </div>

        {/* Location, Work Arrangement, Compensation & Employment Type */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          
          <div className="flex items-center space-x-1.5 text-zinc-300 bg-[#161619] px-2.5 py-1.5 rounded-xl border border-[#222226] truncate font-medium">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-zinc-200 bg-[#161619] px-2.5 py-1.5 rounded-xl border border-[#222226] truncate font-semibold font-mono">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{job.compensation}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-zinc-400 bg-[#161619] px-2.5 py-1.5 rounded-xl border border-[#222226] truncate text-[11px] font-medium">
            <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{job.workArrangement} • {job.employmentType}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-zinc-400 bg-[#161619] px-2.5 py-1.5 rounded-xl border border-[#222226] truncate text-[11px] font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{job.atsPlatform}</span>
          </div>

        </div>

        {/* Concise Explanation of Why the Job Matches Resume */}
        <div className="bg-[#131520] border border-[#20253B] rounded-xl p-3.5 text-xs space-y-1.5">
          <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider block font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            WHY IT MATCHES RESUME
          </span>
          <p className="text-zinc-300 leading-relaxed text-[11px] font-normal">
            {job.matchExplanation}
          </p>
        </div>

        {/* Material Skills / Domain / Qualification Gaps Disclosed */}
        <div className="bg-[#1C1810] border border-[#3A2E19] rounded-xl p-3.5 text-xs space-y-1.5">
          <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block font-mono flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            DISCLOSED MATERIAL GAPS
          </span>
          <p className="text-zinc-300 leading-relaxed text-[11px] font-normal">
            {job.materialGaps}
          </p>
        </div>

        {/* Dates & Verification Stamp */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-[#1E1E22]">
          <div className="flex items-center space-x-3 font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-400" />
              Posted: <strong className="text-zinc-300 font-semibold">{job.postingDate}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              Deadline: <strong className={`font-semibold ${isDeadlineRolling ? 'text-cyan-400' : 'text-zinc-300'}`}>{job.applicationDeadline}</strong>
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold font-mono">
            ✓ ACTIVE SUBMISSION VERIFIED
          </span>
        </div>

      </div>

      {/* Action Footer: Direct Employer Link, Mark Applied & Details */}
      <div className="mt-4 pt-3.5 border-t border-[#1E1E22] flex items-center justify-between gap-2">
        
        <div className="flex items-center space-x-1.5">
          {/* Details / Audit Inspector */}
          <button
            onClick={() => onSelect(job)}
            className="px-3 py-1.5 rounded-xl bg-[#161619] hover:bg-[#1E1E24] text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1 border border-[#27272A]"
          >
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>Audit Spec</span>
          </button>

          {/* Mark as Applied (Exclusion trigger) */}
          <button
            onClick={() => onMarkApplied(job.id)}
            className="px-3 py-1.5 rounded-xl bg-[#161619] hover:bg-amber-950/40 hover:text-amber-300 hover:border-amber-500/40 text-zinc-300 border border-[#27272A] text-xs font-semibold transition-colors flex items-center gap-1"
            title="Mark as Applied (moves to completed-application exclusion list)"
          >
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Mark Applied</span>
          </button>
        </div>

        {/* Direct Employer ATS Link (Authoritative) */}
        <a
          href={job.directEmployerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all border border-indigo-400/40 shrink-0"
        >
          <span>Direct Apply</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

      </div>

    </div>
  );
};
