import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { PlayCircle, Award, BookOpen, Clock, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

const StudentDashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role !== 'student') {
            navigate('/');
            return;
        }

        const fetchEnrollments = async () => {
            try {
                const { data } = await axios.get('/api/enroll', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setEnrollments(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching enrollments', error);
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center py-20 min-h-[calc(100vh-64px)] bg-slate-50 items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] pb-12">

            {/* Welcome Banner */}
            <div className="bg-dark-900 text-white pt-12 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600/20 to-purple-600/30"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-purple-300">{user.name}</span>!
                        </h1>
                        <p className="text-brand-100 text-lg">Ready to continue your learning journey today?</p>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <div className="text-center px-6 py-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                            <div className="text-3xl font-black text-brand-300 mb-1">{enrollments.length}</div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-brand-100">Enrolled</div>
                        </div>
                        <div className="text-center px-6 py-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                            <div className="text-3xl font-black text-purple-300 mb-1">0</div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-purple-100">Completed</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-12 z-20">

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5 transform transition-transform hover:-translate-y-1">
                        <div className="bg-gradient-to-br from-brand-100 to-brand-50 p-4 rounded-xl text-brand-600 border border-brand-200/50">
                            <BookOpen size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Courses in Progress</p>
                            <p className="text-3xl font-extrabold text-slate-900">{enrollments.length}</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5 transform transition-transform hover:-translate-y-1">
                        <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-xl text-green-600 border border-green-200/50">
                            <Award size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Earned Certificates</p>
                            <p className="text-3xl font-extrabold text-slate-900">0</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5 transform transition-transform hover:-translate-y-1">
                        <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-xl text-purple-600 border border-purple-200/50">
                            <Activity size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Learning Streak</p>
                            <p className="text-3xl font-extrabold text-slate-900">1 <span className="text-lg font-medium text-slate-400">Day</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your Courses</h2>
                    <Link to="/courses" className="text-brand-600 font-semibold text-sm hover:underline flex items-center gap-1">
                        Browse more <ArrowRight size={16} />
                    </Link>
                </div>

                {enrollments.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No courses yet</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            You haven't enrolled in any courses yet. Start exploring our library to find your first course and begin your journey.
                        </p>
                        <Link
                            to="/courses"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-lg shadow-brand-500/30 text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 transition-all transform hover:-translate-y-1 gap-2"
                        >
                            Explore Catalog <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrollments.map((enrolled) => (
                            <div key={enrolled._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden group transition-all duration-300 flex flex-col h-full">
                                {/* Course Image Container */}
                                <div className="h-48 relative overflow-hidden bg-slate-900">
                                    <img
                                        src={
                                            enrolled.courseId.thumbnail === 'no-photo.jpg'
                                                ? 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
                                                : enrolled.courseId.thumbnail
                                        }
                                        alt={enrolled.courseId.title}
                                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-dark-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
                                            <PlayCircle size={40} className="text-white drop-shadow-md" />
                                        </div>
                                    </div>
                                    {/* Dummy dynamic progress badge on image */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                                        <Activity size={12} className="text-brand-500" />
                                        In Progress
                                    </div>
                                </div>

                                {/* Course Details */}
                                <div className="p-6 flex flex-col flex-1 border-t border-slate-100">
                                    <h3 className="font-bold text-lg text-slate-900 line-clamp-2 leading-tight mb-2 group-hover:text-brand-600 transition-colors">
                                        {enrolled.courseId.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium mb-6">By {enrolled.courseId.instructorId?.name || 'Instructor'}</p>

                                    <div className="mt-auto">
                                        {/* Enhanced Progress Bar */}
                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                                                <span className="flex items-center gap-1 text-brand-600"><CheckCircle2 size={14} /> Progress</span>
                                                <span>10%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2 border border-slate-200/50 overflow-hidden">
                                                <div className="bg-gradient-to-r from-brand-500 to-brand-400 h-full rounded-full w-[10%] shadow-inner"></div>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/courses/${enrolled.courseId._id}/watch`}
                                            className="w-full flex items-center justify-center gap-2 bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm group-hover:shadow-md"
                                        >
                                            <PlayCircle size={18} />
                                            Resume Learning
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
