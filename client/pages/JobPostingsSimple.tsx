import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { MapPin, Clock, Users, DollarSign, Briefcase, Search, Filter, ExternalLink, Zap } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import AOS from "aos";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

interface JobPosting {
  id: string;
  organizationId?: string;
  jobId: string;
  title: string;
  location: string;
  workplaceType: string;
  employmentType: string;
  description: string;
  seniorityLevel: string;
  qualifications?: string;
  salaryRange?: string;
  perks?: string;
  applicationDeadline?: string;
  publicationStatus?: string;
  isArchived?: boolean;
  createdAt: string;
  updatedAt?: string;
  organization?: {
    id: string;
    name: string;
    description?: string;
    website?: string;
    industry?: string;
    size?: string;
    location?: string;
  };
}

interface JobPostingsResponse {
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

interface FilterOptions {
  employmentType: string[];
  workplaceType: string[];
  seniorityLevel: string[];
  salaryRange: string[];
}

export default function JobPostingsSimple() {
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions>({
    employmentType: [],
    workplaceType: [],
    seniorityLevel: [],
    salaryRange: []
  });
  const [isFiltering, setIsFiltering] = useState(false);

  const filterOptions = {
    employmentType: [
      { value: 'Full-time', label: 'Full Time' },
      { value: 'Part-time', label: 'Part Time' },
      { value: 'Contract', label: 'Contract' },
      { value: 'Internship', label: 'Internship' }
    ],
    workplaceType: [
      { value: 'Remote', label: 'Remote' },
      { value: 'On-site', label: 'On Site' },
      { value: 'Hybrid', label: 'Hybrid' }
    ],
    seniorityLevel: [
      { value: 'Entry', label: 'Entry Level' },
      { value: 'Mid', label: 'Mid Level' },
      { value: 'Senior', label: 'Senior Level' },
      { value: 'Lead', label: 'Lead' },
      { value: 'Director', label: 'Director' },
      { value: 'Executive', label: 'Executive' }
    ],
    salaryRange: [
      { value: '0-50k', label: '$0 - $50k' },
      { value: '50k-100k', label: '$50k - $100k' },
      { value: '100k-150k', label: '$100k - $150k' },
      { value: '150k+', label: '$150k+' }
    ]
  };

  useEffect(() => {
    fetchJobPostings();
    
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100,
    });
  }, [sortBy]);

  const fetchJobPostings = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (sortBy) {
        queryParams.append('sortBy', sortBy);
        queryParams.append('sortOrder', 'asc'); // Default to ascending order
      }
      
      const queryString = queryParams.toString();
      const url = queryString ? `/api/public/jobs?${queryString}` : '/api/public/jobs';
      
      // Use the public API endpoint
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch job postings:', response.status, errorText);
        throw new Error(`Failed to fetch job postings: ${response.status} ${errorText}`);
      }
      
      const data: JobPostingsResponse = await response.json();
      
      // Log the response for debugging
      console.log('Job postings response:', data);
      
      // Ensure data.data is an array
      if (data && data.data && Array.isArray(data.data)) {
        setJobPostings(data.data);
        setError(null); // Clear any previous errors
      } else {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response structure from API');
      }
    } catch (err) {
      console.error('Error in fetchJobPostings:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEmploymentType = filters.employmentType.length === 0 || 
                                 filters.employmentType.includes(job.employmentType);
    
    const matchesWorkplaceType = filters.workplaceType.length === 0 || 
                                filters.workplaceType.includes(job.workplaceType);
    
    const matchesSeniorityLevel = filters.seniorityLevel.length === 0 || 
                                 filters.seniorityLevel.includes(job.seniorityLevel);
    
    const matchesSalaryRange = filters.salaryRange.length === 0 || 
                              filters.salaryRange.some(range => {
                                if (!job.salaryRange) return false;
                                const salary = job.salaryRange.toLowerCase();
                                switch (range) {
                                  case '0-50k': return salary.includes('$0') || salary.includes('$10') || salary.includes('$20') || salary.includes('$30') || salary.includes('$40') || salary.includes('$50');
                                  case '50k-100k': return salary.includes('$60') || salary.includes('$70') || salary.includes('$80') || salary.includes('$90') || salary.includes('$100');
                                  case '100k-150k': return salary.includes('$110') || salary.includes('$120') || salary.includes('$130') || salary.includes('$140') || salary.includes('$150');
                                  case '150k+': return salary.includes('$160') || salary.includes('$170') || salary.includes('$180') || salary.includes('$190') || salary.includes('$200') || salary.includes('$250') || salary.includes('$300');
                                  default: return false;
                                }
                              });
    
    return matchesSearch && matchesEmploymentType && matchesWorkplaceType && 
           matchesSeniorityLevel && matchesSalaryRange;
  });

  const handleApplyNow = (job: JobPosting) => {
    navigate(`/job/${job.id}`);
  };

  const handleQuickApply = (job: JobPosting) => {
    // TODO: Implement LinkedIn OAuth
    alert(`Quick Apply with LinkedIn for ${job.title} - Coming Soon!`);
  };

  const handleFilterChange = (category: keyof FilterOptions, value: string, checked: boolean) => {
    setIsFiltering(true);
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
    
    // Reset filtering animation after a short delay
    setTimeout(() => setIsFiltering(false), 300);
  };

  const clearFilters = () => {
    setFilters({
      employmentType: [],
      workplaceType: [],
      seniorityLevel: [],
      salaryRange: []
    });
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
      'entry_level': 'Entry Level',
      'mid': 'Mid Level',
      'mid_level': 'Mid Level',
      'senior': 'Senior Level',
      'senior_level': 'Senior Level',
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
        <div className="text-center mb-8" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Join Our Team</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover exciting opportunities to build the future of AI with us. 
            We're looking for passionate individuals who want to make a real impact.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-4 w-4" />
              <Input
                placeholder="Search jobs by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy || undefined} onValueChange={(value) => setSortBy(value || "")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Order by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">title</SelectItem>
                  <SelectItem value="createdAt">createdAt</SelectItem>
                  <SelectItem value="applicationDeadline">applicationDeadline</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <Filter className="h-4 w-4" />
                Filters
                {(filters.employmentType.length > 0 || filters.workplaceType.length > 0 || 
                  filters.seniorityLevel.length > 0 || filters.salaryRange.length > 0) && (
                  <Badge variant="secondary" className="ml-1 animate-pulse">
                    {filters.employmentType.length + filters.workplaceType.length + 
                     filters.seniorityLevel.length + filters.salaryRange.length}
                  </Badge>
                )}
              </Button>
              
              {(filters.employmentType.length > 0 || filters.workplaceType.length > 0 || 
                filters.seniorityLevel.length > 0 || filters.salaryRange.length > 0) && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6" data-aos="fade-up" data-aos-delay="300">
          <p className="text-foreground/70">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${isFiltering ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {filteredJobs.length === 0 ? (
            <div className="col-span-full text-center py-12" data-aos="fade-up" data-aos-delay="400">
              <Briefcase className="mx-auto h-12 w-12 text-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-foreground/70">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <Card 
                key={job.id} 
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col"
                data-aos="fade-up"
                data-aos-delay={400 + (index * 100)}
              >
                <CardHeader className="pb-4">
                  <div className="space-y-2">
                    <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {job.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Job Details */}
                  <div className="space-y-3 mb-4">
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
                    {job.salaryRange && (
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salaryRange}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{getEmploymentTypeLabel(job.employmentType)}</Badge>
                    <Badge variant="outline">{getWorkplaceTypeLabel(job.workplaceType)}</Badge>
                    <Badge variant="outline">{getSeniorityLevelLabel(job.seniorityLevel)}</Badge>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2">
                    <Button 
                      onClick={() => handleApplyNow(job)} 
                      className="w-full transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleQuickApply(job)}
                      className="w-full flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-primary hover:text-primary-foreground"
                    >
                      <Zap className="h-4 w-4" />
                      Quick Apply
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Filter Modal */}
        <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-aos="zoom-in">
            <DialogHeader>
              <DialogTitle>Filter Jobs</DialogTitle>
              <DialogDescription>
                Select filters to narrow down your job search
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Employment Type */}
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-lg font-semibold mb-3">Employment Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filterOptions.employmentType.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`employment-${option.value}`}
                        checked={filters.employmentType.includes(option.value)}
                        onCheckedChange={(checked) => 
                          handleFilterChange('employmentType', option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`employment-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workplace Type */}
              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-lg font-semibold mb-3">Workplace Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filterOptions.workplaceType.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`workplace-${option.value}`}
                        checked={filters.workplaceType.includes(option.value)}
                        onCheckedChange={(checked) => 
                          handleFilterChange('workplaceType', option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`workplace-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seniority Level */}
              <div data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-lg font-semibold mb-3">Seniority Level</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filterOptions.seniorityLevel.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`seniority-${option.value}`}
                        checked={filters.seniorityLevel.includes(option.value)}
                        onCheckedChange={(checked) => 
                          handleFilterChange('seniorityLevel', option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`seniority-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div data-aos="fade-up" data-aos-delay="400">
                <h3 className="text-lg font-semibold mb-3">Salary Range</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filterOptions.salaryRange.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`salary-${option.value}`}
                        checked={filters.salaryRange.includes(option.value)}
                        onCheckedChange={(checked) => 
                          handleFilterChange('salaryRange', option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`salary-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t" data-aos="fade-up" data-aos-delay="500">
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
              <Button onClick={() => setShowFilterModal(false)}>
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SiteLayout>
  );
}