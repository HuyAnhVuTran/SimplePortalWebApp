import React, { useState } from 'react'
import { FiLock, FiCheck, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }))
        }
    }

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.newPassword) newErrors.newPassword = 'Password is required'
        else if (formData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters'

        if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setIsSubmitting(true)
            setTimeout(() => {
                setIsSubmitting(false)
                navigate('/login')
            }, 1500)
        }
    }

    document.title = "Reset Password | GamerGate";

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl animate-fade-in">
                <h1 className="text-3xl font-bold text-center text-white mb-2">Reset Password</h1>
                <p className="text-gray-400 text-center mb-8 text-sm">Create a strong new password for your account</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* New Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                className={`glass-input w-full pl-11 pr-12 py-3 rounded-xl focus:outline-none ${errors.newPassword ? 'border-red-500/50 focus:border-red-500' : ''
                                    }`}
                                type={showPassword.new ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                onClick={() => togglePasswordVisibility('new')}
                            >
                                {showPassword.new ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {errors.newPassword && <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiCheck className="text-gray-400" />
                            </div>
                            <input
                                className={`glass-input w-full pl-11 pr-12 py-3 rounded-xl focus:outline-none ${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500' : ''
                                    }`}
                                type={showPassword.confirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                onClick={() => togglePasswordVisibility('confirm')}
                            >
                                {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg flex items-center justify-center group"
                    >
                        {isSubmitting ? 'Updating Password...' : (
                            <>
                                <span>Update Password</span>
                                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
