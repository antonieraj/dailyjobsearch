import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Info, 
  Landmark, 
  ArrowUpDown, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { JobMatch } from '../types';

interface JobTableViewProps {
  jobs: JobMatch[];
  onSelect: (job: JobMatch) => void;
  onMarkApplied: (jobId: string) => void;
}

export const JobTableView: React.FC<JobTableViewProps> = ({
  jobs,
  onSelect,
  onMarkApplied
}) => {
  const [sortField, setSortField] = useState<'rank' | 'matchScore' | 'company' | 'jobTitle'>('rank');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (field: 'rank' | 'matchScore' | 'company' | 'jobTitle') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    let result = 0;
    if (sortField === 'rank') result = a.rank - b.rank;
    else if (sortField === 'matchScore') result = b.matchScore - a.matchScore; // default high to low
    else if (sortField === 'company') result = a.company.localeCompare(b.company);
    else if (sortField === 'jobTitle') result = a.jobTitle.localeCompare(b.jobTitle);
    return sortAsc ? result : -result;
  });

  return (
    <div className="bg-[#121214] border border-[#222226] rounded-2xl overflow-hidden shadow-2xl text-zinc-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#161619] text-zinc-300 border-b border-[#222226] select-none font-display">
              <th 
                onClick={() => handleSort('rank')}
                className="py-3 px-3.5 font-bold cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1 font-mono">
                  <span>RANK</span>
                  {sortField === 'rank' && (sortAsc ? <ChevronUp className="w-3 h-3 text-indigo-400" /> : <ChevronDown className="w-3 h-3 text-indigo-400" />)}
                </div>
              </th>
              <th 
                onClick={() => handleSort('matchScore')}
                className="py-3 px-3.5 font-bold cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1 font-mono">
                  <span>MATCH</span>
                  {sortField === 'matchScore' && (sortAsc ? <ChevronUp className="w-3 h-3 text-emerald-400" /> : <ChevronDown className="w-3 h-3 text-emerald-400" />)}
                </div>
              </th>
              <th 
                onClick={() => handleSort('jobTitle')}
                className="py-3 px-3.5 font-bold cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>JOB TITLE &amp; EMPLOYER</span>
                  {sortField === 'jobTitle' && (sortAsc ? <ChevronUp className="w-3 h-3 text-indigo-400" /> : <ChevronDown className="w-3 h-3 text-indigo-400" />)}
                </div>
              </th>
              <th className="py-3 px-3.5 font-bold">LOCATION &amp; TYPE</th>
              <th className="py-3 px-3.5 font-bold font-mono">COMPENSATION</th>
              <th className="py-3 px-3.5 font-bold font-mono">DIRECT ATS / SOURCE</th>
              <th className="py-3 px-3.5 font-bold font-mono">DEADLINE</th>
              <th className="py-3 px-3.5 font-bold text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E1E22]">
            {sortedJobs.map((job) => (
              <tr 
                key={job.id} 
                className="hover:bg-[#161619]/60 transition-colors group"
              >
                {/* Rank */}
                <td className="py-3 px-3.5 font-mono font-black text-zinc-300">
                  #{job.rank}
                </td>

                {/* Match Score */}
                <td className="py-3 px-3.5 font-mono">
                  <span className={`px-2 py-0.5 rounded-lg font-black text-[11px] inline-flex items-center gap-0.5 ${
                    job.matchScore >= 95 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    job.matchScore >= 90 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                    'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}>
                    <Sparkles className="w-2.5 h-2.5" />
                    {job.matchScore}%
                  </span>
                </td>

                {/* Job Title & Company */}
                <td className="py-3 px-3.5 max-w-xs">
                  <div 
                    onClick={() => onSelect(job)}
                    className="font-bold text-white hover:text-indigo-400 cursor-pointer truncate font-display tracking-tight"
                  >
                    {job.jobTitle}
                  </div>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5 truncate font-medium">
                    <span>{job.company}</span>
                    {job.stateGovEntity && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        GOV PORTAL
                      </span>
                    )}
                  </div>
                </td>

                {/* Location & Work Arrangement */}
                <td className="py-3 px-3.5 text-zinc-300 text-[11px]">
                  <div className="font-semibold text-zinc-200">{job.location}</div>
                  <div className="text-zinc-400">{job.workArrangement} • {job.employmentType}</div>
                </td>

                {/* Compensation */}
                <td className="py-3 px-3.5 text-emerald-400 font-bold font-mono text-[11px]">
                  {job.compensation}
                </td>

                {/* Direct ATS */}
                <td className="py-3 px-3.5 text-zinc-300 text-[11px]">
                  <div className="font-mono text-cyan-300 font-semibold truncate max-w-[160px]">{job.atsPlatform}</div>
                  <div className="text-zinc-400 text-[10px] truncate">{job.discoverySource}</div>
                </td>

                {/* Deadline */}
                <td className="py-3 px-3.5 font-mono text-[11px] text-zinc-300 font-semibold">
                  {job.applicationDeadline}
                </td>

                {/* Action Buttons */}
                <td className="py-3 px-3.5 text-right">
                  <div className="flex items-center justify-end space-x-1.5">
                    <button
                      onClick={() => onSelect(job)}
                      className="p-1.5 rounded-lg bg-[#161619] hover:bg-[#1E1E24] text-zinc-300 hover:text-white transition-colors border border-[#27272A]"
                      title="Inspect Job & Gap Details"
                    >
                      <Info className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                    <button
                      onClick={() => onMarkApplied(job.id)}
                      className="p-1.5 rounded-lg bg-[#161619] hover:bg-amber-950/50 text-zinc-400 hover:text-amber-300 transition-colors border border-[#27272A]"
                      title="Mark as Applied"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={job.directEmployerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center border border-indigo-400/30"
                      title="Open Direct Employer ATS"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
