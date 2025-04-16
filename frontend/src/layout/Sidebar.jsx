import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { EditIcon, InfoOutlineIcon, HamburgerIcon } from '@chakra-ui/icons';
import { CiLogin } from 'react-icons/ci';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div>
      {/* Hamburger Button for Small Screens */}
      <Sheet>
        <SheetTrigger>
          <button
            className="block md:hidden p-2 border rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 ease-in-out"
            aria-label="Open Sidebar"
          >
            <HamburgerIcon />
          </button>
        </SheetTrigger>
        <SheetContent side={'left'} className="bg-gray-800 text-white">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              AuthFeedback System
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center gap-6 pt-8">
            <Link
              to="/dashboard"
              className={`flex items-center text-lg ${location.pathname === '/Dashboard' ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'} transition-all duration-300 ease-in-out`}
            >
              <span className="mr-2">👤</span>
              User
            </Link>
            <SheetClose asChild>
              <Link
                to="/"
                className={`flex items-center text-lg ${location.pathname === '/' ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'} transition-all duration-300 ease-in-out`}
              >
                <CiLogin className="mr-2" />
                Login
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to="/register"
                className={`flex items-center text-lg ${location.pathname === '/register' ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'} transition-all duration-300 ease-in-out`}
              >
                <EditIcon className="mr-2" />
                Register
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to="/feedback"
                className={`flex items-center text-lg ${location.pathname === '/feedback' ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'} transition-all duration-300 ease-in-out`}
              >
                <InfoOutlineIcon className="mr-2" />
                FeedbackForm
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar for Larger Screens */}
      <div className="fixed top-0 left-0 h-full w-40 flex-col items-center shadow-2xl gap-6 pt-8 hidden md:flex bg-gray-800">
      <Link
          to="/dashboard"
          className={`flex items-center text-lg ${location.pathname === '/Dashboard' ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'} transition-all duration-300 ease-in-out`}
        >
          <span className="mr-2">👤</span>
          User
        </Link>
            
        <Link
          to="/"
          className={`flex items-center text-lg ${location.pathname === '/' ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'} transition-all duration-300 ease-in-out`}
        >
          <CiLogin className="mr-2" />
          Login
        </Link>
        <Link
          to="/register"
          className={`flex items-center text-lg ${location.pathname === '/register' ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'} transition-all duration-300 ease-in-out`}
        >
          <EditIcon className="mr-2" />
          Register
        </Link>
       
        <Link
          to="/feedback"
          className={`flex items-center text-lg ${location.pathname === '/feedback' ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'} transition-all duration-300 ease-in-out`}
        >
          <InfoOutlineIcon className="mr-2" />
          Feedback
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
