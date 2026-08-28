export interface VerificationDetails {
  isEmployerVerified: boolean;
  directAtsVerified: boolean;
  activeSubmissionPathway: boolean;
  deadlineVerified: boolean;
  lastVerifiedTimestamp: string;
}

export interface JobMatch {
  id: string;
  rank: number;
  matchScore: number;
  jobTitle: string;
  company: string;
  discoverySource: string;
  atsPlatform: string;
  location: string;
  workArrangement: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Permanent' | 'Contract' | 'Contract-to-hire';
  compensation: string;
  postingDate: string; // Exact YYYY-MM-DD or "Not displayed"
  applicationDeadline: string; // Exact YYYY-MM-DD or "Not displayed / rolling"
  directEmployerUrl: string;
  matchExplanation: string;
  materialGaps: string;
  status: 'active' | 'applied' | 'saved' | 'reviewing';
  category: string;
  department?: string;
  stateGovEntity?: boolean;
  requisitionId?: string;
  verificationDetails: VerificationDetails;
}

export interface LocationPriority {
  id: number;
  name: string;
  type: 'primary' | 'secondary' | 'remote' | 'additional';
}

export interface CandidateProfile {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  yearsOfExperience: number;
  targetRoles: string[];
  locationPriorities: LocationPriority[];
  remoteRequirement: string;
  compensationPreferences: {
    remoteMin: number;
    hybridMin: number;
    contractHourlyMin: number;
  };
  employmentTypes: ('Permanent' | 'Contract' | 'Contract-to-hire')[];
  technicalSkills: string[];
  businessAnalysisSkills: string[];
  productAndAgileSkills: string[];
  cloudAndArchitecture: string[];
  managementSkills: string[];
  certifications: string[];
  industries: string[];
  education: string;
  rawResumeText: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  workArrangement: string;
  employmentType: string;
  minScore: number;
  stateGovOnly: boolean;
  atsFilter: string;
  sourceFilter: string;
  hideApplied: boolean;
  salaryPrefOnly: boolean;
}
