import { RequestHandler } from "express";

// Backend API base URL - can be configured via environment variable
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://pwgfmn7vlwj6sz7vcwxh7nrjpy0hfekw.lambda-url.ca-central-1.on.aws/api/v1';

// GET /api/public/jobs - List all public job postings (no authentication required)
export const handleJobPostings: RequestHandler = async (req, res) => {
  try {
    // Build query parameters for the public API
    const queryParams = new URLSearchParams();
    const { 
      search, 
      employmentType, 
      workplaceType, 
      seniorityLevel,
      location,
      sortBy,
      sortOrder,
      page,
      limit
    } = req.query;

    // Valid sortBy options for job postings
    const validSortByOptions = ['title', 'createdAt', 'applicationDeadline'];
    
    if (search) queryParams.append('search', search as string);
    if (employmentType) queryParams.append('employmentType', employmentType as string);
    if (workplaceType) queryParams.append('workplaceType', workplaceType as string);
    if (seniorityLevel) queryParams.append('seniorityLevel', seniorityLevel as string);
    if (location) queryParams.append('location', location as string);
    
    // Only append sortBy if it's a valid option (prevents using firstName or other invalid fields)
    if (sortBy && validSortByOptions.includes(sortBy as string)) {
      queryParams.append('sortBy', sortBy as string);
      // Default to ASC if sortOrder not provided, otherwise use the provided value
      const order = sortOrder || 'asc';
      queryParams.append('sortOrder', order as string);
    }
    
    if (page) queryParams.append('page', page as string);
    if (limit) queryParams.append('limit', limit as string);

    // Fetch job postings from public API (no authentication required)
    const jobPostingsResponse = await fetch(`${BACKEND_API_URL}/public/jobs?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!jobPostingsResponse.ok) {
      const errorText = await jobPostingsResponse.text();
      console.error('Failed to fetch job postings from public API:', errorText);
      return res.status(jobPostingsResponse.status).json({
        success: false,
        statusCode: jobPostingsResponse.status,
        error: "Backend API Error",
        message: "Failed to fetch job postings from public API"
      });
    }

    const jobPostingsData = await jobPostingsResponse.json();
    console.log('Successfully fetched job postings from public API');
    return res.json(jobPostingsData);

  } catch (error) {
    console.error('Error fetching job postings:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      error: "Internal Server Error",
      message: "An error occurred while fetching job postings"
    });
  }
};

// GET /api/public/jobs/:jobPostingId - Get public job posting details (no authentication required)
export const handleJobDetails: RequestHandler = async (req, res) => {
  try {
    const { jobPostingId } = req.params;
    
    if (!jobPostingId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Bad Request",
        message: "Job posting ID is required"
      });
    }

    // Fetch job details from public API (no authentication required)
    const jobDetailsResponse = await fetch(`${BACKEND_API_URL}/public/jobs/${jobPostingId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!jobDetailsResponse.ok) {
      const errorText = await jobDetailsResponse.text();
      console.error('Failed to fetch job details from public API:', errorText);
      return res.status(jobDetailsResponse.status).json({
        success: false,
        statusCode: jobDetailsResponse.status,
        error: "Backend API Error",
        message: "Failed to fetch job details from public API"
      });
    }

    const jobDetailsData = await jobDetailsResponse.json();
    console.log('Successfully fetched job details from public API');
    return res.json(jobDetailsData);

  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      error: "Internal Server Error",
      message: "An error occurred while fetching job details"
    });
  }
};

// POST /api/public/jobs/:jobPostingId/apply - Apply to a job posting (authentication required)
export const handleJobApplication: RequestHandler = async (req, res) => {
  try {
    const applicationData = req.body;
    const { jobPostingId } = req.params;
    
    if (!jobPostingId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Bad Request",
        message: "Job posting ID is required"
      });
    }

    // Get authorization token from request headers
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        error: "Unauthorized",
        message: "Authentication required. Please provide an authorization token."
      });
    }
    
    // Submit the application using the public API endpoint with authentication
    const applicationResponse = await fetch(`${BACKEND_API_URL}/public/jobs/${jobPostingId}/apply`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(applicationData)
    });

    if (!applicationResponse.ok) {
      const errorText = await applicationResponse.text();
      console.error('Failed to submit job application to public API:', errorText);
      return res.status(applicationResponse.status).json({
        success: false,
        statusCode: applicationResponse.status,
        error: "Backend API Error",
        message: "Failed to submit job application to public API"
      });
    }

    const applicationResult = await applicationResponse.json();
    console.log('Successfully submitted job application to public API');
    return res.json(applicationResult);

  } catch (error) {
    console.error('Error submitting job application:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      error: "Internal Server Error",
      message: "An error occurred while submitting the application"
    });
  }
};
