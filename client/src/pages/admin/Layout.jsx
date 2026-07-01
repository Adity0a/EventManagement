import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Logo from "../../components/common/Logo";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Layout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        toast.success("Logged out successfully");
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex items-center justify-between py-4 px-6 md:px-12 border-b border-gray-100 bg-white sticky top-0 z-50">
                <div className="flex items-center gap-3">
                  <Logo />
                  <span className="text-[10px] bg-purple-50 text-[#7c3aed] px-2 py-1 rounded-md font-black tracking-[0.2em] uppercase">Admin Portal</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#7c3aed] transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
            </div>
            <div className="flex h-[calc(100vh-73px)]">
                <Sidebar />
                <div className="flex-1 overflow-y-auto">
                   <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;

