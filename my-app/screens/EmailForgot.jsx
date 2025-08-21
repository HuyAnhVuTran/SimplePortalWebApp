import { React, useState } from 'react'
import { FiMail, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function EmailForgot() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
   
    const navigate=useNavigate();

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
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
            
            // Auto-redirect after 2 seconds
            setTimeout(() => {
                navigate('/reset-password')
            }, 2000)
        }, 1500)
    }
    document.title="Confirm Email";
    return (
        <div className=" flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
                        <p className="text-gray-600 text-center mb-6">
                            Enter your email to receive a password reset link
                        </p>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2 font-medium">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                    } bg-[#F1E9DA]`}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="something@email.com"
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <p className="mt-1 text-sm text-red-600">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isLoading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                            } transition-colors`}
                            onClick={()=>navigate('/forgot')}
                        >
                            {isLoading ? (
                                'Sending...'
                            ) : (
                                <>
                                    <span>Continue</span>
                                    <FiArrowRight className="ml-2" />
                                </>
                            )}
                        </button>

                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <FiCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Email Sent!</h2>
                        <p className="text-gray-600 mb-6">
                            We've sent a password reset link to {email}
                        </p>
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
                        <p className="text-sm text-gray-500">
                            Redirecting to reset page...
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}