import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import { LogOut, User as UserIcon, BookOpen } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-brand-600 font-extrabold text-2xl gap-2 tracking-tight">
                            <div className="bg-gradient-to-tr from-brand-600 to-purple-600 text-white p-1.5 rounded-lg shadow-md">
                                <BookOpen size={24} />
                            </div>
                            <span>LearnHub</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <div className="text-sm font-medium text-gray-700">
                                    Welcome, {user.name} ({user.role})
                                </div>
                                {user.role === 'student' && (
                                    <Link
                                        to="/student/dashboard"
                                        className="text-slate-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        My Learning
                                    </Link>
                                )}
                                {user.role === 'instructor' && (
                                    <Link
                                        to="/instructor/dashboard"
                                        className="text-slate-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Instructor Dashboard
                                    </Link>
                                )}
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin/dashboard"
                                        className="text-slate-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={onLogout}
                                    className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="font-semibold text-slate-600 hover:text-brand-600 px-4 py-2 rounded-lg text-sm transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-brand-600 text-white hover:bg-brand-700 font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Sign Up Free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
