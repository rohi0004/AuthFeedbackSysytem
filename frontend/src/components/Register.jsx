import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import UserContext from '../context/Usercontext';
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
import ClipLoader from 'react-spinners/ClipLoader';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('/api/auth/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.status === 400) {
        toast.error(data.message);
      } else if (response.status === 409) {
        toast.error(data.message);
      } else if (response.status === 200) {
        toast.success(data.message);
        navigate('/verify-otp', { state: { email, password, username, redirectTo: '/feedback' } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        navigate('/feedback');
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

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <ClipLoader color="#3B82F6" />
        </div>
      ) : (
        <div className="flex items-center justify-center  p-4">
          {/* Registration Form Section */}
          <div className="w-full max-w-md">
            <form onSubmit={handleRegister}>
              <Card className="bg-gray-800 text-white shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Registration
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Enter your username and password to create an account and sign in to our application.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 block text-left">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300 ease-in-out hover:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-300 block text-left">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                      className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300 ease-in-out hover:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300 block text-left">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300 ease-in-out hover:border-blue-500"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Complete Registration
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                    </div>
                  </div>

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

                  <div className="text-center">
                    <a href="/login">
                      <Button
                        variant="link"
                        type="button"
                        className="text-blue-500 hover:text-blue-400 transition-all duration-300 ease-in-out"
                      >
                        Already have an account? Sign in
                      </Button>
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;