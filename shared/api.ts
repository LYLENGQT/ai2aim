export interface JobPosting {
  id: string;
  organizationId: string;
  organizationName: string;
  jobId: string;
  title: string;
  location: string;
  workplaceType: 'Remote' | 'On-site' | 'Hybrid';
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  seniorityLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Director' | 'Executive';
  qualifications?: string;
  salaryRange?: string;
  applicationDeadline?: string;
  perks?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface JobPostingsResponse {
  success: boolean;
  statusCode: number;
  data: JobPosting[];
  message: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface JobApplication {
  phone?: string;
  professionalSummary?: string;
  resumeUrl?: string;
  totalExperienceYears?: number;
  certificationEntries?: string[];
  skills?: string[];
  expectedSalary?: string;
  country?: string;
}

export interface JobApplicationResponse {
  success: boolean;
  statusCode: number;
  data: {
    id: string;
    jobPostingId: string;
    candidateId: string;
    status: string;
    appliedAt: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface CandidateRegistrationRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface CandidateRegistrationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}