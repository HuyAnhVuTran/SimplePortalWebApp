import React, { useState, useRef } from 'react';
import { CgProfile } from "react-icons/cg";
import {
    FiBriefcase,
    FiList,
    FiGrid,
    FiFileText,
    FiLogOut,
    FiChevronRight,
    FiSearch,
    FiBell
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { toast } from 'react-toastify';
import api from '../src/services/authService';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('open-positions');
    const navigate = useNavigate();
    const { logout } = useAuth();
    const fileInputRef = useRef(null);

    // Mock data
    const [applications] = useState([
        { id: 1, company: "Riot Games", position: "Game Designer", status: "Processing", date: "2 days ago" },
        { id: 2, company: "Blizzard", position: "UI Developer", status: "Rejected", date: "1 week ago" },
        { id: 3, company: "Epic Games", position: "Backend Engineer", status: "Interview", date: "3 days ago" },
        { id: 4, company: "Valve Inc", position: "Game Developer", status: "Interview", date: "Just now" }
    ]);

    const [resumes, setResumes] = useState([
        { id: 1, name: "Software Engineer Resume", lastUpdated: "2023-05-15", type: "PDF" },
        { id: 2, name: "Game Designer CV", lastUpdated: "2023-06-20", type: "PDF" },
        { id: 3, name: "Technical Portfolio", lastUpdated: "2023-07-10", type: "Link" }
    ]);

    document.title = "Dashboard | GamerGate";

    const handleLogOut = () => {
        logout();
        navigate("/login");
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await api.post('/resumes/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const newResume = {
                    id: resumes.length + 1,
                    name: response.data.fileName,
                    lastUpdated: new Date().toISOString().split('T')[0],
                    type: file.name.split('.').pop().toUpperCase()
                };
                setResumes([...resumes, newResume]);
                toast.success("Resume uploaded successfully!");
            } catch (error) {
                console.error("Upload failed:", error);
                toast.error("Failed to upload resume.");
            }
        }
    };

    const NavItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${activeTab === id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <div className="flex items-center">
                <Icon className={`mr-3 text-xl ${activeTab === id ? 'text-blue-400' : 'text-gray-500 group-hover:text-white'}`} />
                <span className="font-medium">{label}</span>
            </div>
            {activeTab === id && <FiChevronRight className="text-blue-400" />}
        </button>
    );

    const StatusBadge = ({ status }) => {
        const styles = {
            'Processing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'Rejected': 'bg-red-500/20 text-red-400 border-red-500/30',
            'Interview': 'bg-green-500/20 text-green-400 border-green-500/30'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles['Processing']}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen flex bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-slate-900 text-white">
            {/* Sidebar */}
            <div className="w-72 glass-card border-r border-white/10 flex flex-col fixed h-full z-10">
                {/* Profile Section */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <CgProfile className="text-2xl text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-white">Welcome Back!</p>
                            <p className="text-xs text-gray-400">Pro Developer</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</p>
                    <NavItem id="open-positions" icon={FiList} label="Open Positions" />
                    <NavItem id="my-applications" icon={FiBriefcase} label="My Applications" />
                    <NavItem id="your-games" icon={FiGrid} label="Your Games" />

                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">Personal</p>
                    <NavItem id="resume-cv" icon={FiFileText} label="Resume & CV" />
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogOut}
                        className="w-full flex items-center justify-center p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                    >
                        <FiLogOut className="mr-2" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-72 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            {activeTab === 'open-positions' && 'Explore Opportunities'}
                            {activeTab === 'my-applications' && 'Track Applications'}
                            {activeTab === 'your-games' && 'Portfolio Management'}
                            {activeTab === 'resume-cv' && 'Career Documents'}
                        </h1>
                        <p className="text-gray-400 mt-1">Manage your gaming career journey</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="glass-input pl-10 pr-4 py-2 rounded-full text-sm w-64 focus:w-80 transition-all"
                            />
                        </div>
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
                            <FiBell className="text-xl text-gray-300" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="animate-fade-in">
                    {activeTab === 'my-applications' && (
                        <div className="grid gap-4">
                            {applications.map(app => (
                                <div key={app.id} className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-white/5 hover:border-blue-500/30">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-500">
                                                {app.company[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{app.position}</h3>
                                                <p className="text-gray-400">{app.company}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <p className="text-sm text-gray-500">{app.date}</p>
                                            <StatusBadge status={app.status} />
                                            <FiChevronRight className="text-gray-600 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'open-positions' && (
                        <div className="glass-card p-10 rounded-2xl text-center border border-white/10">
                            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiList className="text-4xl text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Browse Top Studios</h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-8">Discover opportunities at the world's leading game development companies.</p>
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20">
                                View All Positions
                            </button>
                        </div>
                    )}

                    {activeTab === 'your-games' && (
                        <div className="glass-card p-10 rounded-2xl text-center border border-white/10">
                            <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiGrid className="text-4xl text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Your Portfolio</h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-8">Showcase your game projects and achievements to potential employers.</p>
                            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-purple-600/20">
                                Add New Project
                            </button>
                        </div>
                    )}

                    {activeTab === 'resume-cv' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {resumes.map(resume => (
                                    <div key={resume.id} className="glass-card p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-gray-400 hover:text-white"><FiChevronRight /></button>
                                        </div>
                                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
                                            <FiFileText className="text-2xl" />
                                        </div>
                                        <h3 className="font-bold text-white mb-1">{resume.name}</h3>
                                        <p className="text-xs text-gray-500 mb-4">Updated: {resume.lastUpdated}</p>
                                        <div className="flex space-x-2">
                                            <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">View</button>
                                            <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">Edit</button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="glass-card p-6 rounded-xl border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex flex-col items-center justify-center text-gray-400 hover:text-blue-400 h-full min-h-[200px]"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                                        <span className="text-2xl">+</span>
                                    </div>
                                    <span className="font-medium">Upload New</span>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    accept=".pdf,.doc,.docx"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}