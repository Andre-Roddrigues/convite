import React from 'react';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Sidebar from '../../components/Sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <SidebarMobile />
      <div className="flex-grow h-full bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
