import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserContext from '@/context/Usercontext';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LogOut, KeyRound, UserCircle2 } from 'lucide-react';

const API_BASE_URL = '/api';

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setlogoutLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/auth/check-login-on-start`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePassChange = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/change-pass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, currentPassword, newPassword }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.status === 200) toast.success(data.message);
      else toast.error(data.message);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setlogoutLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setUser(null);
        toast.success(data.message);
        navigate('/');
      } else toast.error(data.message);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setlogoutLoading(false);
    }
  };

  if (loading || logoutLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
    <div className="w-full max-w-lg space-y-8 bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-xl overflow-hidden">
      {/* Header Section */}
      <div className="text-center space-y-1">
        <UserCircle2 className="w-16 h-16 text-blue-400 mx-auto" />
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {userData?.username || 'Loading...'}
        </h1>
        <p className="text-gray-300 text-sm">{userData?.email || 'Loading...'}</p>
      </div>
  
      {/* Buttons Section */}
      <div className="space-y-4">
        {/* Edit Password */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full flex gap-2 items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-all duration-300">
              <KeyRound className="w-5 h-5" />
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white rounded-lg border border-gray-600">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Change Password
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Update your password securely.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePassChange} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-gray-300">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  className="bg-gray-700 border border-gray-600"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-gray-300">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  className="bg-gray-700 border border-gray-600"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-all duration-300"
                >
                  Save Changes
                </Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
  
        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="w-full flex gap-2 items-center justify-center bg-gradient-to-r from-red-600 to-pink-600 hover:scale-105 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  </div>
  

  );
};

export default Account;
