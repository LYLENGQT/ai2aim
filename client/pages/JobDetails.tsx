import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { MapPin, Clock, Users, DollarSign, Calendar, Building, ArrowLeft, ExternalLink, LogOut } from "lucide-react";
import { JobPosting } from "@shared/api";
import { useToast } from "../components/ui/use-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import SiteLayout from "../components/SiteLayout";
import { useAuth } from "../contexts/AuthContext";

export default function JobDetails() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      // Fetch the specific job from the public API (no authentication required)
      const response = await fetch(`/api/public/jobs/${jobId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch job details:', response.status, errorText);
        throw new Error(`Failed to fetch job details: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      setJob(data.data);
    } catch (error) {
      console.error('Error in fetchJobDetails:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load job details.",
        variant: "destructive"
      });
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
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

  const handleApplyNow = () => {
    if (!job) return;
    
    if (isAuthenticated) {
      // User is logged in, proceed to application
      navigate(`/apply/${job.id}`);
    } else {
      // User is not logged in, navigate to auth page with redirect
      navigate(`/auth?redirect=${encodeURIComponent(`/apply/${job.id}`)}`);
    }
  };

  const handleBackToJobs = () => {
    navigate('/jobs');
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/auth');
  };

  if (loading) {
    return (
      <SiteLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </SiteLayout>
    );
  }

  if (error || !job) {
    return (
      <SiteLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Job Not Found</h1>
            <p className="text-foreground/70 mb-4">The job you're looking for doesn't exist.</p>
            <Button onClick={handleBackToJobs}>Back to Jobs</Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBackToJobs}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-3xl">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 text-lg text-foreground/70">
                        <Building className="h-5 w-5" />
                        <span>{job.organizationName}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {job.salaryRange && (
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {job.salaryRange}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{getEmploymentTypeLabel(job.employmentType)}</Badge>
                    <Badge variant="outline">{getWorkplaceTypeLabel(job.workplaceType)}</Badge>
                    <Badge variant="outline">{getSeniorityLevelLabel(job.seniorityLevel)}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">{job.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Qualifications */}
              {job.qualifications && (
                <Card>
                  <CardHeader>
                    <CardTitle>Qualifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{job.qualifications}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Perks & Benefits */}
              {job.perks && (
                <Card>
                  <CardHeader>
                    <CardTitle>Perks & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{job.perks}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Application Deadline */}
              {job.applicationDeadline && (
                <Card>
                  <CardHeader>
                    <CardTitle>Application Deadline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(job.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Button */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <p className="text-sm text-foreground/70">Signed in as: {user?.email}</p>
                        <Button 
                          onClick={handleApplyNow}
                          className="w-full text-lg py-6"
                          size="lg"
                        >
                          Apply Now
                        </Button>
                        <Button 
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          Log Out
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={handleApplyNow}
                        className="w-full text-lg py-6"
                        size="lg"
                      >
                        Sign In to Apply
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Save Job
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground/70">Posted</span>
                    <span className="text-sm">{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground/70">Job ID</span>
                    <span className="text-sm font-mono">{job.jobId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground/70">Location</span>
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground/70">Type</span>
                    <span className="text-sm">{getEmploymentTypeLabel(job.employmentType)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground/70">Workplace</span>
                    <span className="text-sm">{getWorkplaceTypeLabel(job.workplaceType)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground/70">Level</span>
                    <span className="text-sm">{getSeniorityLevelLabel(job.seniorityLevel)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
