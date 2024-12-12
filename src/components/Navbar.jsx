import React from 'react'

export default function Navbar({ selectedVersion, setSelectedVersion }) {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span className="text-xl font-bold">E-Commerce API</span>
                </div>
                <select
                    value={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="express">Express.js</option>
                    <option value="nestjs">NestJS</option>
                    <option value="go">Go</option>
                </select>
            </div>
        </nav>
    )
}