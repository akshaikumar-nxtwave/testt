import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Video, Play, Edit, Trash2, Users, DollarSign, Activity, BookOpen } from 'lucide-react';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role !== 'instructor' && user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchInstructorCourses = async () => {
            try {
                const { data } = await axios.get('/api/courses');
                const myCourses = data.filter(c => c.instructorId && c.instructorId._id === user._id);
                setCourses(myCourses);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses', error);
                setLoading(false);
            }
        };

        fetchInstructorCourses();
    }, [user, navigate]);

    const deleteCourseHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await axios.delete(`/api/courses/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setCourses(courses.filter(course => course._id !== id));
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

    // Calculate dummy total revenue based on courses created (for UI demo)
    const totalRevenue = courses.reduce((acc, course) => acc + (course.price * Math.floor(Math.random() * 50)), 0);

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] pb-12">

            {/* Top Banner Area */}
            <div className="bg-white border-b border-slate-200 py-8 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Instructor Dashboard</h1>
                        <p className="mt-1 text-slate-500 font-medium">Manage your courses, track student engagement, and view earnings.</p>
                    </div>
                    <Link
                        to="/instructor/course/create"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-500 hover:to-brand-400 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/30 transform hover:-translate-y-1"
                    >
                        <PlusCircle size={20} />
                        Create New Course
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                {/* Top metrics cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-brand-50 p-3 rounded-xl text-brand-600">
                                <Video size={24} />
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Courses</p>
                            <p className="text-3xl font-black text-slate-900">{courses.length}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                                <Users size={24} />
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Students</p>
                            <p className="text-3xl font-black text-slate-900">{courses.length * 142}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-green-50 p-3 rounded-xl text-green-600">
                                <DollarSign size={24} />
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Earnings</p>
                            <p className="text-3xl font-black text-slate-900">${totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
                                <Activity size={24} />
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Avg. Rating</p>
                            <p className="text-3xl font-black text-slate-900">4.8</p>
                        </div>
                    </div>
                </div>

                {/* Courses Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-extrabold text-slate-800 flex items-center gap-2 text-lg">
                            <BookOpen size={20} className="text-brand-600" /> My Published Courses
                        </h2>
                        <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                            {courses.length} Items
                        </span>
                    </div>

                    {courses.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <Video className="h-10 w-10 text-slate-300" />
                            </div>
                            <p className="text-slate-500 text-lg font-medium mb-6">You haven't created any courses yet.</p>
                            <Link
                                to="/instructor/course/create"
                                className="inline-flex text-brand-600 font-bold hover:underline"
                            >
                                Create your first course
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Course Detail</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Manage</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 items-center">
                                    {courses.map((course) => (
                                        <tr key={course._id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-24 flex-shrink-0 bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                                                        <img
                                                            className="h-full w-full object-cover"
                                                            src={course.thumbnail === 'no-photo.jpg' ? 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80' : course.thumbnail}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-900 mb-1">{course.title}</div>
                                                        <div className="text-xs text-slate-500 font-medium">Updated 2 days ago</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                                                    {course.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="text-sm font-bold text-slate-900">${course.price === 0 ? 'Free' : course.price}</div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                                                <div className="flex justify-end gap-2 items-center">
                                                    <Link to={`/courses/${course._id}`} className="p-2 text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors" title="View as student">
                                                        <Play size={18} />
                                                    </Link>
                                                    <button className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Edit course">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button onClick={() => deleteCourseHandler(course._id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Delete course">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
