import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username, email, password, redirectTo } = location.state || {};

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        '/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ otp, username, email, password }),
          credentials: 'include',
        }
      );

      const data = await response.json();
      if (response.status === 401) {
        toast.error(data.message);
      } else if (response.status === 400) {
        toast.error(data.message);
      } else if (response.status === 201) {
        toast.success(data.message);
        navigate(redirectTo || '/'); // Navigate to redirectTo if provided, otherwise go to home
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <ClipLoader color="#3B82F6" /> {/* Blue color for the spinner */}
        </div>
      ) : (
        <div className="mx-auto px-4 w-full max-w-md sm:w-[400px]">
          <Card className="bg-gray-800 text-white shadow-lg rounded-lg w-full transform transition-all hover:scale-105 hover:shadow-2xl">
            {/* Card Header */}
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Enter OTP
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter OTP sent to your email address to continue registration
              </CardDescription>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="space-y-4">
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {/* OTP Input */}
                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={(otp) => setOtp(otp)}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <InputOTPGroup className="flex gap-2">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-12 h-12 text-lg border-2 border-gray-600 rounded-md bg-gray-700 text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
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
            <CardFooter className="flex justify-center">
              <Button
                variant="link"
                className="text-blue-500 hover:text-blue-400 transition-all duration-300 ease-in-out"
                onClick={() => navigate('/register')}
              >
                Resend OTP
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default VerifyOtp;
