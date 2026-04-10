import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { Search, Flame, Clock, BookMarked, Filter } from 'lucide-react';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Hardcoded categories for UI filtering demo
    const categories = ['All', 'Programming', 'Design', 'Business', 'Marketing'];

    const fetchCourses = async (searchQuery = '') => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/courses?keyword=${searchQuery}`);
            setCourses(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCourses(keyword);
    };

    const filteredCourses = activeCategory === 'All'
        ? courses
        : courses.filter(c => c.category === activeCategory);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">

            {/* Modern Header Section */}
            <div className="bg-dark-900 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600/20 to-purple-600/30 mix-blend-screen"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Explore Our Course Catalog</h1>
                    <p className="text-lg text-brand-100 max-w-2xl mx-auto mb-10">
                        Find the perfect course to advance your skills. Learn from industry experts and get certified.
                    </p>

                    {/* Enhanced Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-brand-400 group-focus-within:text-brand-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-12 pr-32 py-4 rounded-xl text-slate-900 bg-white border-2 border-transparent focus:border-brand-500 focus:ring-0 text-lg shadow-xl outline-none transition-all"
                            placeholder="What do you want to learn today?"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-md"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8 gap-4">

                    {/* Category Filter Pills */}
                    <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 hide-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                                        ? 'bg-brand-600 text-white shadow-md'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort/Filter utility */}
                    <div className="flex items-center gap-2 w-full md:w-auto text-sm">
                        <span className="text-slate-500">Showing {filteredCourses.length} results</span>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors ml-auto">
                            <Filter size={16} className="text-slate-600" />
                            <span className="font-medium text-slate-700">Filters</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">No Courses Found</h3>
                        <p className="text-slate-500">We couldn't find any courses matching your current filters.</p>
                        <button
                            onClick={() => { setKeyword(''); setActiveCategory('All'); fetchCourses(''); }}
                            className="mt-6 text-brand-600 font-semibold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredCourses.map((course) => (
                            <Link to={`/courses/${course._id}`} key={course._id}>
                                <CourseCard course={course} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
