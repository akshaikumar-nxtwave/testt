import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldAlert, Users, BookOpen, Activity, Trash2, Mail, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
    const [usersList, setUsersList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchAdminData = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };

                const { data: usersData } = await axios.get('/api/auth/users', config);
                const { data: coursesData } = await axios.get('/api/courses');

                setUsersList(usersData);
                setCoursesList(coursesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin data', error);
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [user, navigate]);

    const deleteCourseHandler = async (id) => {
        if (window.confirm('Admin Action: Delete this course permanently? This action cannot be undone.')) {
            try {
                await axios.delete(`/api/courses/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setCoursesList(coursesList.filter((course) => course._id !== id));
            } catch (error) {
                console.error('Error deleting course', error);
                alert('Failed to delete course');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20 min-h-[calc(100vh-64px)] bg-slate-50 items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    // Calculate metrics
    const totalStudents = usersList.filter(u => u.role === 'student').length;
    const totalInstructors = usersList.filter(u => u.role === 'instructor').length;

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] pb-12">

            {/* Admin Top Banner */}
            <div className="bg-dark-900 text-white py-8 border-b-4 border-red-500 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
                    <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                        <ShieldAlert className="text-red-400" size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                            Admin Control Center
                        </h1>
                        <p className="mt-1 text-slate-400 font-medium">System overview and management privileges.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                {/* Global Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><Users size={20} /></div>
                            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs">Total Users</h3>
                        </div>
                        <p className="text-3xl font-black text-slate-900">{usersList.length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-purple-50 p-3 rounded-lg text-purple-600"><BookOpen size={20} /></div>
                            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs">Total Courses</h3>
                        </div>
                        <p className="text-3xl font-black text-slate-900">{coursesList.length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-green-50 p-3 rounded-lg text-green-600"><Activity size={20} /></div>
                            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs">Students</h3>
                        </div>
                        <p className="text-3xl font-black text-slate-900">{totalStudents}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-brand-50 p-3 rounded-lg text-brand-600"><LayoutDashboard size={20} /></div>
                            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs">Instructors</h3>
                        </div>
                        <p className="text-3xl font-black text-slate-900">{totalInstructors}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Users Management Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex justify-between items-center shrink-0">
                            <h2 className="font-extrabold text-slate-800 flex items-center gap-2">
                                <Users size={18} className="text-blue-600" /> Recent System Users
                            </h2>
                        </div>
                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                            <ul className="divide-y divide-slate-100">
                                {usersList.slice(0, 50).map((u) => (
                                    <li key={u._id} className="p-4 flex justify-between items-center hover:bg-slate-50/80 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{u.name}</p>
                                                <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12} /> {u.email}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border ${u.role === 'admin'
                                                ? 'bg-red-50 text-red-600 border-red-200'
                                                : u.role === 'instructor'
                                                    ? 'bg-purple-50 text-purple-600 border-purple-200'
                                                    : 'bg-green-50 text-green-600 border-green-200'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Courses Management Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex justify-between items-center shrink-0">
                            <h2 className="font-extrabold text-slate-800 flex items-center gap-2">
                                <BookOpen size={18} className="text-brand-600" /> Global Course Catalog
                            </h2>
                        </div>
                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                            <ul className="divide-y divide-slate-100">
                                {coursesList.map((c) => (
                                    <li key={c._id} className="p-4 flex justify-between items-center hover:bg-slate-50/80 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={c.thumbnail === 'no-photo.jpg' ? 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80' : c.thumbnail}
                                                className="w-16 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                                                alt=""
                                            />
                                            <div>
                                                <p className="font-bold text-slate-900 line-clamp-1 text-sm">{c.title}</p>
                                                <p className="text-[11px] font-medium text-brand-600">{c.category}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteCourseHandler(c._id)}
                                            className="text-red-600 hover:text-white bg-red-50 hover:bg-red-600 p-2 rounded-lg transition-colors border border-red-100 hover:border-red-600 shrink-0"
                                            title="Delete Course Permanently"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
