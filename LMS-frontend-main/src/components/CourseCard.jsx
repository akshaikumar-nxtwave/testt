import { Link } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen, Star } from 'lucide-react';

const CourseCard = ({ course }) => {
    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
            {/* Thumbnail Container */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                <img
                    src={
                        course.thumbnail === 'no-photo.jpg'
                            ? 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
                            : course.thumbnail
                    }
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Play Overlay on Hover */}
                <div className="absolute inset-0 bg-dark-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle size={48} className="text-white drop-shadow-lg" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-brand-600 rounded-full shadow-sm">
                    {course.category}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">
                        {course.title}
                    </h3>
                </div>

                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {course.description}
                </p>

                {/* Instructor Info */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs">
                        {course.instructorId?.name ? course.instructorId.name.charAt(0) : 'I'}
                    </div>
                    <span className="text-xs font-medium text-slate-600">
                        {course.instructorId?.name || 'Unknown Instructor'}
                    </span>
                </div>

                {/* Meta details & Divider */}
                <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-1">
                            <BookOpen size={16} className="text-purple-500" />
                            <span>{course.sections?.length || 0} Sections</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-500" />
                            <span>4.8</span>
                        </div>
                    </div>

                    <div className="text-lg font-extrabold text-slate-900">
                        ${course.price === 0 ? 'Free' : course.price}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
