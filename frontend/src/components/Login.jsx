import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/Usercontext';
import ClipLoader from 'react-spinners/ClipLoader';
import { GoogleLogin } from '@react-oauth/google';

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Login = () => {
  // State management
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  // Hooks
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // Redirect to feedback if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/feedback');
    }
  }, [user, navigate]);

  const showWelcomeDialog = (name) => {
    setWelcomeName(name);
    setShowWelcome(true);
    setTimeout(() => {
      setShowWelcome(false);
      navigate('/feedback');
    }, 2000);
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user.username);
        localStorage.setItem('user', JSON.stringify(data.user.username));
        toast.success('Successfully logged in with Google!');
        showWelcomeDialog(data.user.username);
      } else {
        toast.error(data.message || 'Failed to login with Google');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong with Google login');
    } finally {
      setLoading(false);
    }
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Login response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.payload) {
        setUser(data.payload);
        localStorage.setItem('user', JSON.stringify(data.payload));
        toast.success('Signed in successfully');
        showWelcomeDialog(data.payload);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'An error occurred during login');
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <ClipLoader />
        </div>
      )}

      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="bg-gray-800 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {welcomeName}! Welcome to AuthFeedback System
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Login card */}
      <div className="flex items-center justify-center p-4">
        <Card className="bg-gray-800 text-white shadow-lg rounded-lg w-full max-w-md transform transition-all hover:scale-105 hover:shadow-2xl">
          {/* Card header */}
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Welcome
            </CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to MERN Authentication System
            </CardDescription>
          </CardHeader>

          {/* Card content */}
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
              {/* Email/Username input */}
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-gray-300 block text-left">
                  Email address or Username
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.currentTarget.value)}
                  placeholder="Enter your email address or username"
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300 ease-in-out hover:border-blue-500"
                />
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 block text-left">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300 ease-in-out hover:border-blue-500"
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded mt-4 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Google Login Button */}
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast.error('Google login failed');
                }}
                theme="filled_black"
                shape="pill"
                width="100%"
                text="continue_with"
              />
            </div>
          </CardContent>

          {/* Card footer */}
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 w-full">
              {/* Forgot password link */}
              <a href="/forgot-password" className="text-blue-500 hover:text-blue-400 text-sm transition-all duration-300 ease-in-out">
                Having trouble signing in?
              </a>

              {/* Register button */}
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate('/register')}
              >
                Create an account
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;