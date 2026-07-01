import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6 bg-white">

      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-4 px-6 md:min-w-64 cursor-pointer transition-all ${
            isActive ? "bg-purple-50 text-[#7c3aed] border-r-4 border-[#7c3aed]" : "text-gray-500 hover:bg-gray-50"
          }`
        }
      >
        <LayoutDashboard size={20} />
        <p className="hidden md:inline-block font-bold text-sm uppercase tracking-wider">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/add-event"
        className={({ isActive }) =>
          `flex items-center gap-3 py-4 px-6 md:min-w-64 cursor-pointer transition-all ${
            isActive ? "bg-purple-50 text-[#7c3aed] border-r-4 border-[#7c3aed]" : "text-gray-500 hover:bg-gray-50"
          }`
        }
      >
        <PlusCircle size={20} />
        <p className="hidden md:inline-block font-bold text-sm uppercase tracking-wider">Add Event</p>
      </NavLink>

      <NavLink
        to="/admin/list-events"
        className={({ isActive }) =>
          `flex items-center gap-3 py-4 px-6 md:min-w-64 cursor-pointer transition-all ${
            isActive ? "bg-purple-50 text-[#7c3aed] border-r-4 border-[#7c3aed]" : "text-gray-500 hover:bg-gray-50"
          }`
        }
      >
        <List size={20} />
        <p className="hidden md:inline-block font-bold text-sm uppercase tracking-wider">Manage Events</p>
      </NavLink>
    </div>
  );
}

export default Sidebar;

