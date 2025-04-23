import React from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardCard from '../Component/DashboardCard';
import card0 from '../assets/images/card0.svg';
import img1 from '../assets/images/img1.svg';
import img2 from '../assets/images/img2.svg';
import img3 from '../assets/images/img3.svg';
import img4 from '../assets/images/img4.svg';
const Dashboard = () => {

  return (
    <DashboardLayout>

      <div className='relative grid grid-rows-5 grid-cols-5  ml-[280px] gap-2 mt-28 h-full -z-1 bg-gray-300'>
        <DashboardCard src={card0} />
        <DashboardCard src={img1} />
        <DashboardCard src={img2} />
        <DashboardCard src={img3} />
        <DashboardCard src={img4} />
        <DashboardCard src={card0} />
        <DashboardCard src={img1} />
        <DashboardCard src={img2} />
        <DashboardCard src={img3} />
        <DashboardCard src={img4} />
        <DashboardCard src={card0} />
        <DashboardCard src={img1} />
        <DashboardCard src={img2} />
        <DashboardCard src={img3} />
        <DashboardCard src={img4} />
        <DashboardCard src={card0} />
        <DashboardCard src={img1} />
        <DashboardCard src={img2} />
        <DashboardCard src={img3} />
        <DashboardCard src={img4} />
        <DashboardCard src={card0} />
        <DashboardCard src={img1} />
        <DashboardCard src={img2} />
        <DashboardCard src={img3} />
        <DashboardCard src={img4} />
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;
