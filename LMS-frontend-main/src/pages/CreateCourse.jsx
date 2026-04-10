import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft, Image as ImageIcon, Briefcase, FileText, Tag, DollarSign } from 'lucide-react';

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Programming',
        price: 0,
        thumbnail: 'no-photo.jpg',
    });
    const [loading, setLoading] = useState(false);

    const { title, description, category, price, thumbnail } = formData;
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            await axios.post('/api/courses', formData, config);

            alert('Course created successfully! You can now add sections and lectures via POSTMAN APIs for this demo.');
            navigate('/instructor/dashboard');
        } catch (error) {
            console.error('Error creating course', error);
            alert(error.response?.data?.message || 'Failed to create course');
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] pb-12">

            {/* Header */}
            <div className="bg-white border-b border-slate-200 py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/instructor/dashboard" className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-600 font-medium text-sm mb-4 transition-colors">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create a New Course</h1>
                    <p className="mt-1 text-slate-500">Provide the foundational details for your new course before uploading content.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                    <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Briefcase size={20} className="text-brand-600" /> Course Details
                        </h2>
                    </div>

                    <form onSubmit={onSubmit} className="p-8 space-y-8">

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-2">
                                Course Title <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 text-slate-400">
                                    <FileText size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    className="pl-10 w-full rounded-xl border border-slate-300 bg-slate-50 py-3 px-4 focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors shadow-sm text-slate-900"
                                    placeholder="e.g. Master React in 2024"
                                    value={title}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-bold text-slate-700 mb-2">
                                Course Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows="5"
                                required
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 px-4 focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors shadow-sm text-slate-900 resize-none"
                                placeholder="Describe what students will learn, who this course is for, and any prerequisites..."
                                value={description}
                                onChange={onChange}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 text-slate-400 pointer-events-none">
                                        <Tag size={18} />
                                    </div>
                                    <select
                                        id="category"
                                        name="category"
                                        className="pl-10 w-full rounded-xl border border-slate-300 bg-slate-50 py-3 px-4 focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors shadow-sm text-slate-900 appearance-none font-medium"
                                        value={category}
                                        onChange={onChange}
                                    >
                                        <option>Programming</option>
                                        <option>Design</option>
                                        <option>Business</option>
                                        <option>Marketing</option>
                                        <option>Personal Development</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-bold text-slate-700 mb-2">
                                    Price (USD) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 text-slate-400 pointer-events-none">
                                        <DollarSign size={18} />
                                    </div>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        min="0"
                                        step="0.01"
                                        className="pl-10 w-full rounded-xl border border-slate-300 bg-slate-50 py-3 px-4 focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors shadow-sm text-slate-900"
                                        placeholder="0.00"
                                        value={price}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-dashed">
                            <label htmlFor="thumbnail" className="block text-sm font-bold text-slate-700 mb-2">
                                Course Thumbnail URL
                            </label>
                            <div className="relative mb-4">
                                <div className="absolute top-3 left-3 text-slate-400 pointer-events-none">
                                    <ImageIcon size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="thumbnail"
                                    id="thumbnail"
                                    placeholder="https://images.unsplash.com/..."
                                    className="pl-10 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors shadow-sm text-slate-900"
                                    value={thumbnail}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-16 bg-slate-200 rounded-md overflow-hidden border border-slate-300 shrink-0">
                                    <img
                                        src={thumbnail === 'no-photo.jpg' ? 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1074&q=80' : thumbnail}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 leading-snug">
                                    Provide a valid image URL for your course cover. A 16:9 ratio is recommended. Leave as "no-photo.jpg" to use the default placeholder.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
                            <Link
                                to="/instructor/dashboard"
                                className="px-6 py-3 border border-slate-300 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex justify-center items-center gap-2 py-3 px-8 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition-all transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Publish Course
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
