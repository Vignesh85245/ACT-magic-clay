import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-full">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <div className=" w-full h-full gap-3">

          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
