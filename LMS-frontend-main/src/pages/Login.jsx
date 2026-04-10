import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../store/authSlice';
import { Mail, Lock, LogIn, ArrowRight, BookOpen } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }
        if (isSuccess || user) {
            if (user?.role === 'admin') navigate('/admin/dashboard');
            else if (user?.role === 'instructor') navigate('/instructor/dashboard');
            else if (user?.role === 'student') navigate('/student/dashboard');
            else navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(login(userData));
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex bg-white">
            {/* Left Side: Illustration / Brand */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-dark-900 overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600/40 to-purple-800/60 z-0"></div>
                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 px-12 text-center text-white max-w-lg">
                    <div className="flex justify-center mb-8">
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                            <BookOpen size={64} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold mb-6">Welcome Back to LearnHub</h2>
                    <p className="text-lg text-brand-100 leading-relaxed">
                        Pick up exactly where you left off. Thousands of new interactive modules are waiting for you.
                    </p>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign in</h1>
                        <p className="mt-3 text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">
                                Create one now <ArrowRight className="inline" size={16} />
                            </Link>
                        </p>
                    </div>

                    <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 sm:px-10">
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-xl py-3 border bg-slate-50 focus:bg-white transition-colors"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-xl py-3 border bg-slate-50 focus:bg-white transition-colors"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end mt-2">
                                    <a href="#" className="text-xs font-medium text-brand-600 hover:text-brand-500">Forgot your password?</a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:-translate-y-0.5"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Signing in...
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <LogIn size={18} />
                                            Sign in
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
