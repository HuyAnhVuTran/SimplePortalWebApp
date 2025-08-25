import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png';
import { GrCheckbox } from 'react-icons/gr';
import { GrCheckboxSelected } from 'react-icons/gr';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Added eye icons

import { useAuth } from '../src/context/AuthContext';

//backend handling

import { toast } from 'react-toastify'; // For error notifications
//import 'react-toastify/dist/ReactToastify.css'; // Toast styles



export default function Login() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [rememberPassword, setRememberPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility
    
    //backend tracking
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const {login} = useAuth();

    let navigate=useNavigate();
    
    useEffect(() => {

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //check if info exists
   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

     try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // ✅ Remember username (optional)
        if (rememberPassword) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        navigate('/dashboard'); // ✅ redirect only on success
      } else {
        toast.error(result.message || "Login failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
};

 
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
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F1E9DA]"
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
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
                        className="w-full  hover:bg-blue-700 font-bold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-[#2C2F48]"
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