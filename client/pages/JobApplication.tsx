import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { X, Plus, Trash2, MapPin, Clock, Users, ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { JobPosting, JobApplicationResponse } from "@shared/api";
import { useToast } from "../components/ui/use-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { getApiUrl } from "../config/api";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}

interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
}

const steps = [
  { id: 1, title: "Personal Info", description: "Basic information" },
  { id: 2, title: "Professional Summary", description: "Tell us about yourself" },
  { id: 3, title: "Work Experience", description: "Your career history" },
  { id: 4, title: "Education", description: "Academic background" },
  { id: 5, title: "Skills & Certifications", description: "Your expertise" },
  { id: 6, title: "Review & Submit", description: "Final review" }
];

export default function JobApplication() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getAccessToken, user, isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    professionalSummary: "",
    resumeUrl: "",
    totalExperienceYears: 0,
    expectedSalary: "",
    salaryCurrency: "USD",
    country: "United States"
  });
  
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([]);
  const [certificationEntries, setCertificationEntries] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [resumeUrlError, setResumeUrlError] = useState("");
  const [certificationUrlError, setCertificationUrlError] = useState("");

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
    
    // Pre-fill user data from AuthContext
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email
      }));
    }
  }, [jobId, user]);

  const fetchJobDetails = async () => {
    try {
      // Fetch the specific job from the public API (no authentication required)
      const response = await fetch(getApiUrl(`public/jobs/${jobId}`), {
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
    }
  };

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return true; // Empty URL is valid (optional field)
    
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate resume URL when it changes
    if (field === "resumeUrl") {
      const url = value as string;
      if (url && !validateUrl(url)) {
        setResumeUrlError("Please enter a valid URL");
      } else {
        setResumeUrlError("");
      }
    }
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      isCurrent: false
    };
    setWorkExperience(prev => [...prev, newExp]);
  };

  const updateWorkExperience = (id: string, field: string, value: string | boolean) => {
    setWorkExperience(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperience(prev => prev.filter(exp => exp.id !== id));
  };

  const addEducationEntry = () => {
    const newEdu: EducationEntry = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationYear: ""
    };
    setEducationEntries(prev => [...prev, newEdu]);
  };

  const updateEducationEntry = (id: string, field: string, value: string) => {
    setEducationEntries(prev => 
      prev.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducationEntry = (id: string) => {
    setEducationEntries(prev => prev.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const addCertification = () => {
    const certUrl = newCertification.trim();
    if (certUrl && !certificationEntries.includes(certUrl)) {
      if (validateUrl(certUrl)) {
        setCertificationEntries(prev => [...prev, certUrl]);
        setNewCertification("");
        setCertificationUrlError("");
      } else {
        setCertificationUrlError("Please enter a valid certificate URL");
      }
    }
  };

  const removeCertification = (cert: string) => {
    setCertificationEntries(prev => prev.filter(c => c !== cert));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        // firstName, lastName, email come from authenticated user, only phone is required from form
        return formData.phone && (user?.firstName || formData.firstName) && (user?.lastName || formData.lastName) && (user?.email || formData.email);
      case 2:
        return formData.professionalSummary.trim().length > 0;
      case 3:
        return true; // Work experience is optional
      case 4:
        return true; // Education is optional
      case 5:
        return formData.resumeUrl.trim().length > 0 && !resumeUrlError && !certificationUrlError;
      case 6:
        return formData.resumeUrl.trim().length > 0 && !resumeUrlError && !certificationUrlError;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!job) return;
    
    // Final validation before submission
    if (!formData.resumeUrl || formData.resumeUrl.trim().length === 0) {
      toast({
        title: "Resume Required",
        description: "Please provide your resume URL before submitting your application.",
        variant: "destructive"
      });
      return;
    }
    
    if (resumeUrlError || certificationUrlError) {
      toast({
        title: "Invalid URLs",
        description: "Please fix any invalid URLs before submitting your application.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);

    try {
      // Check authentication first
      if (!isAuthenticated || !user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to submit your application.",
          variant: "destructive"
        });
        navigate(`/auth?redirect=${encodeURIComponent(`/apply/${job.id}`)}`);
        return;
      }

      // Build application data according to the API schema
      // Use firstName, lastName, email from authenticated user
      const applicationData: any = {};

      // Use authenticated user's data
      if (user.firstName) applicationData.firstName = user.firstName;
      if (user.lastName) applicationData.lastName = user.lastName;
      if (user.email) applicationData.email = user.email;
      
      // Optional fields from form
      if (formData.phone) applicationData.phone = formData.phone;
      if (formData.professionalSummary) applicationData.professionalSummary = formData.professionalSummary;
      applicationData.resumeUrl = formData.resumeUrl;
      if (formData.totalExperienceYears && formData.totalExperienceYears > 0) applicationData.totalExperienceYears = formData.totalExperienceYears;
      if (certificationEntries.length > 0) applicationData.certificationEntries = certificationEntries;
      if (skills.length > 0) applicationData.skills = skills;
      if (formData.expectedSalary) {
        applicationData.expectedSalary = `${formData.expectedSalary} ${formData.salaryCurrency}`;
      }
      if (formData.country) applicationData.country = formData.country;

      console.log('Sending application data:', applicationData);

      // Get access token from AuthContext (stored during login)
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        // If no token, redirect to login
        toast({
          title: "Authentication Required",
          description: "Please log in to submit your application.",
          variant: "destructive"
        });
        navigate(`/auth?redirect=${encodeURIComponent(`/apply/${job.id}`)}`);
        return;
      }

      // Submit the application through the Express proxy (uses env BACKEND_API_URL)
      const response = await fetch(`/api/public/jobs/${job.id}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to submit application:', response.status, errorText);
        throw new Error(`Failed to submit application: ${response.status} ${errorText}`);
      }

      const result: JobApplicationResponse = await response.json();
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      navigate('/jobs');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An error occurred while submitting your application.",
        variant: "destructive"
      });
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

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/jobs')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Apply for {job.title}</h1>
              <p className="text-muted-foreground mt-2">Complete your application in {steps.length} steps</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</div>
              <Progress value={progress} className="w-32 mt-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Steps */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : currentStep > step.id
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      currentStep === step.id
                        ? 'bg-primary-foreground text-primary'
                        : currentStep > step.id
                        ? 'bg-green-600 text-white'
                        : 'bg-muted-foreground text-background'
                    }`}>
                      {currentStep > step.id ? <Check className="h-3 w-3" /> : step.id}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs opacity-70">{step.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{getEmploymentTypeLabel(job.employmentType)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{getSeniorityLevelLabel(job.seniorityLevel)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{getWorkplaceTypeLabel(job.workplaceType)}</Badge>
                  {job.salaryRange && <Badge variant="outline">{job.salaryRange}</Badge>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
                      <p className="text-muted-foreground">Tell us about yourself</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={user?.firstName || formData.firstName}
                          disabled={!!user?.firstName}
                          className={user?.firstName ? "bg-muted" : ""}
                          required
                        />
                        {user?.firstName && (
                          <p className="text-xs text-muted-foreground mt-1">From your account</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={user?.lastName || formData.lastName}
                          disabled={!!user?.lastName}
                          className={user?.lastName ? "bg-muted" : ""}
                          required
                        />
                        {user?.lastName && (
                          <p className="text-xs text-muted-foreground mt-1">From your account</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || formData.email}
                          disabled={!!user?.email}
                          className={user?.email ? "bg-muted" : ""}
                          required
                        />
                        {user?.email && (
                          <p className="text-xs text-muted-foreground mt-1">From your account</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Japan">Japan</SelectItem>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="China">China</SelectItem>
                            <SelectItem value="Brazil">Brazil</SelectItem>
                            <SelectItem value="Mexico">Mexico</SelectItem>
                            <SelectItem value="Philippines">Philippines</SelectItem>
                            <SelectItem value="Singapore">Singapore</SelectItem>
                            <SelectItem value="South Korea">South Korea</SelectItem>
                            <SelectItem value="Netherlands">Netherlands</SelectItem>
                            <SelectItem value="Sweden">Sweden</SelectItem>
                            <SelectItem value="Switzerland">Switzerland</SelectItem>
                            <SelectItem value="Spain">Spain</SelectItem>
                            <SelectItem value="Italy">Italy</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <Label htmlFor="expectedSalary">Expected Salary</Label>
                          <Input
                            id="expectedSalary"
                            type="number"
                            min="0"
                            step="1000"
                            value={formData.expectedSalary}
                            onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                            placeholder="50000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="salaryCurrency">Currency</Label>
                          <Select value={formData.salaryCurrency} onValueChange={(value) => handleInputChange("salaryCurrency", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="CAD">CAD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Professional Summary */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">Professional Summary</h2>
                      <p className="text-muted-foreground">Tell us about your professional background</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="professionalSummary">Professional Summary *</Label>
                      <Textarea
                        id="professionalSummary"
                        value={formData.professionalSummary}
                        onChange={(e) => handleInputChange("professionalSummary", e.target.value)}
                        placeholder="Briefly describe your professional background and key achievements..."
                        rows={6}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="totalExperienceYears">Total Years of Experience</Label>
                      <Input
                        id="totalExperienceYears"
                        type="number"
                        min="0"
                        value={formData.totalExperienceYears}
                        onChange={(e) => handleInputChange("totalExperienceYears", parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Work Experience */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">Work Experience</h2>
                      <p className="text-muted-foreground">Add your work history (optional)</p>
                    </div>
                    
                    <div className="space-y-4">
                      {workExperience.map((exp) => (
                        <div key={exp.id} className="border rounded-lg p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Work Experience</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeWorkExperience(exp.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateWorkExperience(exp.id, "company", e.target.value)}
                                placeholder="Company name"
                              />
                            </div>
                            <div>
                              <Label>Position</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) => updateWorkExperience(exp.id, "position", e.target.value)}
                                placeholder="Job title"
                              />
                            </div>
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => updateWorkExperience(exp.id, "startDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Input
                                type="date"
                                value={exp.endDate}
                                onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)}
                                disabled={exp.isCurrent}
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`current-${exp.id}`}
                              checked={exp.isCurrent}
                              onChange={(e) => updateWorkExperience(exp.id, "isCurrent", e.target.checked)}
                            />
                            <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateWorkExperience(exp.id, "description", e.target.value)}
                              placeholder="Describe your role and achievements..."
                              rows={3}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button type="button" variant="outline" onClick={addWorkExperience} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Work Experience
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Education */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">Education</h2>
                      <p className="text-muted-foreground">Add your educational background (optional)</p>
                    </div>
                    
                    <div className="space-y-4">
                      {educationEntries.map((edu) => (
                        <div key={edu.id} className="border rounded-lg p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Education</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducationEntry(edu.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Institution</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => updateEducationEntry(edu.id, "institution", e.target.value)}
                                placeholder="University/School name"
                              />
                            </div>
                            <div>
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducationEntry(edu.id, "degree", e.target.value)}
                                placeholder="Bachelor's, Master's"
                              />
                            </div>
                            <div>
                              <Label>Field of Study</Label>
                              <Input
                                value={edu.field}
                                onChange={(e) => updateEducationEntry(edu.id, "field", e.target.value)}
                                placeholder="Computer Science"
                              />
                            </div>
                            <div>
                              <Label>Graduation Year</Label>
                              <Input
                                value={edu.graduationYear}
                                onChange={(e) => updateEducationEntry(edu.id, "graduationYear", e.target.value)}
                                placeholder="2020"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button type="button" variant="outline" onClick={addEducationEntry} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 5: Skills & Certifications */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">Skills & Certifications</h2>
                      <p className="text-muted-foreground">Showcase your expertise (optional)</p>
                    </div>
                    
                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Skills</h3>
                      <div className="flex gap-2 mb-4">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        />
                        <Button type="button" onClick={addSkill}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                      <div className="flex gap-2 mb-4">
                        <Input
                          value={newCertification}
                          onChange={(e) => setNewCertification(e.target.value)}
                          placeholder="Certificate URL"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                          className={certificationUrlError ? "border-red-500 focus:border-red-500" : ""}
                        />
                        <Button type="button" onClick={addCertification}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {certificationUrlError && (
                        <p className="text-sm text-red-500 mb-2">{certificationUrlError}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {certificationEntries.map((cert) => (
                          <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                            <a href={cert} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              View Certificate
                            </a>
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeCertification(cert)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Resume URL */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Resume</h3>
                      <div>
                        <Label htmlFor="resumeUrl">Resume URL *</Label>
                        <Input
                          id="resumeUrl"
                          value={formData.resumeUrl}
                          onChange={(e) => handleInputChange("resumeUrl", e.target.value)}
                          placeholder="Resume URL"
                          required
                          className={resumeUrlError ? "border-red-500 focus:border-red-500" : ""}
                        />
                        {resumeUrlError ? (
                          <p className="text-sm text-red-500 mt-1">{resumeUrlError}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">
                            Please upload your resume to a cloud service and provide the URL
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Review & Submit */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">Review & Submit</h2>
                      <p className="text-muted-foreground">Review your application before submitting</p>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Personal Info Review */}
                      <div className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Name:</span> {user?.firstName || formData.firstName} {user?.lastName || formData.lastName}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {user?.email || formData.email}
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span> {formData.phone}
                          </div>
                          <div>
                            <span className="font-medium">Country:</span> {formData.country}
                          </div>
                          <div>
                            <span className="font-medium">Expected Salary:</span> {formData.expectedSalary ? `${formData.expectedSalary} ${formData.salaryCurrency}` : 'Not specified'}
                          </div>
                          <div>
                            <span className="font-medium">Experience:</span> {formData.totalExperienceYears} years
                          </div>
                        </div>
                      </div>

                      {/* Professional Summary Review */}
                      <div className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
                        <p className="text-sm">{formData.professionalSummary}</p>
                      </div>

                      {/* Work Experience Review */}
                      {workExperience.length > 0 && (
                        <div className="border rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
                          <div className="space-y-4">
                            {workExperience.map((exp) => (
                              <div key={exp.id} className="border-l-4 border-primary pl-4">
                                <div className="font-medium">{exp.position} at {exp.company}</div>
                                <div className="text-sm text-muted-foreground">
                                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                </div>
                                {exp.description && (
                                  <div className="text-sm mt-2">{exp.description}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education Review */}
                      {educationEntries.length > 0 && (
                        <div className="border rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4">Education</h3>
                          <div className="space-y-4">
                            {educationEntries.map((edu) => (
                              <div key={edu.id} className="border-l-4 border-primary pl-4">
                                <div className="font-medium">{edu.degree} in {edu.field}</div>
                                <div className="text-sm text-muted-foreground">
                                  {edu.institution} - {edu.graduationYear}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills & Certifications Review */}
                      {(skills.length > 0 || certificationEntries.length > 0) && (
                        <div className="border rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4">Skills & Certifications</h3>
                          {skills.length > 0 && (
                            <div className="mb-4">
                              <div className="font-medium mb-2">Skills:</div>
                              <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                  <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {certificationEntries.length > 0 && (
                            <div>
                              <div className="font-medium mb-2">Certifications:</div>
                              <div className="flex flex-wrap gap-2">
                                {certificationEntries.map((cert) => (
                                  <Badge key={cert} variant="secondary">
                                    <a href={cert} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                      View Certificate
                                    </a>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Resume Review */}
                      <div className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Resume</h3>
                        {!formData.resumeUrl || formData.resumeUrl.trim().length === 0 ? (
                          <div className="flex items-center gap-2 text-red-500">
                            <Upload className="h-4 w-4" />
                            <span className="text-sm">Resume URL is required - Please add in Step 5</span>
                          </div>
                        ) : resumeUrlError ? (
                          <div className="flex items-center gap-2 text-red-500">
                            <Upload className="h-4 w-4" />
                            <span className="text-sm">Invalid URL - Please fix in Step 5</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            <a href={formData.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              View Resume
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-8 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid(currentStep)}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading || !isStepValid(currentStep)}
                    >
                      {loading ? <LoadingSpinner /> : "Submit Application"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
