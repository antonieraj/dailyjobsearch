import { CandidateProfile } from '../types';

export const defaultCandidateProfile: CandidateProfile = {
  fullName: "Alex Morgan",
  title: "Lead Business Systems Analyst & Technical Solutions Architect",
  email: "alex.morgan.tech@example.com",
  phone: "(512) 555-0194",
  location: "Austin, Texas, United States",
  summary: "Accomplished Lead Business Systems Analyst and Technical Solutions Architect with 11+ years of experience bridging enterprise IT systems, product strategy, and engineering execution. Proven track record leading digital transformation, API and cloud integration (AWS/Azure), requirements engineering, Agile/Scrum delivery, data modeling (SQL/PostgreSQL), and complex workflow modernization across state government, healthcare, and enterprise fintech platforms.",
  yearsOfExperience: 11,
  targetRoles: [
    "Lead Business Systems Analyst",
    "Senior Business Analyst",
    "Business Process Analyst",
    "Technical Product Manager",
    "Product Owner",
    "IT Project Manager",
    "Technical Program Manager",
    "Systems Analyst",
    "Solution Architect",
    "Enterprise Architect",
    "Engineering Manager",
    "IT Manager",
    "Application Developer / Analyst",
    "Configuration Analyst"
  ],
  locationPriorities: [
    { id: 1, name: "Texas (Austin / Dallas / Houston)", type: "primary" },
    { id: 2, name: "Remote — United States", type: "remote" },
    { id: 3, name: "California (Sacramento / Bay Area / LA)", type: "secondary" },
    { id: 4, name: "New York / Washington / Florida", type: "additional" }
  ],
  remoteRequirement: "Remote anywhere in U.S. or Texas Hybrid",
  compensationPreferences: {
    remoteMin: 140000,
    hybridMin: 135000,
    contractHourlyMin: 75
  },
  employmentTypes: ["Permanent", "Contract", "Contract-to-hire"],
  technicalSkills: [
    "SQL / PostgreSQL / Oracle",
    "RESTful APIs & Microservices",
    "Data Modeling & Schema Design",
    "Python & TypeScript (Application Logic)",
    "ETL & Data Pipelines",
    "Postman / Swagger / OpenAPI",
    "Git / GitHub / CI/CD Pipelines",
    "ERP / CRM Integration"
  ],
  businessAnalysisSkills: [
    "Requirements Gathering & BRD/FRD",
    "Business Process Mapping (BPMN)",
    "Gap Analysis & AS-IS / TO-BE Modeling",
    "Stakeholder Facilitation & JAD Sessions",
    "UAT Planning & Execution",
    "Root Cause Analysis",
    "Regulatory & Compliance Analysis"
  ],
  productAndAgileSkills: [
    "Agile / Scrum / Kanban / SAFe",
    "Product Backlog Grooming & User Stories",
    "Sprint Planning & Roadmapping",
    "Jira, Confluence & Azure DevOps",
    "Acceptance Criteria (Gherkin/BDD)",
    "Feature Prioritization (MoSCoW / RICE)"
  ],
  cloudAndArchitecture: [
    "AWS (S3, Lambda, API Gateway, RDS, IAM)",
    "Microsoft Azure (App Services, SQL DB)",
    "Enterprise System Architecture",
    "Service-Oriented Architecture (SOA)",
    "Zero Trust & Security Compliance"
  ],
  managementSkills: [
    "Cross-Functional Team Leadership",
    "Vendor & 3rd-Party Evaluation",
    "Budget & Resource Allocation",
    "Risk Mitigation & Change Management",
    "Executive Presentations & Steering Committees"
  ],
  certifications: [
    "CBAP (Certified Business Analysis Professional)",
    "AWS Certified Solutions Architect – Associate",
    "CSPO (Certified Scrum Product Owner)",
    "PMP (Project Management Professional)"
  ],
  industries: [
    "State & Local Government",
    "Fintech & Banking",
    "Healthcare & Life Sciences",
    "Enterprise SaaS",
    "Supply Chain & Retail"
  ],
  education: "B.S. in Management Information Systems (MIS) — University of Texas at Austin",
  rawResumeText: `ALEX MORGAN, PMP, CBAP, AWS-CSA
Austin, TX | (512) 555-0194 | alex.morgan.tech@example.com | linkedin.com/in/alexmorgan-leadba

PROFESSIONAL SUMMARY
Senior / Lead Business Systems Analyst & Solutions Architect with 11+ years guiding cross-functional teams in the design, configuration, and implementation of high-throughput enterprise applications and cloud modernizations. Adept at translating intricate operational mandates into technical requirements, user stories, architecture diagrams, and test suites. Strong background in AWS, relational SQL, REST APIs, Jira/DevOps, and public sector + healthcare workflows.

CORE COMPETENCIES
- Systems & Requirements Analysis: BRD, FRD, SRS, BPMN 2.0, Traceability Matrices, AS-IS / TO-BE Workflows, Gap Analysis.
- Technical & Cloud Architecture: AWS (Lambda, S3, RDS, API Gateway), REST APIs, SQL Query Optimization, Microservices.
- Product & Agile Leadership: Product Backlog Ownership, User Story Mapping, Sprint Execution, Acceptance Criteria, Scrum Master.
- Quality Assurance & UAT: Test Strategy, Defect Triage, Integration Testing, End-to-End User Acceptance Sign-off.
- Regulatory & Public Sector: Government Portals, HIPAA, FedRAMP, CJIS, SOC2 Compliance, State Agency Modernization.

PROFESSIONAL EXPERIENCE
Lead Business Systems Analyst | Apex Enterprise Solutions (Austin, TX) | 2021 – Present
- Spearheaded the modernization of a legacy state agency eligibility and case management system to AWS cloud microservices architecture.
- Facilitated weekly JAD sessions with 40+ agency executives, technical leads, and policy directors to define 180+ functional requirements.
- Designed comprehensive API contract specifications using OpenAPI/Swagger for third-party payment and identity verification gateways.
- Reduced requirement defect leakage by 34% through rigorous BDD acceptance criteria and automated Jira-to-test traceability.

Senior Technical Business Analyst | Meridian Health & Financial Systems | 2017 – 2021
- Acted as Product Owner / Lead BA for a high-availability patient billing and claims processing platform handling $250M+ annual volume.
- Wrote detailed technical user stories, SQL extraction scripts, and ETL mapping documents for Oracle and PostgreSQL data warehouses.
- Led Agile ceremonies for two distributed engineering squads (14 engineers) utilizing Azure DevOps and Kanban boards.

Systems Analyst / Application Developer | Horizon Public Solutions | 2013 – 2017
- Analyzed legacy relational databases, wrote complex SQL queries, and authored functional design specs for municipal and state portals.
- Coordinated UAT cycles with over 200 business users, training documentation, and cutover checklists.

EDUCATION & CERTIFICATIONS
- B.S. in Management Information Systems, UT Austin (2013)
- CBAP (Certified Business Analysis Professional) - IIBA
- AWS Certified Solutions Architect – Associate
- Certified Scrum Product Owner (CSPO) - Scrum Alliance
- Project Management Professional (PMP) - PMI`
};
