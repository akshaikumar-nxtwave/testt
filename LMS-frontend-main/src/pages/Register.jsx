import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../store/authSlice';
import { User, Mail, Lock, UserPlus, ArrowRight, BookOpen, ShieldCheck, GraduationCap } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const { name, email, password, role } = formData;
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
        const userData = { name, email, password, role };
        dispatch(register(userData));
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex bg-white">
            {/* Right Side: Illustration / Brand (Swapped for Register) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-dark-900 overflow-hidden items-center justify-center order-2">
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/40 to-brand-800/60 z-0"></div>
                {/* Animated Orbs */}
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 px-12 text-center text-white max-w-lg">
                    <div className="flex justify-center mb-8">
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                            <ShieldCheck size={64} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold mb-6">Start Your Journey</h2>
                    <p className="text-lg text-purple-100 leading-relaxed">
                        Join a global community of learners and experts. Access thousands of courses tailored to your career goals.
                    </p>
                </div>
            </div>

            {/* Left Side: Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-gray-50 order-1">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h1>
                        <p className="mt-3 text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">
                                Sign in here <ArrowRight className="inline" size={16} />
                            </Link>
                        </p>
                    </div>

                    <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 sm:px-10">
                        <form className="space-y-5" onSubmit={onSubmit}>

                            {/* Role Selection Blocks */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div
                                    onClick={() => setFormData({ ...formData, role: 'student' })}
                                    className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${role === 'student' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:border-brand-200 bg-white text-slate-600'}`}
                                >
                                    <GraduationCap className="mx-auto mb-2" size={24} />
                                    <p className="font-semibold text-sm">Student</p>
                                </div>
                                <div
                                    onClick={() => setFormData({ ...formData, role: 'instructor' })}
                                    className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${role === 'instructor' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:border-brand-200 bg-white text-slate-600'}`}
                                >
                                    <BookOpen className="mx-auto mb-2" size={24} />
                                    <p className="font-semibold text-sm">Instructor</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-xl py-3 border bg-slate-50 focus:bg-white transition-colors"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>

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
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:-translate-y-0.5"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Creating account...
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <UserPlus size={18} />
                                            Sign up as {role === 'student' ? 'Student' : 'Instructor'}
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

export default Register;
