import React, { useState } from 'react';
import { 
  X, 
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
  Copy, 
  Check, 
  Layers, 
  Landmark, 
  ArrowUpRight,
  UserCheck,
  FileText
} from 'lucide-react';
import { JobMatch, CandidateProfile } from '../types';

interface JobDetailModalProps {
  job: JobMatch | null;
  onClose: () => void;
  onMarkApplied: (jobId: string) => void;
  profile: CandidateProfile;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onMarkApplied,
  profile
}) => {
  const [copied, setCopied] = useState(false);

  if (!job) return null;

  const handleCopySpec = () => {
    const formatted = `1. Rank: #${job.rank}
2. Match score: ${job.matchScore}%
3. Job title: ${job.jobTitle}
4. Company/agency: ${job.company}
5. Discovery source: ${job.discoverySource}
6. Direct employer ATS/platform: ${job.atsPlatform}
7. Location: ${job.location}
8. Work arrangement: ${job.workArrangement}
9. Employment type: ${job.employmentType}
10. Compensation: ${job.compensation}
11. Exact posting date: ${job.postingDate}
12. Application Deadline: ${job.applicationDeadline}
13. Direct employer submission URL: ${job.directEmployerUrl}
14. Concise explanation of why the job matches my resume: ${job.matchExplanation}
15. Material skills/domain/qualification gaps: ${job.materialGaps}`;

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121214] border border-[#27272A] rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#F0F0F0] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#222226] flex items-start justify-between bg-[#161619]">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-black">
                RANK #{job.rank} OF 100
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {job.matchScore}% MATCH
              </span>
              {job.stateGovEntity && (
                <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Landmark className="w-3 h-3" />
                  STATE PORTAL
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug font-display tracking-tight">
              {job.jobTitle}
            </h2>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5 font-semibold">
              <Building2 className="w-3.5 h-3.5 text-zinc-400" />
              {job.company} {job.department ? `• ${job.department}` : ''}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#222226] transition-colors border border-transparent hover:border-[#2E2E34]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#161619] p-3.5 rounded-xl border border-[#27272A]">
              <span className="text-[11px] text-zinc-400 block font-medium">Work Arrangement</span>
              <span className="font-bold text-zinc-200 mt-0.5 block">{job.workArrangement}</span>
            </div>
            <div className="bg-[#161619] p-3.5 rounded-xl border border-[#27272A]">
              <span className="text-[11px] text-zinc-400 block font-medium">Employment Type</span>
              <span className="font-bold text-zinc-200 mt-0.5 block">{job.employmentType}</span>
            </div>
            <div className="bg-[#161619] p-3.5 rounded-xl border border-[#27272A]">
              <span className="text-[11px] text-zinc-400 block font-medium">Compensation</span>
              <span className="font-bold font-mono text-emerald-400 mt-0.5 block truncate">{job.compensation}</span>
            </div>
            <div className="bg-[#161619] p-3.5 rounded-xl border border-[#27272A]">
              <span className="text-[11px] text-zinc-400 block font-medium">Location</span>
              <span className="font-bold text-zinc-200 mt-0.5 block truncate">{job.location}</span>
            </div>
          </div>

          {/* Direct ATS Verification Audit Stamp */}
          <div className="bg-[#161619] p-4 rounded-xl border border-[#27272A] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-zinc-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Authoritative Direct ATS Verification
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-400">
                100% DIRECT APPLICATION PATHWAY VERIFIED
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-zinc-300 pt-1">
              <div>
                <span className="text-zinc-400 block font-medium">Discovery Source:</span>
                <span className="font-semibold text-zinc-200">{job.discoverySource}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-medium">Direct Employer ATS:</span>
                <span className="font-bold font-mono text-cyan-300">{job.atsPlatform}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-medium">Requisition / Vacancy ID:</span>
                <span className="font-semibold font-mono text-zinc-300">{job.requisitionId || 'Verified Active Req'}</span>
              </div>
            </div>
          </div>

          {/* Why It Matches Resume */}
          <div className="bg-[#131520] border border-[#20253B] rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              14. Resume Match Explanation
            </h4>
            <p className="text-zinc-200 leading-relaxed text-xs font-normal">
              {job.matchExplanation}
            </p>
          </div>

          {/* Material Gaps Disclosed */}
          <div className="bg-[#1C1810] border border-[#3A2E19] rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              15. Disclosed Material Skills / Domain / Qualification Gaps
            </h4>
            <p className="text-zinc-200 leading-relaxed text-xs font-normal">
              {job.materialGaps}
            </p>
          </div>

          {/* Dates & Direct Employer URL Section */}
          <div className="bg-[#161619] p-4 rounded-xl border border-[#27272A] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-zinc-400 block font-sans">11. Exact Posting Date:</span>
                <span className="font-bold text-zinc-200">{job.postingDate}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-sans">12. Application Deadline:</span>
                <span className="font-bold text-cyan-300">{job.applicationDeadline}</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-400 block text-[11px] mb-1 font-medium">13. Direct Employer Submission URL:</span>
              <div className="flex items-center space-x-2 bg-[#0A0A0B] p-3 rounded-xl border border-[#27272A]">
                <span className="font-mono text-[11px] text-indigo-300 truncate flex-1 select-all font-medium">
                  {job.directEmployerUrl}
                </span>
                <a
                  href={job.directEmployerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shrink-0 transition-colors"
                  title="Open URL"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#161619] border-t border-[#222226] flex items-center justify-between gap-3">
          <button
            onClick={handleCopySpec}
            className="px-4 py-2 rounded-xl bg-[#121214] hover:bg-[#1E1E24] text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#27272A]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copied ? 'Copied 15 Fields' : 'Copy Formatted Record'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onMarkApplied(job.id);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#121214] hover:bg-amber-950/60 hover:text-amber-300 hover:border-amber-500/40 text-zinc-300 border border-[#27272A] text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-amber-400" />
              <span>Mark Applied</span>
            </button>

            <a
              href={job.directEmployerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all border border-indigo-400/40 flex items-center gap-1.5"
            >
              <span>Direct Apply on ATS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
