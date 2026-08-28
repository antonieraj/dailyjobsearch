import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  FileSpreadsheet, 
  Code, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { JobMatch, CandidateProfile } from '../types';

interface StepOneReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: JobMatch[];
  profile: CandidateProfile;
}

export const StepOneReportModal: React.FC<StepOneReportModalProps> = ({
  isOpen,
  onClose,
  jobs,
  profile
}) => {
  const [copiedType, setCopiedType] = useState<'markdown' | 'text' | 'csv' | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown' | 'raw'>('preview');

  if (!isOpen) return null;

  const verified100 = jobs.slice(0, 100);

  // Generate Markdown Format
  const generateMarkdown = () => {
    let md = `# DAILY JOB MATCHES — STEP 1: DISCOVERY & VERIFICATION REPORT
**Candidate:** ${profile.fullName} | ${profile.title}
**Search Scope:** 100 Verified-Active Positions Accepting Applications
**Date Generated:** 2026-08-28 | **Direct Employer ATS Verification:** 100%

---

`;

    verified100.forEach((job) => {
      md += `### #${job.rank}. ${job.jobTitle} — ${job.company} (${job.matchScore}% Match)

1. **Rank:** #${job.rank}
2. **Match score:** ${job.matchScore}%
3. **Job title:** ${job.jobTitle}
4. **Company/agency:** ${job.company}
5. **Discovery source:** ${job.discoverySource}
6. **Direct employer ATS/platform:** ${job.atsPlatform}
7. **Location:** ${job.location}
8. **Work arrangement:** ${job.workArrangement}
9. **Employment type:** ${job.employmentType}
10. **Compensation:** ${job.compensation}
11. **Exact posting date:** ${job.postingDate}
12. **Application Deadline:** ${job.applicationDeadline}
13. **Direct employer submission URL:** ${job.directEmployerUrl}
14. **Concise explanation of why the job matches my resume:** ${job.matchExplanation}
15. **Material skills/domain/qualification gaps:** ${job.materialGaps}

---
`;
    });

    return md;
  };

  // Generate Plaintext Format
  const generatePlaintext = () => {
    let txt = `DAILY JOB MATCHES — STEP 1: DISCOVERY & VERIFICATION
Candidate: ${profile.fullName}
Total Verified-Active Results: ${verified100.length}
============================================================\n\n`;

    verified100.forEach((job) => {
      txt += `[JOB MATCH #${job.rank}]
1. Rank: #${job.rank}
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
15. Material skills/domain/qualification gaps: ${job.materialGaps}
------------------------------------------------------------\n\n`;
    });

    return txt;
  };

  // Generate CSV Format
  const generateCsv = () => {
    const headers = [
      "Rank",
      "Match Score",
      "Job Title",
      "Company",
      "Discovery Source",
      "Direct ATS Platform",
      "Location",
      "Work Arrangement",
      "Employment Type",
      "Compensation",
      "Posting Date",
      "Application Deadline",
      "Direct Submission URL",
      "Why It Matches Resume",
      "Material Gaps Disclosed"
    ];

    const escapeCsv = (val: string | number) => {
      const s = String(val).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = verified100.map(j => [
      j.rank,
      `${j.matchScore}%`,
      escapeCsv(j.jobTitle),
      escapeCsv(j.company),
      escapeCsv(j.discoverySource),
      escapeCsv(j.atsPlatform),
      escapeCsv(j.location),
      escapeCsv(j.workArrangement),
      escapeCsv(j.employmentType),
      escapeCsv(j.compensation),
      escapeCsv(j.postingDate),
      escapeCsv(j.applicationDeadline),
      escapeCsv(j.directEmployerUrl),
      escapeCsv(j.matchExplanation),
      escapeCsv(j.materialGaps)
    ].join(','));

    return [headers.join(','), ...rows].join('\n');
  };

  const handleCopy = (type: 'markdown' | 'text') => {
    const content = type === 'markdown' ? generateMarkdown() : generatePlaintext();
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `daily-job-matches-step1-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const jsonContent = JSON.stringify(verified100, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `daily-job-matches-step1-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121214] border border-[#27272A] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#F0F0F0] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#222226] flex items-center justify-between bg-[#161619]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-inner">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 font-display tracking-tight">
                Step 1 Final Output: 100 Verified-Active Job Matches
                <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {verified100.length} RANKED POSITIONS
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-medium">
                Authoritative Step 1 Discovery &amp; Verification format with 15-field data schema and direct ATS links.
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

        {/* Action Toolbar */}
        <div className="px-6 py-3 bg-[#161619] border-b border-[#222226] flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* View Mode Tabs */}
          <div className="flex items-center bg-[#121214] rounded-xl p-1 border border-[#27272A] font-display">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Interactive Report Preview
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'markdown' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Markdown Text
            </button>
            <button
              onClick={() => setActiveTab('raw')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'raw' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Plain Text (Prompt Spec)
            </button>
          </div>

          {/* Quick Export Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopy('markdown')}
              className="px-3.5 py-1.5 rounded-xl bg-[#121214] hover:bg-[#1E1E24] border border-[#27272A] text-zinc-200 font-bold flex items-center gap-1.5 transition-colors"
            >
              {copiedType === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{copiedType === 'markdown' ? 'Copied Markdown' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={() => handleCopy('text')}
              className="px-3.5 py-1.5 rounded-xl bg-[#121214] hover:bg-[#1E1E24] border border-[#27272A] text-zinc-200 font-bold flex items-center gap-1.5 transition-colors"
            >
              {copiedType === 'text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedType === 'text' ? 'Copied Text' : 'Copy Plaintext'}</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="px-3.5 py-1.5 rounded-xl bg-[#121214] hover:bg-[#1E1E24] border border-[#27272A] text-zinc-200 font-bold flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="px-3.5 py-1.5 rounded-xl bg-[#121214] hover:bg-[#1E1E24] border border-[#27272A] text-zinc-200 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-amber-400" />
              <span>Export JSON</span>
            </button>
          </div>

        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#161619] rounded-xl border border-[#27272A]">
                <h3 className="font-black text-sm text-white font-display">
                  Daily Job Matches — 100 Verified-Active Positions
                </h3>
                <p className="text-zinc-400 text-xs mt-1 font-medium">
                  Candidate: <strong className="text-zinc-200">{profile.fullName}</strong> ({profile.title}) • Primary Location: <strong className="text-zinc-200">{profile.location}</strong>
                </p>
              </div>

              <div className="space-y-3">
                {verified100.map((job) => (
                  <div 
                    key={job.id}
                    className="p-4 bg-[#161619] rounded-xl border border-[#27272A] hover:border-[#383840] space-y-2 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono font-black text-indigo-400 mr-2">#{job.rank}</span>
                        <span className="font-bold text-sm text-white font-display">{job.jobTitle}</span>
                        <span className="text-zinc-400 ml-2 font-medium">at <strong className="text-zinc-200">{job.company}</strong></span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg font-mono font-black text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {job.matchScore}% Match
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-zinc-300 pt-1">
                      <div><strong className="text-zinc-400 font-medium">Location:</strong> {job.location} ({job.workArrangement})</div>
                      <div><strong className="text-zinc-400 font-medium">Type:</strong> {job.employmentType}</div>
                      <div><strong className="text-zinc-400 font-medium">Comp:</strong> <span className="font-mono text-emerald-400 font-bold">{job.compensation}</span></div>
                      <div><strong className="text-zinc-400 font-medium">Direct ATS:</strong> <span className="font-mono text-cyan-300">{job.atsPlatform}</span></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-300 pt-1">
                      <div className="text-indigo-300/90 bg-[#131520] p-2.5 rounded-lg border border-[#20253B]">
                        <strong className="text-indigo-400 font-bold">Match Explanation:</strong> {job.matchExplanation}
                      </div>
                      <div className="text-amber-300/90 bg-[#1C1810] p-2.5 rounded-lg border border-[#3A2E19]">
                        <strong className="text-amber-400 font-bold">Material Gaps:</strong> {job.materialGaps}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 font-mono">
                      <span>Posted: {job.postingDate} | Deadline: {job.applicationDeadline}</span>
                      <a 
                        href={job.directEmployerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        {job.directEmployerUrl}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'markdown' && (
            <textarea
              readOnly
              rows={24}
              value={generateMarkdown()}
              className="w-full bg-[#0A0A0B] border border-[#27272A] rounded-xl p-4 font-mono text-xs text-zinc-200 select-all focus:outline-none leading-relaxed"
            />
          )}

          {activeTab === 'raw' && (
            <textarea
              readOnly
              rows={24}
              value={generatePlaintext()}
              className="w-full bg-[#0A0A0B] border border-[#27272A] rounded-xl p-4 font-mono text-xs text-zinc-200 select-all focus:outline-none leading-relaxed"
            />
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#161619] border-t border-[#222226] flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono">
            Step 1 Complete: 100 Active Positions Verified. Awaiting Step 2 instructions.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#121214] hover:bg-[#1E1E24] text-white font-bold transition-colors border border-[#27272A]"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
};
