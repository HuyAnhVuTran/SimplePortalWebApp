import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from '../src/context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [rememberPassword, setRememberPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                if (rememberPassword) {
                    localStorage.setItem('rememberedEmail', formData.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                navigate('/dashboard');
            } else {
                toast.error(result.message || "Login failed!");
            }
        } catch (err) {
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    document.title = "Login";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {loading ? (
                <div className="flex flex-col items-center animate-pulse">
                    <img src={logo} className="w-32 h-32 mb-4 drop-shadow-2xl" alt="logo" />
                    <p className="text-3xl font-bold text-center text-white tracking-wide">
                        Welcome to GamerGate!
                    </p>
                </div>
            ) : (
                <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl animate-fade-in">
                    <div className="flex justify-center mb-8">
                        <img src={logo} className="w-24 h-24 drop-shadow-lg" alt="logo" />
                    </div>
                    <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-tight">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none"
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none pr-12"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-300 hover:text-white transition-colors focus:outline-none"
                                onClick={() => setRememberPassword(!rememberPassword)}
                            >
                                {rememberPassword ? (
                                    <GrCheckboxSelected className="text-blue-500 mr-2 text-lg" />
                                ) : (
                                    <GrCheckbox className="text-gray-400 mr-2 text-lg" />
                                )}
                                Remember me
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/email')}
                                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>

                        <div className="text-center mt-6">
                            <p className="text-gray-400 text-sm">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}