import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import axios from 'axios';


function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const ModelViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);

  useEffect(() => {
    fetchModel();
  }, [id]);

  const fetchModel = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(`/api/get3dModelsFile/${id}/file`);
      
      if (response.data) {
        setModel(response.data);
        
        const glbUrl = `/api/get3dModels/${id}`;
        setModelUrl(glbUrl);
      } else {
        setError('Model not found');
      }
    } catch (error) {
      console.error('Error fetching model:', error);
      setError('Failed to load model: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Loading 3D model...</p>
        </div>
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-6">{error || 'Model not found'}</p>
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 border border-blue-500/50 text-blue-400 py-2.5 px-5 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-600/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] active:scale-95 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
              Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 border border-blue-500/50 text-blue-400 py-2.5 px-5 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-600/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] active:scale-95 backdrop-blur-sm">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </button>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold truncate">{model.name}</h1>
          </div>
          
          <div className="text-sm italic text-gray-500">
            Use mouse to orbit, scroll to zoom
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }} className="absolute inset-0">
          <Suspense fallback={null}>
            {modelUrl && <Model url={modelUrl} />}
            <Environment preset="studio" />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default ModelViewer;