import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AuthData } from '../Auth/AuthContext'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const { user } = AuthData();
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.token}` };
        const [studentsRes, teachersRes] = await Promise.all([
          axios.get(`${API_URL}/student`, { headers }),
          axios.get(`${API_URL}/teachers`, { headers }),
        ]);
        setStats({
          students: studentsRes.data.length,
          teachers: teachersRes.data.length,
          courses: 0,
        });
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      }
    };
    fetchStats();
  }, [user.token]);

  const data = [
    { year: "1CP", count: 340, color: "#1A8CFF" },
    { year: "2CP", count: 220, color: "#F4A636" },
    { year: "1CS", count: 180, color: "#A23D5C" },
    { year: "2CS", count: 90, color: "#D9E8FF" },
    { year: "3CS", count: 170, color: "#4B4DA0" },
    { year: "Other", count: 190, color: "#57D9A3" }
  ];

  return (
    <div className='w-full min-h-screen bg-bluebg'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold text-blue my-6 ml-8'>Dashboard</h1>
      </div>
      <div className='grid grid-cols-4 gap-8 mx-8'>
        {/* Total Students */}
        <div className='bg-white shadow-lg flex flex-row justify-around items-center py-4 rounded-xl'>
          <div className='flex flex-col items-start'>
            <p className='text-xs font-light text-gray'>Total Students</p>
            <p className='text-xl font-semibold'>{stats.students.toLocaleString()}</p>
          </div>
          <div className='bg-blue/10 p-3 rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#001950" className="w-7 h-7">
              <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
              <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 1-8.105 2.571.75.75 0 0 1-.832-.527 47.077 47.077 0 0 1-1.524-7.055.75.75 0 0 1 .54-.827Z" />
              <path d="M6.823 16.732a.75.75 0 0 1-.12.832l-3 3a.75.75 0 1 1-1.06-1.06l3-3a.75.75 0 0 1 1.18.228Z" />
            </svg>
          </div>
        </div>

        {/* Total Teachers */}
        <div className='bg-white shadow-lg flex flex-row justify-around items-center py-4 rounded-xl'>
          <div className='flex flex-col items-start'>
            <p className='text-xs font-light text-gray'>Total Teachers</p>
            <p className='text-xl font-semibold'>{stats.teachers.toLocaleString()}</p>
          </div>
          <div className='bg-primary/10 p-3 rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2E86FB" className="w-7 h-7">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Total Courses */}
        <div className='bg-white shadow-lg flex flex-row justify-around items-center py-4 rounded-xl'>
          <div className='flex flex-col items-start'>
            <p className='text-xs font-light text-gray'>Total Courses</p>
            <p className='text-xl font-semibold'>{stats.courses.toLocaleString()}</p>
          </div>
          <div className='bg-purple-500/10 p-3 rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7C3AED" className="w-7 h-7">
              <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
            </svg>
          </div>
        </div>
        <div className='bg-white shadow-lg flex flex-row justify-around py-4 rounded-xl'>
          <div className='flex flex-col items-start'>
            <p className='text-xs font-light text-gray'>Active Rate</p>
            <p className='text-xl font-semibold'>66%</p>
          </div>
          <div style={{ width: 50, height: 50 }}>
            <CircularProgressbar value={66}
              strokeWidth={15}
              styles={buildStyles({
                pathColor: '#57D9A3',
                trailColor: '#F4FBF8',
              })} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md w-full col-span-3 flex flex-col h-[270px]">
          <p className="text-sm font-semibold text-black ml-3 my-3">Tracking the active accounts by year</p>
          <div className='px-5 flex-grow'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barCategoryGap={40}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#1A1A2E" />
                <YAxis stroke="#1A1A2E" />
                <Tooltip />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} label={{ position: "top", fill: "#444" }}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='bg-white shadow-lg rounded-lg flex flex-col items-start pt-1 px-3'>
          <p className='font-semibold text-sm'>Active Users</p>
          <p className='font-light text-xs text-gray'>From 1 Jun - 30 Dec, 2024</p>
          <div className='w-full pt-5 px-9'>
            <CircularProgressbar value={66}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: '#2E86FB',
                trailColor: '#F4F8FB',
              })} />
          </div>
          <div className='w-full flex flex-row flex-grow items-center justify-around'>
            <div className='flex flex-col items-center'>
              <div className='flex flex-row items-center gap-1 justify-center'>
                <div className='bg-primary h-2 w-2 rounded-full'></div>
                <p className='text-xs'>Active</p>
              </div>
              <p className='text-xs'>66%</p>
            </div>
            <div className='flex flex-col items-center'>
              <div className='flex flex-row items-center gap-1 justify-center'>
                <div className='bg-bluebg h-2 w-2 rounded-full'></div>
                <p className='text-xs'>Inactive</p>
              </div>
              <p className='text-xs'>34%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
