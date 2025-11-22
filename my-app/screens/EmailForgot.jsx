import React, { useState } from 'react'
import { FiMail, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function EmailForgot() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (!email) {
            setError('Email is required')
            return
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
            setTimeout(() => {
                navigate('/reset-password')
            }, 2000)
        }, 1500)
    }

    document.title = "Reset Password | GamerGate";

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl animate-fade-in">
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                            <p className="text-gray-400 text-sm">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    className={`glass-input w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none ${error ? 'border-red-500/50 focus:border-red-500' : ''
                                        }`}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    autoFocus
                                />
                            </div>
                            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg flex items-center justify-center group"
                        >
                            {isLoading ? 'Sending Link...' : (
                                <>
                                    <span>Send Reset Link</span>
                                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                            >
                                ← Back to Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiCheckCircle className="text-5xl text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
                        <p className="text-gray-400 mb-8">
                            We've sent a password reset link to <span className="text-white font-medium">{email}</span>
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                            <span>Redirecting...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}