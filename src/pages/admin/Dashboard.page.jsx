import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, School, Calendar, MessageSquareText } from 'lucide-react';
import { useDashboardQuery } from '@hooks';

const DashboardOverview = () => {
    const { data } = useDashboardQuery();
    console.log('data',data);
  
  const stats = [
    {
      title: 'Total Volunteers',
      value: data?.data?.volunteers.length,
      icon: <Users className="w-9 h-9 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'Total Courses',
      value: data?.data?.courses.length,
      icon: <School className="w-9 h-9 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Total Events',
      value: data?.data?.events.length,
      icon: <Calendar className="w-9 h-9 text-yellow-600" />,
      bg: 'bg-yellow-50',
    },
    {
      title: 'Total Contacts',
      value: data?.data?.contacts.length,
      icon: <MessageSquareText className="w-9 h-9 text-red-600" />,
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="pt-7 pb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`rounded-md shadow-sm p-6 ${stat.bg} flex items-center justify-between`}>
            <div>
              <div className="text-sm text-gray-600 ">{stat.title}</div>
              <div className="text-xl font-bold text-black">{stat.value}</div>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const nav = useNavigate();

  return (
    <div className="  p-6 ">
      {/* Overview */}
      <DashboardOverview />
    </div>
  );
};
