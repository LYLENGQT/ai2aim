import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useToast } from "../components/ui/use-toast";
import { useAuth } from "../contexts/AuthContext";
import SiteLayout from "../components/SiteLayout";
import { ArrowLeft, User, Mail, Lock, UserPlus, CheckCircle, Star, LogOut } from "lucide-react";
import { CandidateRegistrationRequest, CandidateRegistrationResponse } from "@shared/api";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login, logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get the redirect URL from query params
  const redirectTo = searchParams.get('redirect') || '/jobs';

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the backend authentication API
      const response = await fetch('http://localhost:3001/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Invalid email or password' }));
        throw new Error(errorData.message || 'Login failed');
      }

      const loginResponse = await response.json();
      const { data } = loginResponse;
      
      // Store user data and access token
      login({
        id: data.user.id || "",
        email: data.user.email || loginData.email,
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || ""
      }, data.tokens.accessToken);
      
      toast({
        title: "Login Successful",
        description: "You are now logged in.",
      });
      
      // Navigate to the redirect URL or jobs page
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords match
      if (signupData.password !== signupData.confirmPassword) {
        toast({
          title: "Signup Failed",
          description: "Passwords do not match.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Prepare registration request
      const registrationData: CandidateRegistrationRequest = {
        email: signupData.email,
        password: signupData.password,
        confirmPassword: signupData.confirmPassword,
        firstName: signupData.firstName,
        lastName: signupData.lastName
      };

      // Call the candidate registration API
      const response = await fetch('http://localhost:3001/api/v1/auth/register/candidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
        throw new Error(errorData.message || 'Registration failed');
      }

      const registrationResponse: CandidateRegistrationResponse = await response.json();
      const { data } = registrationResponse;
      
      // Store user data and access token
      login({
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName
      }, data.tokens.accessToken);
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
      });
      
      // Navigate to the redirect URL or jobs page
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "An error occurred during signup.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (form: "login" | "signup", field: string, value: string) => {
    if (form === "login") {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/auth');
  };

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
          {/* Left Column - Image and Details */}
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-12">
            <div className="text-center text-white max-w-md">
              {/* Hero Image Placeholder */}
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-6">
                Find Your Dream Job
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join thousands of professionals who have discovered their perfect career match through our platform.
              </p>
              
              {/* Features */}
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span className="text-blue-100">Verified job postings from top companies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span className="text-blue-100">Easy application process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span className="text-blue-100">Personalized job recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span className="text-blue-100">Career growth opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Auth Forms */}
          <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-3xl">

              {/* Header */}
              <div className="text-center mb-10">
                {isAuthenticated ? (
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                      Welcome Back, {user?.firstName}!
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      You are currently logged in as {user?.email}
                    </p>
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      size="lg"
                      className="flex items-center gap-2 mx-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                    >
                      <LogOut className="h-5 w-5" />
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                      {activeTab === 'login' ? 'Welcome Back' : 'Get Started'}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {activeTab === 'login' 
                        ? 'Sign in to continue your job search' 
                        : 'Create your account and start applying'
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Tabs - Fixed Position (Only show when not authenticated) */}
              {!isAuthenticated && (
                <div className="flex space-x-2 bg-gray-100 p-2 rounded-xl mb-8">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-3 px-6 text-base font-semibold rounded-lg transition-all duration-300 ${
                      activeTab === 'login'
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 py-3 px-6 text-base font-semibold rounded-lg transition-all duration-300 ${
                      activeTab === 'signup'
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Form Container with Slide Animation (Only show when not authenticated) */}
              {!isAuthenticated && (
                <div className="relative overflow-hidden min-h-[600px]">
                <div className={`transition-transform duration-300 ease-in-out ${activeTab === 'login' ? 'translate-x-0' : '-translate-x-full'}`}>
                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="space-y-8 px-8">
                    <div className="space-y-3">
                      <Label htmlFor="login-email" className="text-base font-semibold text-gray-700 block">
                        Email Address
                      </Label>
                        <Input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) => handleInputChange("login", "email", e.target.value)}
                          placeholder="Enter your email"
                          className="h-14 text-base px-6"
                          required
                        />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="login-password" className="text-base font-semibold text-gray-700 block">
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange("login", "password", e.target.value)}
                        placeholder="Enter your password"
                        className="h-14 text-base px-6"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                  
                </div>

                <div className={`absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out ${activeTab === 'signup' ? 'translate-x-0' : 'translate-x-full'}`}>
                  {/* Signup Form */}
                  <form onSubmit={handleSignup} className="space-y-8 px-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="signup-firstName" className="text-base font-semibold text-gray-700 block">
                          First Name
                        </Label>
                        <Input
                          id="signup-firstName"
                          value={signupData.firstName}
                          onChange={(e) => handleInputChange("signup", "firstName", e.target.value)}
                          placeholder="First name"
                          className="h-14 text-base px-6"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="signup-lastName" className="text-base font-semibold text-gray-700 block">
                          Last Name
                        </Label>
                        <Input
                          id="signup-lastName"
                          value={signupData.lastName}
                          onChange={(e) => handleInputChange("signup", "lastName", e.target.value)}
                          placeholder="Last name"
                          className="h-14 text-base px-6"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-email" className="text-base font-semibold text-gray-700 block">
                        Email Address
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => handleInputChange("signup", "email", e.target.value)}
                        placeholder="Enter your email"
                        className="h-14 text-base px-6"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-password" className="text-base font-semibold text-gray-700 block">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => handleInputChange("signup", "password", e.target.value)}
                        placeholder="Create a password"
                        className="h-14 text-base px-6"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-confirmPassword" className="text-base font-semibold text-gray-700 block">
                        Confirm Password
                      </Label>
                      <Input
                        id="signup-confirmPassword"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => handleInputChange("signup", "confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                        className="h-14 text-base px-6"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}