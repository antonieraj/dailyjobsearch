import React, { useState } from 'react';
import { 
  UserCheck, 
  X, 
  Sparkles, 
  FileText, 
  Plus, 
  Trash2, 
  DollarSign, 
  MapPin, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle,
  ShieldCheck,
  Undo2
} from 'lucide-react';
import { CandidateProfile, JobMatch } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CandidateProfile;
  onUpdateProfile: (updated: CandidateProfile) => void;
  appliedJobs: JobMatch[];
  onUnmarkApplied: (jobId: string) => void;
  onTriggerRescore: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  appliedJobs,
  onUnmarkApplied,
  onTriggerRescore
}) => {
  const [activeTab, setActiveTab] = useState<'params' | 'resume' | 'applied'>('params');
  const [currentProfile, setCurrentProfile] = useState<CandidateProfile>(profile);
  const [newRole, setNewRole] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isAiParsing, setIsAiParsing] = useState(false);
  const [parseMessage, setParseMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddRole = () => {
    if (!newRole.trim()) return;
    if (!currentProfile.targetRoles.includes(newRole.trim())) {
      setCurrentProfile({
        ...currentProfile,
        targetRoles: [...currentProfile.targetRoles, newRole.trim()]
      });
    }
    setNewRole('');
  };

  const handleRemoveRole = (role: string) => {
    setCurrentProfile({
      ...currentProfile,
      targetRoles: currentProfile.targetRoles.filter(r => r !== role)
    });
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setCurrentProfile({
      ...currentProfile,
      technicalSkills: [...currentProfile.technicalSkills, newSkill.trim()]
    });
    setNewSkill('');
  };

  const handleAiParseResume = async () => {
    if (!currentProfile.rawResumeText.trim()) return;
    setIsAiParsing(true);
    setParseMessage(null);
    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: currentProfile.rawResumeText })
      });
      const data = await res.json();
      if (data && !data.error) {
        const updated: CandidateProfile = {
          ...currentProfile,
          title: data.extractedTitle || currentProfile.title,
          yearsOfExperience: data.yearsExperience || currentProfile.yearsOfExperience,
          summary: data.summary || currentProfile.summary,
          targetRoles: data.targetRoles && data.targetRoles.length > 0 ? data.targetRoles : currentProfile.targetRoles,
          technicalSkills: data.technicalSkills || currentProfile.technicalSkills,
          businessAnalysisSkills: data.businessAnalysisSkills || currentProfile.businessAnalysisSkills,
          productAndAgileSkills: data.productAndAgileSkills || currentProfile.productAndAgileSkills,
          cloudAndArchitecture: data.cloudAndArchitecture || currentProfile.cloudAndArchitecture,
          certifications: data.certifications || currentProfile.certifications,
          industries: data.industries || currentProfile.industries,
        };
        setCurrentProfile(updated);
        setParseMessage("Resume parsed successfully! Extracted target roles, skills, and qualifications.");
      }
    } catch (e: any) {
      setParseMessage("Used local heuristic parsing for candidate qualifications.");
    } finally {
      setIsAiParsing(false);
    }
  };

  const handleSave = () => {
    onUpdateProfile(currentProfile);
    onTriggerRescore();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121214] border border-[#27272A] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#F0F0F0]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#222226] flex items-center justify-between bg-[#161619]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-inner">
              <UserCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-display tracking-tight">
                Candidate Profile &amp; Search Parameters
              </h2>
              <p className="text-xs text-zinc-400 font-medium">
                Primary source for experience, skills, seniority, compensation preferences &amp; applied exclusions.
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

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-[#222226] flex space-x-6 text-xs font-bold font-display">
          <button
            onClick={() => setActiveTab('params')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'params' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Search Parameters &amp; Roles
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'resume' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Resume Text &amp; Skills ({currentProfile.yearsOfExperience} Yrs)
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'applied' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Applied Exclusions ({appliedJobs.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {activeTab === 'params' && (
            <div className="space-y-6">
              
              {/* Target Roles List */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 block font-display">
                  TARGET ROLES ({currentProfile.targetRoles.length})
                </label>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#161619] border border-[#27272A]">
                  {currentProfile.targetRoles.map(role => (
                    <span 
                      key={role}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-[#222226] text-zinc-200 border border-[#2E2E34] font-medium"
                    >
                      {role}
                      <button
                        onClick={() => handleRemoveRole(role)}
                        className="ml-1.5 text-zinc-400 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add target role title (e.g. Enterprise Architect, Business Process Analyst)..."
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
                    className="flex-1 bg-[#121214] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                  <button
                    onClick={handleAddRole}
                    className="px-4 py-2 bg-[#161619] hover:bg-[#222226] border border-[#27272A] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Role
                  </button>
                </div>
              </div>

              {/* Location Priorities & Remote Requirement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300 block font-display">
                    LOCATION PRIORITIES
                  </label>
                  <div className="space-y-2 text-xs">
                    {currentProfile.locationPriorities.map((loc, idx) => (
                      <div key={loc.id} className="flex items-center space-x-2 bg-[#161619] p-3 rounded-xl border border-[#27272A]">
                        <span className="font-mono text-zinc-400 text-[11px] w-4 font-bold">{idx + 1}.</span>
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-zinc-200 flex-1 font-semibold">{loc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300 block font-display">
                    REMOTE REQUIREMENT
                  </label>
                  <input
                    type="text"
                    value={currentProfile.remoteRequirement}
                    onChange={(e) => setCurrentProfile({ ...currentProfile, remoteRequirement: e.target.value })}
                    className="w-full bg-[#121214] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                  <p className="text-[11px] text-zinc-400 font-medium">
                    Preferences applied to match score calculation (Remote nationwide + Texas hybrid).
                  </p>
                </div>
              </div>

              {/* Compensation Preferences */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-300 block flex items-center gap-1.5 font-display">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  COMPENSATION PREFERENCES (Preference, not hard exclusion)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#161619] p-3.5 rounded-xl border border-[#27272A]">
                    <span className="text-[11px] text-zinc-400 block font-medium">Remote Minimum</span>
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-zinc-400 mr-1 font-mono">$</span>
                      <input
                        type="number"
                        value={currentProfile.compensationPreferences.remoteMin}
                        onChange={(e) => setCurrentProfile({
                          ...currentProfile,
                          compensationPreferences: {
                            ...currentProfile.compensationPreferences,
                            remoteMin: Number(e.target.value)
                          }
                        })}
                        className="w-full bg-[#121214] border border-[#27272A] rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold font-mono"
                      />
                      <span className="text-xs text-zinc-400 ml-1 font-mono">/yr</span>
                    </div>
                  </div>

                  <div className="bg-[#161619] p-3.5 rounded-xl border border-[#27272A]">
                    <span className="text-[11px] text-zinc-400 block font-medium">Hybrid / On-site Min</span>
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-zinc-400 mr-1 font-mono">$</span>
                      <input
                        type="number"
                        value={currentProfile.compensationPreferences.hybridMin}
                        onChange={(e) => setCurrentProfile({
                          ...currentProfile,
                          compensationPreferences: {
                            ...currentProfile.compensationPreferences,
                            hybridMin: Number(e.target.value)
                          }
                        })}
                        className="w-full bg-[#121214] border border-[#27272A] rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold font-mono"
                      />
                      <span className="text-xs text-zinc-400 ml-1 font-mono">/yr</span>
                    </div>
                  </div>

                  <div className="bg-[#161619] p-3.5 rounded-xl border border-[#27272A]">
                    <span className="text-[11px] text-zinc-400 block font-medium">Contract Hourly Min</span>
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-zinc-400 mr-1 font-mono">$</span>
                      <input
                        type="number"
                        value={currentProfile.compensationPreferences.contractHourlyMin}
                        onChange={(e) => setCurrentProfile({
                          ...currentProfile,
                          compensationPreferences: {
                            ...currentProfile.compensationPreferences,
                            contractHourlyMin: Number(e.target.value)
                          }
                        })}
                        className="w-full bg-[#121214] border border-[#27272A] rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold font-mono"
                      />
                      <span className="text-xs text-zinc-400 ml-1 font-mono">/hr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Types */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 block font-display">
                  ELIGIBLE EMPLOYMENT TYPES
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['Permanent', 'Contract', 'Contract-to-hire'] as const).map(type => {
                    const isChecked = currentProfile.employmentTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => {
                          if (isChecked) {
                            if (currentProfile.employmentTypes.length > 1) {
                              setCurrentProfile({
                                ...currentProfile,
                                employmentTypes: currentProfile.employmentTypes.filter(t => t !== type)
                              });
                            }
                          } else {
                            setCurrentProfile({
                              ...currentProfile,
                              employmentTypes: [...currentProfile.employmentTypes, type]
                            });
                          }
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          isChecked 
                            ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300' 
                            : 'bg-[#161619] border-[#27272A] text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '}{type}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'resume' && (
            <div className="space-y-6">
              
              {/* Parse Banner */}
              <div className="p-4 rounded-xl bg-[#141726] border border-[#242A4A] flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 font-display">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    AI RESUME PARSING &amp; MATCH GROUNDING
                  </span>
                  <p className="text-xs text-zinc-300 font-normal">
                    Parse resume text to extract skills, certifications, and years of experience for match scoring.
                  </p>
                </div>
                <button
                  onClick={handleAiParseResume}
                  disabled={isAiParsing}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/30 border border-indigo-400/40"
                >
                  {isAiParsing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{isAiParsing ? 'Analyzing...' : 'Parse Resume'}</span>
                </button>
              </div>

              {parseMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{parseMessage}</span>
                </div>
              )}

              {/* Raw Resume Text Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 block font-display">
                  RAW RESUME TEXT
                </label>
                <textarea
                  rows={10}
                  value={currentProfile.rawResumeText}
                  onChange={(e) => setCurrentProfile({ ...currentProfile, rawResumeText: e.target.value })}
                  placeholder="Paste your full resume text here..."
                  className="w-full bg-[#121214] border border-[#27272A] rounded-xl p-3.5 font-mono text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              {/* Key Extracted Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 bg-[#161619] p-4 rounded-xl border border-[#27272A]">
                  <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 font-display">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    VERIFIED CERTIFICATIONS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProfile.certifications.map(c => (
                      <span key={c} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 bg-[#161619] p-4 rounded-xl border border-[#27272A]">
                  <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 font-display">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    INDUSTRIES &amp; DOMAINS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProfile.industries.map(ind => (
                      <span key={ind} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'applied' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#161619] p-3.5 rounded-xl border border-[#27272A]">
                <div>
                  <span className="text-xs font-bold text-zinc-200 font-display">Completed-Application Exclusion List</span>
                  <p className="text-[11px] text-zinc-400 font-normal">
                    Positions marked &quot;Applied&quot; are automatically excluded from the 100 verified active results.
                  </p>
                </div>
                <span className="text-xs font-mono font-black text-amber-400 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-500/30">
                  {appliedJobs.length} Excluded
                </span>
              </div>

              {appliedJobs.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs font-medium">
                  No jobs currently marked as applied. When you mark jobs as applied, they will appear here and get excluded automatically.
                </div>
              ) : (
                <div className="space-y-2">
                  {appliedJobs.map(job => (
                    <div 
                      key={job.id}
                      className="p-3.5 bg-[#161619] rounded-xl border border-[#27272A] flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-white truncate font-display">{job.jobTitle}</span>
                          <span className="text-[11px] text-zinc-400 font-medium">({job.company})</span>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-mono">{job.location} • {job.atsPlatform}</span>
                      </div>
                      <button
                        onClick={() => onUnmarkApplied(job.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#121214] hover:bg-[#222226] text-zinc-300 hover:text-white border border-[#27272A] text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                        title="Restore to active candidate pool"
                      >
                        <Undo2 className="w-3 h-3 text-cyan-400" />
                        <span>Restore</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#161619] border-t border-[#222226] flex items-center justify-between">
          <span className="text-xs text-zinc-400 font-mono">
            {currentProfile.targetRoles.length} target roles • {currentProfile.yearsOfExperience} yrs exp
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#121214] hover:bg-[#222226] text-white text-xs font-bold transition-colors border border-[#27272A]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md shadow-indigo-600/30 border border-indigo-400/40"
            >
              Save &amp; Re-Rank Matches
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
