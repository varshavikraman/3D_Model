import React from "react";
import { Link } from "react-router-dom";
import triImage from "../assets/images/3dify(1).png";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0f24] via-[#0e1330] to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-purple-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full" />
      </div>

      <img
        src={triImage}
        alt="3Dify Logo"
        className="w-64 h-auto mx-auto drop-shadow-[0_0_20px_rgba(147,51,234,0.3)] animate-pulse-slow"
      />

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mt-10 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
        Transform Your Vision into Interactive 3D Reality
      </h1>

      <p className="text-gray-400 text-lg text-center italic mt-6 max-w-2xl leading-relaxed px-4">
        Visualize, upload, and interact with stunning 3D models in GLB format with{" "}
        <span className="text-purple-400 font-semibold">3Dify</span> — the ultimate web platform for creators and enthusiasts alike.
      </p>

      <div className="flex flex-wrap justify-center gap-10 mt-14">
        <Link
          to="/home"
          className="border border-purple-500/50 text-purple-400 py-3 px-8 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-purple-600/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          Explore
        </Link>
        <Link
          to="/upload"
          className="border border-blue-500/50 text-blue-400 py-3 px-8 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-600/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          Upload
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
