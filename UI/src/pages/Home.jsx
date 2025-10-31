import React from 'react'
import { useNavigate } from 'react-router-dom';
import ModelGrid from '../components/ModelGrid'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 border border-blue-500/50 text-blue-400 py-2.5 px-5 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-600/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] active:scale-95 backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span>Back</span>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModelGrid />
      </div>
    </div>
  )
}

export default Home