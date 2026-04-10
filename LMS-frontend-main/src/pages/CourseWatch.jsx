import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CheckCircle, Circle, PlayCircle, Menu, X, ArrowLeft, Trophy } from 'lucide-react';

const CourseWatch = () => {
    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(null);
    const [currentLecture, setCurrentLecture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const courseRes = await axios.get(`/api/courses/${id}`, config);
                setCourse(courseRes.data);

                const progressRes = await axios.get(`/api/progress/${id}`, config);
                setProgress(progressRes.data);

                let lectureToShow = null;
                if (progressRes.data.lastWatchedLecture) {
                    for (const section of courseRes.data.sections) {
                        const found = section.lectures.find(l => l._id === progressRes.data.lastWatchedLecture);
                        if (found) {
                            lectureToShow = found;
                            break;
                        }
                    }
                }

                if (!lectureToShow && courseRes.data.sections.length > 0 && courseRes.data.sections[0].lectures.length > 0) {
                    lectureToShow = courseRes.data.sections[0].lectures[0];
                }

                setCurrentLecture(lectureToShow);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course data', error);
                if (error.response?.status === 403) {
                    alert('You are not enrolled in this course.');
                    navigate(`/courses/${id}`);
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [id, user, navigate]);

    const markAsComplete = async () => {
        if (!currentLecture) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const res = await axios.post(
                `/api/progress/${id}/lecture/${currentLecture._id}`,
                {},
                config
            );
            setProgress(res.data);
        } catch (error) {
            console.error('Error marking as complete', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-dark-900 border-t border-white/10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    if (!course) {
        return <div className="p-8 text-center text-xl text-white bg-dark-900 min-h-screen">Course not found.</div>;
    }

    // Calculate Progress Percentage
    const totalLectures = course.sections.reduce((acc, sec) => acc + sec.lectures.length, 0);
    const completedCount = progress?.completedLectures.length || 0;
    const progressPercentage = totalLectures === 0 ? 0 : Math.round((completedCount / totalLectures) * 100);

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-black text-slate-300 font-sans">

            {/* Main Content Area (Cinematic Dark Mode) */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:mr-80' : ''}`}>

                {/* Top Video Navbar */}
                <div className="bg-dark-900/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-white/10 z-10 w-full relative h-14 shrink-0">
                    <div className="flex items-center gap-4 overflow-hidden">
                        <Link to={`/courses/${id}`} className="text-slate-400 hover:text-white transition-colors shrink-0 flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-base font-bold text-white truncate max-w-lg">{course.title}</h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium border border-white/10 shrink-0"
                    >
                        {sidebarOpen ? (
                            <><X size={18} className="hidden sm:block" /> <span className="sm:hidden"><Menu size={18} /></span> <span className="hidden sm:inline">Close Panel</span></>
                        ) : (
                            <><Menu size={18} /> <span className="hidden sm:inline">Course Content</span></>
                        )}
                    </button>
                </div>

                {/* Video Player Section */}
                <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
                    {currentLecture ? (
                        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-full">
                            {/* Player Container - 16:9 Aspect Ratio Focus */}
                            <div className="w-full bg-black flex-shrink-0 relative">
                                <div className="aspect-w-16 aspect-h-9 sm:aspect-h-7 md:aspect-h-9">
                                    {currentLecture.videoUrl.includes('youtube.com') || currentLecture.videoUrl.includes('youtu.be') ? (
                                        <iframe
                                            src={currentLecture.videoUrl.replace('watch?v=', 'embed/').split('&')[0]}
                                            title={currentLecture.lectureTitle}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full shadow-2xl"
                                        ></iframe>
                                    ) : (
                                        <video
                                            controls
                                            className="w-full h-full object-contain"
                                            src={currentLecture.videoUrl}
                                            onEnded={markAsComplete}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            </div>

                            {/* Below Video Info */}
                            <div className="p-4 sm:p-6 md:p-8 flex-1 bg-dark-900 border-x border-b border-white/5 rounded-b-xl shadow-2xl mx-auto w-full mb-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                    <div className="flex-1">
                                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">{currentLecture.lectureTitle}</h2>
                                        <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
                                            <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-md border border-white/10">
                                                <Clock size={14} />
                                                {Math.floor(currentLecture.duration / 60)}:{('0' + currentLecture.duration % 60).slice(-2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="w-full sm:w-auto shrink-0 flex gap-3">
                                        <button
                                            onClick={markAsComplete}
                                            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg text-sm uppercase tracking-wide border ${progress?.completedLectures.includes(currentLecture._id)
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/50 hover:bg-green-500/20 shadow-green-900/20'
                                                    : 'bg-brand-600 text-white border-transparent hover:bg-brand-500 shadow-brand-900/50'
                                                }`}
                                        >
                                            {progress?.completedLectures.includes(currentLecture._id) ? (
                                                <>
                                                    <CheckCircle size={18} className="text-green-400" />
                                                    Completed
                                                </>
                                            ) : (
                                                <>
                                                    <Circle size={18} className="text-white/70" />
                                                    Mark as Complete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500">
                            <div className="bg-white/5 p-6 rounded-full mb-6">
                                <PlayCircle size={64} className="opacity-50" />
                            </div>
                            <p className="text-xl font-medium">Select a lecture from the sidebar to begin.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar - Course Content (Modern glass nav) */}
            <div
                className={`fixed inset-y-0 right-0 z-20 w-80 bg-dark-900 border-l border-white/10 overflow-hidden flex flex-col transition-transform duration-300 transform mt-16 lg:mt-0 shadow-2xl ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ top: '64px', height: 'calc(100vh - 64px)' }}
            >
                {/* Sidebar Header */}
                <div className="p-5 border-b border-white/10 bg-dark-800 shrink-0">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-white text-lg">Course Content</h2>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white bg-white/5 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Progress Mini Bar */}
                    <div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                            <span className="flex items-center gap-1"><Trophy size={14} className="text-yellow-500" /> Progress</span>
                            <span className="text-white">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-black/50 rounded-full h-2 border border-white/5 overflow-hidden">
                            <div className="bg-gradient-to-r from-brand-600 to-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 font-medium">{completedCount} of {totalLectures} items completed</p>
                    </div>
                </div>

                {/* Sidebar Scrollable List */}
                <div className="overflow-y-auto flex-1 dark-scrollbar bg-dark-900 border-b border-transparent">
                    {course.sections.map((section, index) => (
                        <div key={section._id} className="border-b border-white/5">
                            <div className="bg-dark-800/80 px-5 py-3.5 sticky top-0 z-10 backdrop-blur-sm border-y border-white/5 mb-[1px]">
                                <h3 className="font-bold text-slate-300 text-sm">Section {index + 1}: {section.sectionTitle}</h3>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">{section.lectures.length} lectures</p>
                            </div>

                            <ul className="py-2 space-y-1">
                                {section.lectures.map((lecture, lIndex) => {
                                    const isCompleted = progress?.completedLectures.includes(lecture._id);
                                    const isCurrent = currentLecture?._id === lecture._id;

                                    return (
                                        <li key={lecture._id} className="px-2">
                                            <button
                                                onClick={() => setCurrentLecture(lecture)}
                                                className={`w-full text-left px-3 py-3 rounded-lg flex items-start gap-3 transition-all ${isCurrent
                                                        ? 'bg-brand-600/20 text-white ring-1 ring-brand-500/50 shadow-inner'
                                                        : 'hover:bg-white/5 text-slate-400 hover:text-slate-300'
                                                    }`}
                                            >
                                                <div className="mt-0.5 flex-shrink-0">
                                                    {isCompleted ? (
                                                        <CheckCircle size={18} className="text-green-400" />
                                                    ) : (
                                                        <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${isCurrent ? 'border-brand-500/50' : 'border-slate-600'}`}>
                                                            {isCurrent && <div className="w-2 h-2 bg-brand-400 rounded-full"></div>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className={`text-sm leading-snug font-medium mb-1 ${isCurrent ? 'text-white' : ''}`}>
                                                        {lIndex + 1}. {lecture.lectureTitle}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                                                        <PlayCircle size={10} />
                                                        {Math.floor(lecture.duration / 60)}:{('0' + lecture.duration % 60).slice(-2)}
                                                    </div>
                                                </div>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseWatch;
