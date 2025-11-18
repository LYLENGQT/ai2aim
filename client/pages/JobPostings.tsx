import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { MapPin, Clock, Users, DollarSign, Briefcase, Search, Filter } from "lucide-react";
import { JobPosting, JobPostingsResponse } from "@shared/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function JobPostings() {
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    employmentType: "",
    workplaceType: "",
    seniorityLevel: ""
  });

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/public/jobs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch job postings');
      }
      
      const data: JobPostingsResponse = await response.json();
      setJobPostings(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEmploymentType = !filters.employmentType || job.employmentType === filters.employmentType;
    const matchesWorkplaceType = !filters.workplaceType || job.workplaceType === filters.workplaceType;
    const matchesSeniorityLevel = !filters.seniorityLevel || job.seniorityLevel === filters.seniorityLevel;
    
    return matchesSearch && matchesEmploymentType && matchesWorkplaceType && matchesSeniorityLevel;
  });

  const handleApplyClick = (job: JobPosting) => {
    navigate(`/job/${job.id}`);
  };

  const getEmploymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'full_time': 'Full Time',
      'part_time': 'Part Time',
      'contract': 'Contract',
      'internship': 'Internship',
      'Full-time': 'Full Time',
      'Part-time': 'Part Time',
      'Contract': 'Contract',
      'Internship': 'Internship'
    };
    return labels[type] || type;
  };

  const getWorkplaceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'remote': 'Remote',
      'on_site': 'On Site',
      'hybrid': 'Hybrid',
      'Remote': 'Remote',
      'On-site': 'On Site',
      'Hybrid': 'Hybrid'
    };
    return labels[type] || type;
  };

  const getSeniorityLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      'entry': 'Entry Level',
      'mid': 'Mid Level',
      'senior': 'Senior Level',
      'lead': 'Lead',
      'director': 'Director',
      'executive': 'Executive',
      'Entry': 'Entry Level',
      'Mid': 'Mid Level',
      'Senior': 'Senior Level',
      'Lead': 'Lead',
      'Director': 'Director',
      'Executive': 'Executive'
    };
    return labels[level] || level;
  };

  const getWorkplaceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'remote':
        return '🏠';
      case 'on-site':
        return '🏢';
      case 'hybrid':
        return '🏠🏢';
      default:
        return '💼';
    }
  };

  if (loading) {
    return (
      <SiteLayout>
        <div className="container py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (error) {
    return (
      <SiteLayout>
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Job Postings</h1>
            <p className="text-foreground/70 mb-4">{error}</p>
            <Button onClick={fetchJobPostings}>Try Again</Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Join Our Team</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover exciting opportunities to build the future of AI with us. 
            We're looking for passionate individuals who want to make a real impact.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4" data-aos="fade-up" data-aos-delay="200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-4 w-4" />
                <Input
                  placeholder="Search jobs by title, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filters.employmentType} onValueChange={(value) => setFilters(prev => ({ ...prev, employmentType: value }))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Employment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Full-time">Full Time</SelectItem>
                  <SelectItem value="Part-time">Part Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.workplaceType} onValueChange={(value) => setFilters(prev => ({ ...prev, workplaceType: value }))}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="On-site">On Site</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.seniorityLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, seniorityLevel: value }))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  <SelectItem value="Entry">Entry Level</SelectItem>
                  <SelectItem value="Mid">Mid Level</SelectItem>
                  <SelectItem value="Senior">Senior Level</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Director">Director</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6" data-aos="fade-up" data-aos-delay="300">
          <p className="text-foreground/70">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12" data-aos="fade-up">
              <Briefcase className="mx-auto h-12 w-12 text-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-foreground/70">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <Card key={job.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]" data-aos="fade-up" data-aos-delay={index * 100}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base">
                        {job.description.length > 200 
                          ? `${job.description.substring(0, 200)}...` 
                          : job.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {job.salaryRange && (
                        <Badge variant="secondary" className="text-sm">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {job.salaryRange}
                        </Badge>
                      )}
                      <Button onClick={() => handleApplyClick(job)} className="w-full md:w-auto">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <span className="text-lg">{getWorkplaceTypeIcon(job.workplaceType)}</span>
                      <span>{getWorkplaceTypeLabel(job.workplaceType)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Clock className="h-4 w-4" />
                      <span>{getEmploymentTypeLabel(job.employmentType)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Users className="h-4 w-4" />
                      <span>{getSeniorityLevelLabel(job.seniorityLevel)}</span>
                    </div>
                  </div>
                  
                  {job.qualifications && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Key Qualifications:</h4>
                      <p className="text-sm text-foreground/70">
                        {job.qualifications.length > 150 
                          ? `${job.qualifications.substring(0, 150)}...` 
                          : job.qualifications}
                      </p>
                    </div>
                  )}
                  
                  {job.perks && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Perks & Benefits:</h4>
                      <p className="text-sm text-foreground/70">
                        {job.perks.length > 150 
                          ? `${job.perks.substring(0, 150)}...` 
                          : job.perks}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{getEmploymentTypeLabel(job.employmentType)}</Badge>
                    <Badge variant="outline">{getWorkplaceTypeLabel(job.workplaceType)}</Badge>
                    <Badge variant="outline">{getSeniorityLevelLabel(job.seniorityLevel)}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
