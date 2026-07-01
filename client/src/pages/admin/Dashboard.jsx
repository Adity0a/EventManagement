import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Calendar, Users, Eye, TrendingUp, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/react';

const Dashboard = () => {
  const { axios, backendUrl } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const fetchDashboardData = async () => {
    try {
      let token = localStorage.getItem('token') || localStorage.getItem('adminToken');

      if (!token) {
        token = await getToken();
      }

      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { token }
      });

      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
        if (data.message.includes("Not Authorized") || data.message.includes("Login Again")) {
            localStorage.removeItem('token');
            localStorage.removeItem('adminToken');
            navigate('/'); // Or to admin login
        }
      }
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="p-10 flex items-center justify-center min-h-[400px]">
       <Loader2 className="animate-spin text-[#7c3aed]" size={32} />
    </div>
  );

  const stats = [
    { label: 'Total Events', value: data?.totalEvents || 0, icon: <Calendar className="text-blue-500" />, change: '+12%' },
    { label: 'Total Registrations', value: data?.totalRegistrations || 0, icon: <Users className="text-green-500" />, change: '+5%' },
    { label: 'Page Views', value: '50', icon: <Eye className="text-[#7c3aed]" />, change: '+18%' },
    { label: 'Conversion', value: '3.2%', icon: <TrendingUp className="text-[#7c3aed]" />, change: '+2%' },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <h2 className="text-2xl font-black mb-8 text-gray-800 tracking-tight">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-50 rounded-2xl">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black mb-6 tracking-tight">Recent Registrations</h3>
          <div className="space-y-6">
            {data?.recentRegistrations?.length > 0 ? data.recentRegistrations.map((reg, i) => (
              <div key={i} className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">
                    <span className="font-bold text-gray-900">{reg.fullName}</span> registered for an event
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{reg.email}</p>
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                  {new Date(reg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )) : (
              <p className="text-sm text-gray-400 italic">No recent registrations found.</p>
            )}
          </div>
        </div>

        {/* Popular Events */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black mb-6 tracking-tight">Recent Events</h3>
          <div className="space-y-5">
            {data?.popularEvents?.length > 0 ? data.popularEvents.map((event, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-default">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-md">
                   <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-gray-900 line-clamp-1 group-hover:text-[#7c3aed] transition-colors">{event.title}</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{event.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">450</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Views</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-400 italic">No events found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


