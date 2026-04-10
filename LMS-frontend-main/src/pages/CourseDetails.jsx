import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PlayCircle, CheckCircle, Clock, BookOpen, User, Star, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

const CourseDetails = () => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(0); // For accordion

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`/api/courses/${id}`);
                setCourse(data);

                // Check if user is enrolled
                if (user) {
                    const enrollRes = await axios.get('/api/enroll', {
                        headers: { Authorization: `Bearer ${user.token}` },
                    });
                    const enrolledCourses = enrollRes.data;
                    const found = enrolledCourses.find(e => e.courseId._id === id);
                    if (found) setIsEnrolled(true);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching course', error);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id, user]);

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setEnrolling(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            await axios.post(`/api/enroll/${id}`, {}, config);
            setIsEnrolled(true);
            setEnrolling(false);
            navigate(`/courses/${id}/watch`);
        } catch (error) {
            console.error('Enrollment error', error);
            alert(error.response?.data?.message || 'Enrollment failed');
            setEnrolling(false);
        }
    };

    const toggleSection = (index) => {
        setActiveSection(activeSection === index ? null : index);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    if (!course) {
        return <div className="p-8 text-center text-xl text-slate-600 font-medium">Course not found.</div>;
    }

    // Calculate total lectures
    const totalLectures = course.sections?.reduce((acc, section) => acc + section.lectures.length, 0) || 0;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">

            {/* Hero Banner Area */}
            <div className="bg-dark-900 text-white relative">
                <div className="absolute inset-0 overflow-hidden hidden lg:block z-0">
                    {course.thumbnail !== 'no-photo.jpg' && (
                        <img
                            src={course.thumbnail}
                            alt="Background"
                            className="w-full h-full object-cover opacity-20 filter blur-xl scale-110"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 flex flex-col lg:flex-row gap-12">

                    {/* Left Course Info */}
                    <div className="lg:w-2/3">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-sm font-bold border border-brand-500/30">
                                {course.category}
                            </span>
                            <div className="flex items-center text-yellow-500 text-sm font-bold">
                                <Star size={16} className="mr-1 fill-current" />
                                4.8 (1,234 ratings)
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            {course.title}
                        </h1>

                        <p className="text-lg text-slate-300 mb-8 max-w-3xl leading-relaxed">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium pb-8 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="bg-purple-500/20 p-2 rounded-full text-purple-400">
                                    <User size={18} />
                                </div>
                                Created by <span className="text-white hover:underline cursor-pointer">{course.instructorId?.name || 'Instructor'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                                    <BookOpen size={18} />
                                </div>
                                {totalLectures} Lectures
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-green-500/20 p-2 rounded-full text-green-400">
                                    <ShieldCheck size={18} />
                                </div>
                                Certificate of completion
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-8 z-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content Area */}
                    <div className="lg:w-2/3 pt-12">

                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Content</h2>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                <span className="font-semibold text-slate-700">{course.sections?.length || 0} sections • {totalLectures} lectures</span>
                                <button onClick={() => setActiveSection(null)} className="text-sm font-medium text-brand-600 hover:text-brand-700">Expand all sections</button>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {course.sections?.length > 0 ? (
                                    course.sections.map((section, index) => (
                                        <div key={section._id} className="bg-white">
                                            <button
                                                onClick={() => toggleSection(index)}
                                                className="w-full px-6 py-5 flex justify-between items-center hover:bg-slate-50 transition-colors focus:outline-none focus:bg-slate-50 text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {activeSection === index ? <ChevronUp className="text-slate-400" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
                                                    <h3 className="text-lg font-bold text-slate-800">{section.sectionTitle}</h3>
                                                </div>
                                                <span className="text-sm text-slate-500 font-medium hidden sm:block">
                                                    {section.lectures.length} lectures
                                                </span>
                                            </button>

                                            {/* Accordion Content */}
                                            {activeSection === index && (
                                                <div className="px-6 pb-4 pt-1 border-t border-slate-50 bg-slate-50/50">
                                                    <ul className="space-y-1">
                                                        {section.lectures.length > 0 ? (
                                                            section.lectures.map((lecture, lIndex) => (
                                                                <li key={lecture._id} className="flex justify-between items-center py-3 px-4 hover:bg-white rounded-lg transition-colors group">
                                                                    <div className="flex items-start gap-4 flex-1">
                                                                        <PlayCircle size={18} className="text-slate-400 mt-1 group-hover:text-brand-500 transition-colors" />
                                                                        <div>
                                                                            <span className="text-slate-700 font-medium group-hover:text-brand-600 transition-colors">
                                                                                {lIndex + 1}. {lecture.lectureTitle}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-sm text-slate-500 flex items-center gap-1 font-medium">
                                                                        <span className="hidden sm:inline">Preview</span>
                                                                        <span className="w-12 text-right">
                                                                            {Math.floor(lecture.duration / 60)}:{('0' + lecture.duration % 60).slice(-2)}
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="py-2 text-slate-500 text-sm italic">No lectures in this section yet.</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-slate-500 italic">No course content available yet.</div>
                                )}
                            </div>
                        </div>

                        {/* Instructor section could go here */}

                    </div>

                    {/* Right Sticky Sidebar (Enrollment Card) */}
                    <div className="lg:w-1/3 lg:absolute lg:right-8 lg:-top-64">
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden sticky top-24 z-30 transition-shadow hover:shadow-brand-500/10">
                            {/* Card Image */}
                            <div className="h-64 relative bg-slate-900 overflow-hidden hidden lg:block">
                                <img
                                    src={course.thumbnail === 'no-photo.jpg' ? 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1074&q=80' : course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-md cursor-pointer hover:bg-white/30 transition-colors">
                                        <PlayCircle size={48} className="text-white drop-shadow-md" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="text-4xl font-extrabold text-slate-900 mb-6">
                                    ${course.price === 0 ? 'Free' : course.price}
                                </div>

                                {isEnrolled ? (
                                    <Link
                                        to={`/courses/${id}/watch`}
                                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-green-600 hover:bg-green-700 transition-colors items-center gap-2"
                                    >
                                        <CheckCircle size={20} />
                                        Continue Learning
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleEnroll}
                                        disabled={enrolling}
                                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-base font-bold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 transition-all transform hover:-translate-y-1 disabled:opacity-50"
                                    >
                                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                    </button>
                                )}

                                <p className="mt-4 text-center text-xs text-slate-500 font-medium">30-Day Money-Back Guarantee</p>

                                <div className="mt-8 space-y-4 text-sm text-slate-700">
                                    <h4 className="font-bold text-slate-900 mb-2">This course includes:</h4>
                                    <div className="flex items-center gap-3">
                                        <PlayCircle size={16} className="text-slate-400" />
                                        <span>{totalLectures * 10} minutes on-demand video</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen size={16} className="text-slate-400" />
                                        <span>Full lifetime access</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck size={16} className="text-slate-400" />
                                        <span>Certificate of completion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
