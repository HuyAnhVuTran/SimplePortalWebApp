import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png';
import { GrCheckbox } from 'react-icons/gr';
import { GrCheckboxSelected } from 'react-icons/gr';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Added eye icons


//backend handling
import axios from 'axios'; // For API calls
import { toast } from 'react-toastify'; // For error notifications
//import 'react-toastify/dist/ReactToastify.css'; // Toast styles



export default function Login() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [rememberPassword, setRememberPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility
    
    //backend tracking
    const [isSubmitting, setIsSubmitting] = useState(false); 
    let navigate=useNavigate();
    
    useEffect(() => {
        //handle backend db
        // const rememberedUsername = localStorage.getItem('rememberedUsername');
        //     if (rememberedUsername) {
        //         setFormData(prev => ({ ...prev, username: rememberedUsername }));
        //         setRememberPassword(true);
        //     }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //check if info exists
//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//         // API call to Spring Boot backend
//         const response = await axios.post('/api/auth/login', {
//             username: formData.username,
//             password: formData.password
//         });

//         // Remember username if checkbox is ticked
//         if (rememberPassword) {
//             localStorage.setItem('rememberedUsername', formData.username);
//         } else {
//             localStorage.removeItem('rememberedUsername');
//         }

//         // Store JWT token if available
//         if (response.data.token) {
//             localStorage.setItem('authToken', response.data.token);
//         }

//         navigate('/dashboard');
        
//     } catch (error) {
//         // Show error notification
//         toast.error(error.response?.data?.message || 'Login failed. Please try again.', {
//             position: "top-center",
//             autoClose: 5000,
//         });
//     } finally {
//         setIsSubmitting(false);
//     }
// };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', formData, rememberPassword);
    };
    //password show vs noshow
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    document.title="Login";
    return (
        
        <div className="Welcome  flex flex-col items-center justify-center p-4 bg-gray-50">
            {loading ? (
                <div className="flex flex-col items-center animate-pulse">
                    <img src={logo} className="logo w-32 h-32 mb-4" alt="logo" />
                    <p className="text-3xl font-bold text-center text-gray-800">
                        Welcome to GamerGate!
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block font-bold mb-2 " htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F1E9DA]"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-6 relative">
                        <label className="block font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F1E9DA] pr-10"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <p
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 bg-[#F1E9DA] h-10 "
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center mb-6">
                        <button
                            type="button"
                            className="flex items-center focus:outline-none"
                            onClick={() => setRememberPassword(!rememberPassword)}
                        >
                            {rememberPassword ? (
                                <GrCheckboxSelected className=" text-xl mr-2" />
                            ) : (
                                <GrCheckbox className=" text-xl mr-2" />
                            )}
                            <span className="text-sm font-medium ">Remember me</span>
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full  hover:bg-blue-700 font-bold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-[#000000]"
                        onClick={()=>navigate('/dashboard')}    
                    >
                        Log In
                    </button>

                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline focus:outline-none"
                            onClick={() => navigate('/signup')}
                        >
                            Don't have an account? Sign up
                        </button>
                    </div>

                    <div className="mt-2 text-center">
                        <button  onClick={()=>navigate('/email')} className="text-sm font-semibold text-blue-600 hover:text-gray-800 underline">
                            Forgot password?
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}