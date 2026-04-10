import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, ArrowRight, PlayCircle, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white selection:bg-brand-500 selection:text-white pb-20">
            {/* Modern Hero Section with animated gradients and glassmorphism */}
            <div className="relative overflow-hidden bg-dark-900 min-h-[90vh] flex items-center">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/30 blur-[120px] mix-blend-screen animate-blob" />
                    <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/30 blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 z-10 w-full animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Hero Text Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-300 text-sm font-medium mb-8 backdrop-blur-sm animate-slide-up">
                                <span className="flex h-2 w-2 rounded-full bg-brand-400"></span>
                                New platform launch
                            </div>
                            <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl mb-6">
                                Master your craft with <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400">LearnHub</span>
                            </h1>
                            <p className="mt-3 text-lg text-slate-300 sm:text-xl md:mt-5 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                                Elevate your skills with world-class instructors. Interactive courses, real-world projects, and a community of passionate learners.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/courses"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1 gap-2"
                                >
                                    Explore Courses
                                    <ArrowRight size={20} />
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all transform hover:-translate-y-1 gap-2"
                                >
                                    <PlayCircle size={20} />
                                    Start Free Trial
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-slate-400 text-sm font-medium">
                                <div className="flex -space-x-2">
                                    <img className="w-8 h-8 rounded-full border-2 border-dark-900" src="https://i.pravatar.cc/100?img=1" alt="User" />
                                    <img className="w-8 h-8 rounded-full border-2 border-dark-900" src="https://i.pravatar.cc/100?img=2" alt="User" />
                                    <img className="w-8 h-8 rounded-full border-2 border-dark-900" src="https://i.pravatar.cc/100?img=3" alt="User" />
                                    <img className="w-8 h-8 rounded-full border-2 border-dark-900" src="https://i.pravatar.cc/100?img=4" alt="User" />
                                </div>
                                <div>
                                    <div className="flex text-yellow-500 mb-1">
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                    <span>Trusted by 10,000+ students</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Interactive Image/Mockup */}
                        <div className="hidden lg:block relative z-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-purple-500 rounded-2xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
                            <img
                                className="relative rounded-2xl shadow-2xl border border-white/10 object-cover"
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
                                alt="Students collaborating"
                            />

                            {/* Floating Badges */}
                            <div className="absolute -bottom-6 -left-6 glass-dark p-4 rounded-xl flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                                <div className="bg-green-500/20 p-3 rounded-lg text-green-400">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">500+</p>
                                    <p className="text-slate-400 text-sm">Premium Courses</p>
                                </div>
                            </div>

                            <div className="absolute -top-6 -right-6 glass-dark p-4 rounded-xl flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                                <div className="bg-brand-500/20 p-3 rounded-lg text-brand-400">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">Top 1%</p>
                                    <p className="text-slate-400 text-sm">Expert Instructors</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom curve divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full text-white w-full">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-20 relative bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
                        <h3 className="text-4xl font-extrabold text-slate-900 mb-4">
                            Everything you need to excel
                        </h3>
                        <p className="text-xl text-slate-500">
                            We provide a comprehensive learning environment designed to help you achieve your goals faster.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white text-brand-600 transition-colors duration-300">
                                <BookOpen size={28} />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-3">Vast Library</h4>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Access thousands of high-quality courses across programming, design, business, and more. New content added weekly.
                            </p>
                            <span className="text-brand-600 font-semibold group-hover:underline flex items-center gap-1">
                                Learn more <ArrowRight size={16} />
                            </span>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white text-purple-600 transition-colors duration-300">
                                <Users size={28} />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-3">Expert Instructors</h4>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Learn from industry professionals with real-world experience. Get insights you won't find in textbooks.
                            </p>
                            <span className="text-purple-600 font-semibold group-hover:underline flex items-center gap-1">
                                Meet instructors <ArrowRight size={16} />
                            </span>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white text-pink-600 transition-colors duration-300">
                                <Award size={28} />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-3">Track Progress</h4>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Monitor your learning journey, test your skills, and earn recognized certificates upon completion.
                            </p>
                            <span className="text-pink-600 font-semibold group-hover:underline flex items-center gap-1">
                                View certificates <ArrowRight size={16} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="bg-dark-900 rounded-3xl overflow-hidden relative shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600/30 to-purple-800/30 mix-blend-multiply"></div>
                    <div className="relative z-10 p-12 lg:p-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start your journey?</h2>
                        <p className="text-lg text-brand-100 max-w-2xl mx-auto mb-10">
                            Join thousands of students who are already advancing their careers and acquiring new skills. The first step is just a click away.
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-dark-900 bg-white hover:bg-slate-100 shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
