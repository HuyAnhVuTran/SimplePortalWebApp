import { React, useState, useEffect } from 'react'
//import fetchDashboardData from '../src/api/auth'
import { CgProfile } from "react-icons/cg";
import { 
  FiBriefcase, 
  FiList, 
  FiGrid,
  FiFileText, // New icon for Resume
  FiLogOut,
  FiChevronRight 
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('open-positions');
    const navigate = useNavigate();
    
    // Mock applications data
    const [applications, setApplications] = useState([
        { id: 1, company: "Riot Games", position: "Game Designer", status: "Processing" },
        { id: 2, company: "Blizzard", position: "UI Developer", status: "Rejected" },
        { id: 3, company: "Epic Games", position: "Backend Engineer", status: "Interview" },
        {id:4,company:"Valve Inc", position:"Game Developer", status:"Interview"}
    ]);

    // Mock resume data
    const [resumes, setResumes] = useState([
        { id: 1, name: "Software Engineer Resume", lastUpdated: "2023-05-15" },
        { id: 2, name: "Game Designer CV", lastUpdated: "2023-06-20" },
        { id: 3, name: "Technical Portfolio", lastUpdated: "2023-07-10" }
    ]);
    document.title="Dashboard";



    return (
        <div className=" absolute w-screen h-screen bg-gray-100 right-0 top-0">
            {/* Sidebar */}
            <div className='w-64 bg-[#F1E9DA] shadow-lg flex flex-col'>
            
                {/* Profile Section */}
                <div className='p-4 flex items-center space-x-3 border-b border-gray-200'>
                    <CgProfile className='text-4xl text-gray-700' />
                    <div>
                        <p className='font-bold text-gray-800'>Welcome Back!</p>
                        <p className='text-sm text-gray-600'>Developer</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-2 space-y-1">
                    <button 
                        onClick={() => setActiveTab('my-applications')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'my-applications' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                    >
                        <div className="flex items-center">
                            <FiBriefcase className="mr-3" />
                            <span>My Applications</span>
                        </div>
                        <FiChevronRight />
                    </button>

                    <button 
                        onClick={() => setActiveTab('open-positions')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'open-positions' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                    >
                        <div className="flex items-center">
                            <FiList className="mr-3" />
                            <span className="font-semibold">Open Positions</span>
                        </div>
                        <FiChevronRight />
                    </button>

                    <button 
                        onClick={() => setActiveTab('your-games')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'your-games' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                    >
                        <div className="flex items-center">
                            <FiGrid className="mr-3" />
                            <span>Your Games</span>
                        </div>
                        <FiChevronRight />
                    </button>

                    {/* NEW RESUME TAB */}
                    <button 
                        onClick={() => setActiveTab('resume-cv')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'resume-cv' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                    >
                        <div className="flex items-center">
                            <FiFileText className="mr-3" />
                            <span>Resume & CV</span>
                        </div>
                        <FiChevronRight />
                    </button>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200">
                    <button 
                        className="flex items-center text-red-600 hover:text-red-800" 
                        onClick={() => navigate('/login')}
                    >
                        <FiLogOut className="mr-2" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-8 overflow-auto'>
                {activeTab === 'my-applications' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-6">My Applications</h1>
                        <div className="space-y-4">
                            {applications.map(app => (
                                <div key={app.id} className="bg-white p-4 rounded-lg shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold">{app.position}</h3>
                                            <p className="text-gray-600">{app.company}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                            app.status === 'Interview' ? 'bg-green-100 text-green-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'open-positions' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-6">Open Positions</h1>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p>Browse available positions from top game studios</p>
                        </div>
                    </div>
                )}

                {activeTab === 'your-games' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-6">Your Games</h1>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p>View and manage your game portfolio</p>
                        </div>
                    </div>
                )}

               
                {activeTab === 'resume-cv' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-6">Resume & CV</h1>
                        <div className="space-y-4">
                            {resumes.map(resume => (
                                <div key={resume.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold">{resume.name}</h3>
                                        <p className="text-gray-600 text-sm">Last updated: {resume.lastUpdated}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button 
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                                            onClick={() => console.log('View', resume.id)}
                                        >
                                            View
                                        </button>
                                        <button 
                                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                                            onClick={() => console.log('Download', resume.id)}
                                        >
                                            Download
                                        </button>
                                        <button 
                                            className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                                            onClick={() => console.log('Delete', resume.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300 text-center">
                                <button 
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                    onClick={() => console.log('Upload new')}
                                >
                                    + Upload New Resume/CV
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}