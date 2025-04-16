import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ClipLoader } from 'react-spinners';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPass = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        return toast.error('Password did not match');
      }
      const response = await fetch(
        `/api/auth/reset-pass/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
          credentials: 'include',
        }
      );
      const data = await response.json();
      if (response.status === 400) {
        toast.error(data.message);
      } else if (response.status === 401) {
        toast.error(data.message);
        navigate('/');
      }
      if (response.status === 200) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
        <ClipLoader color="#3B82F6" /> {/* Blue color for the spinner */}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="bg-gray-800 text-white shadow-lg rounded-lg w-full max-w-md transform transition-all hover:scale-105 hover:shadow-2xl">
        {/* Card Header */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Reset your password
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your new password and confirm the new password
          </CardDescription>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="space-y-4">
          <form onSubmit={handleResetPass} className="space-y-4">
            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 block text-left">
                Enter password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300 ease-in-out hover:border-blue-500"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300 block text-left">
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300 ease-in-out hover:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </Button>
          </form>
        </CardContent>

        {/* Card Footer */}
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;