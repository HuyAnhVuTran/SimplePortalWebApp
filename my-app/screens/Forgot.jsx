import { React, useState } from 'react'
import { FiLock, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const navigate=useNavigate();
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }))
        }
    }

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.newPassword) {
            newErrors.newPassword = 'Password is required'
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters'
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setIsSubmitting(true)
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false)
                alert('Password changed successfully!')
                navigate('/login')
            }, 1500)
        }
    }
    document.title="Reset Password";
    return (
        <div className=" flex items-center justify-center bg-gray-50 p-4">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold text-center mb-6">Reset Your Password</h1>
                
                {/* New Password Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                        New Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="text-gray-400" />
                        </div>
                        <input
                            className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.newPassword 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'
                            } bg-[#F1E9DA]`}
                            type={showPassword.new ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => togglePasswordVisibility('new')}
                            aria-label={showPassword.new ? "Hide password" : "Show password"}
                        >
                            {showPassword.new ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiCheck className="text-gray-400" />
                        </div>
                        <input
                            className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.confirmPassword 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'
                            } bg-[#F1E9DA]`}
                            type={showPassword.confirm ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => togglePasswordVisibility('confirm')}
                            aria-label={showPassword.confirm ? "Hide password" : "Show password"}
                        >
                            {showPassword.confirm ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isSubmitting
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    } transition-colors`}
                    onClick={()=>navigate('/dashboard')}
                >
                    {isSubmitting ? 'Processing...' : 'Confirm & Log In'}
                </button>
            </form>
        </div>
    )
}

