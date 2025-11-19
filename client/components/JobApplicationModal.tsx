import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { X, Plus, Trash2, Upload, MapPin, Clock, Users } from "lucide-react";
import { JobPosting, JobApplication, JobApplicationResponse } from "@shared/api";
import { useToast } from "./ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";

interface JobApplicationModalProps {
  job: JobPosting;
  isOpen: boolean;
  onClose: () => void;
}

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

export default function JobApplicationModal({ job, isOpen, onClose }: JobApplicationModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    professionalSummary: "",
    resumeUrl: "",
    totalExperienceYears: 0,
    expectedSalary: "",
    country: "Philippines"
  });
  
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([]);
  const [certificationEntries, setCertificationEntries] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    if (newCertification.trim() && !certificationEntries.includes(newCertification.trim())) {
      setCertificationEntries(prev => [...prev, newCertification.trim()]);
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setCertificationEntries(prev => prev.filter(c => c !== cert));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.resumeUrl || formData.resumeUrl.trim().length === 0) {
      toast({
        title: "Resume Required",
        description: "Please provide your resume URL before submitting your application.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const applicationData: JobApplication = {
        jobPostingId: job.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        professionalSummary: formData.professionalSummary,
        resumeUrl: formData.resumeUrl,
        totalExperienceYears: formData.totalExperienceYears,
        workExperience: workExperience.reduce((acc, exp) => {
          acc[exp.id] = exp;
          return acc;
        }, {} as Record<string, any>),
        educationEntries: educationEntries.reduce((acc, edu) => {
          acc[edu.id] = edu;
          return acc;
        }, {} as Record<string, any>),
        certificationEntries,
        skills,
        appliedAt: new Date().toISOString(),
        expectedSalary: formData.expectedSalary,
        applicationChannel: "company_website",
        country: formData.country
      };

      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result: JobApplicationResponse = await response.json();
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      onClose();
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        professionalSummary: "",
        resumeUrl: "",
        totalExperienceYears: 0,
        expectedSalary: "",
        country: "Philippines"
      });
      setWorkExperience([]);
      setEducationEntries([]);
      setCertificationEntries([]);
      setSkills([]);

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
      'internship': 'Internship'
    };
    return labels[type] || type;
  };

  const getWorkplaceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'remote': 'Remote',
      'on_site': 'On Site',
      'hybrid': 'Hybrid'
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
      'executive': 'Executive'
    };
    return labels[level] || level;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for {job.title}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application for this position.
          </DialogDescription>
        </DialogHeader>

        {/* Job Details */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{getEmploymentTypeLabel(job.employmentType)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{getSeniorityLevelLabel(job.seniorityLevel)}</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline">{getWorkplaceTypeLabel(job.workplaceType)}</Badge>
            {job.salaryRange && <Badge variant="outline">{job.salaryRange}</Badge>}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
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
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="expectedSalary">Expected Salary</Label>
                <Input
                  id="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                  placeholder="50000"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <Label htmlFor="professionalSummary">Professional Summary</Label>
            <Textarea
              id="professionalSummary"
              value={formData.professionalSummary}
              onChange={(e) => handleInputChange("professionalSummary", e.target.value)}
              placeholder="Briefly describe your professional background and key achievements..."
              rows={4}
            />
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <Button type="button" variant="outline" size="sm" onClick={addWorkExperience}>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-4">
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
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Education</h3>
              <Button type="button" variant="outline" size="sm" onClick={addEducationEntry}>
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
            <div className="space-y-4">
              {educationEntries.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-4">
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
            </div>
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
                placeholder="Add a certification"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
              />
              <Button type="button" onClick={addCertification}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {certificationEntries.map((cert) => (
                <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                  {cert}
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
            <Label htmlFor="resumeUrl">Resume URL *</Label>
            <Input
              id="resumeUrl"
              value={formData.resumeUrl}
              onChange={(e) => handleInputChange("resumeUrl", e.target.value)}
              placeholder="Resume URL"
              required
            />
            <p className="text-sm text-foreground/70 mt-1">
              Please upload your resume to a cloud service and provide the URL
            </p>
          </div>

          {/* Total Experience */}
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

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
