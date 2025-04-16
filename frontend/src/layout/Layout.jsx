import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen"> {/* Gradient background */}
        <div className="flex h-full">
          {/* Sidebar */}
          <Sidebar className="lg:block hidden" /> {/* Hidden on smaller screens */}
          <div className="flex-1 h-full pt-6 max-w-min text-center mx-auto my-0 md:max-w-min lg:max-w-4xl px-4 sm:px-8">
            <h1 className="text-gray-300 font-bold pb-20v mb-12 font-size-1xl md:text-4xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> 
            🔐 AuthFeedback System <span className="text-xl">✉️</span> 
            </h1>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
