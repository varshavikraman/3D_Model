import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { generate3DThumbnail } from '../utils/generate3DThumbnail';

const Upload = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        name: '',
        category:'',
        file: null
    });
    const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploadForm({
      ...uploadForm,
      file: selectedFile,
    });

    try {
      const thumb = await generate3DThumbnail(selectedFile);
      setPreview(thumb);
    } catch (err) {
      console.error("Thumbnail generation failed:", err);
    }
  };


  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', uploadForm.file);
    formData.append('name', uploadForm.name);
    formData.append('category', uploadForm.category);
    formData.append("thumbnail", preview);


    try {
      await axios.post('/api/upload3dModels', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Model uploaded successfully!');
      setUploadForm({ name: '', file: null });
      document.getElementById('file-input').value = '';
      setPreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col p-4 md:p-8 text-center mt-10">
        <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Upload your 3D Model</h3>
        <form className="space-y-6" onSubmit={handleUpload}>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Enter model name"
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-purple-600 focus:bg-purple-600/5"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                    required
                />
            </div>
            <div className="relative">
                <select 
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-purple-600 focus:bg-purple-600/5"
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})} 
                    required
                >
                   <option value="" disabled className="bg-gray-800 text-white">Select a category</option>
                    <option value="character" className="bg-gray-800 text-white hover:bg-gray-700">Character</option>
                    <option value="animal" className="bg-gray-800 text-white hover:bg-gray-700">Animal</option>
                    <option value="architecture" className="bg-gray-800 text-white hover:bg-gray-700">Architecture</option>
                    <option value="furniture" className="bg-gray-800 text-white hover:bg-gray-700">Furniture</option>
                    <option value="fashion" className="bg-gray-800 text-white hover:bg-gray-700">Fashion</option>
                    <option value="food" className="bg-gray-800 text-white hover:bg-gray-700">Food</option>
                    <option value="nature" className="bg-gray-800 text-white hover:bg-gray-700">Nature</option>
                    <option value="other" className="bg-gray-800 text-white hover:bg-gray-700">Other</option>
                </select>
            </div>
           <div className="relative border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-purple-600 transition-colors">
                <input 
                    id="file-input"
                    type="file" 
                    accept=".glb"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                    onChange={handleFileChange}
                    required
                />
                {preview && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Generated Thumbnail:</p>
                    <img src={preview} alt="Thumbnail preview" className="w-40 h-40 border rounded" />
                  </div>
                )}
                <div className="pointer-events-none">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="mt-2 text-sm text-gray-400">
                    <span className="font-medium text-purple-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">GLB files only</p>
                    {uploadForm.file && (
                    <p className="text-sm text-green-400 mt-2">Selected: {uploadForm.file.name}</p>
                    )}
                </div>
            </div>
            <div>
                <button 
                    type="submit" 
                    className="border border-purple-600/50 text-purple-600 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-purple-600/10"
                    disabled={uploading}
                >
                        {uploading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </span>
                        ) : (
                        'Upload Model'
                        )}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Upload