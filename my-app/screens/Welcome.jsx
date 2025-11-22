import React, { useState, useEffect } from "react";
import SyncLoader from 'react-spinners/SyncLoader'
import logo from '../src/assets/logo.png';

function Welcome() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000); // Reduced time for better UX
    }, []);

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#3b82f6",
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-slate-900 text-white p-4">
            {loading ? (
                <div className="flex flex-col items-center animate-pulse">
                    <img src={logo} className="w-32 h-32 mb-8 drop-shadow-2xl" alt="logo" />
                    <SyncLoader
                        cssOverride={override}
                        size={15}
                        color={"#3b82f6"}
                        loading={loading}
                    />
                    <p className="mt-4 text-gray-400 font-medium tracking-wide">Loading Experience...</p>
                </div>
            ) : (
                <div className="text-center animate-fade-in">
                    <div className="relative inline-block mb-8">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
                        <img src={logo} className="relative w-40 h-40 drop-shadow-2xl" alt="logo" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 mb-6 tracking-tight">
                        GamerGate
                    </h1>
                    <p className="text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
                        Your gateway to the gaming industry. Connect, showcase, and level up your career.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Welcome