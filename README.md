# 🧩 3DIFY – 3D Model Web Application

## 🧠 Description

A full-stack application that allows users to **upload, view, and manage 3D models (GLB files)**.
The app also generates **thumbnail previews**, displays model details, and provides a clean **React-based UI** for model visualization and management.

---

## 🚀 Key Features


### 🖥️ Frontend (React + Tailwind CSS)
- Display all uploaded 3D models in a responsive grid layout. 
- Preview thumbnails of 3D models
- Smooth loading and error handling states
- Easy navigation for uploading or managing models
- Interactive 3D model viewer built using **Three.js**, **react-three-fiber**, and **react-three-drei**

### ⚙️ Backend (Node.js + Express + MongoDB)
- Upload .glb 3D model files
- Store models and metadata in **MongoDB GridFS**  
- Fetch uploaded models (with or without thumbnails)
- Handle file validation and error responses
- Clean, modular REST API design  

---

## 🛠️ Tech Stack

**Frontend:** React, Axios, Tailwind CSS, React Router, Three.js, react-three-fiber, react-three-drei
**Backend:** Node.js, Express.js  
**Database:** MongoDB (GridFS for file storage)  
**File Uploads:** Multer  
**3D File Format:** .glb (GL Transmission Format) 

---

## ⚙️ Installation & Setup
### Prerequisites

Ensure **Node.js** and **MongoDB** are installed on your system.

**Check Node version:** 
    ```bash
        node --version
    ```

### 🔧Installation

1. **Clone the Repository:**  

    ```bash
        git clone git@github.com:varshavikraman/3D_Model.git
    ```

2. **Install Dependencies:**  

- Backend:
    ```bash
        cd Server
        npm install
    ```
- Frontend:
    ```bash
        cd UI
        npm install
    ```
3. **Set up environment variables:** 
 
   - Create a `.env` file inside the `Server` folder.  
   - Add the following variables:

    ```bash
        PORT=<Port_no>

        MONGODB_URI=mongodb://localhost:27017/3d_Models
    ```

4. **Run the Application:**  

   - Start backend: 

    ```bash
        cd Server   
        npm run dev
    ``` 
    - Start frontend: 

    ```bash
        cd UI   
        npm run dev
    ``` 

---

## 🧱 Future Improvements

- ✅ Auto-generate thumbnail previews using Three.js snapshots
- ✅ Add authentication (Admin / User)
- 🚀 Enable public sharing of models
- 🚀 Add search and filtering by name or category

---

## 📺 Demo Video Link

This demo video provides an overview of the **3DIFY – 3D Model Web Application** application.

<a href="https://drive.google.com/file/d/135KrrkTOMY0GkY4JckYvtxdth-aCYOdA/view?usp=sharing" target="_blank">▶️ [Watch Demo]</a>  
