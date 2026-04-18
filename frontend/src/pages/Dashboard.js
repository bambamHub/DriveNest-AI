import { useEffect, useState } from "react";
import API from "../api/axios";
import "../App.css";

import { toast } from "react-toastify";
import {
  FaHome,
  FaFolder,
  FaClock,
  FaStar,
  FaTrash,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import Breadcrumb from "../components/Breadcrumb";
import FileGrid from "../components/FileGrid";
import UploadModal from "../components/UploadModal";

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [path, setPath] = useState([]);
  const [preview, setPreview] = useState(null);

  // 📁 Fetch folders
  const fetchFolders = async (parent = null) => {
    try {
      const res = await API.get(`/folders?parent=${parent || ""}`);
      setFolders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 📄 Fetch files
  const fetchFiles = async (folderId) => {
    try {
      const res = await API.get(`/files/${folderId}`);
      setFiles(res.data || []);
      setCurrentFolder(folderId);
    } catch (err) {
      console.error(err);
      setFiles([]);
    }
  };

  // ➕ Create folder
  const createFolder = async () => {
    if (!name) return toast.error("Enter folder name");

    try {
      await API.post("/folders", {
        name,
        parent: currentFolder,
      });

      toast.success("Folder created 📁");
      setName("");
      fetchFolders(currentFolder);
    } catch {
      toast.error("Failed to create folder ❌");
    }
  };

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.success("Logged out 👋");
    window.location.href = "/";
  };

  // 🔥 Initial load
  useEffect(() => {
    const init = async () => {
      try {
        const res = await API.get("/folders");
        setFolders(res.data);

        if (res.data.length > 0) {
          fetchFiles(res.data[0]._id);
        }
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          toast.error("Session expired, login again 🔐");

          localStorage.removeItem("token");
          sessionStorage.removeItem("token");

          window.location.href = "/";
        } else {
          toast.error("Something went wrong ❌");
        }
      }
    };

    init();
  }, []);

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">📁 DriveNest</div>

        <div className="menu-item">
          <FaHome /> Home
        </div>
        <div className="menu-item active">
          <FaFolder /> My Drive
        </div>
        <div className="menu-item">
          <FaClock /> Recent
        </div>
        <div className="menu-item">
          <FaStar /> Starred
        </div>
        <div className="menu-item">
          <FaTrash /> Trash
        </div>
      </div>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <input className="search" placeholder="Search files..." />

          <div className="user-section">
            <FaUserCircle size={22} />
            <FaSignOutAlt onClick={handleLogout} />
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* Breadcrumb */}
          <Breadcrumb path={path} />

          {/* Actions */}
          <div className="actions">
            <input
              placeholder="New folder"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button onClick={createFolder}>+ Folder</button>
          </div>

          {/* Upload */}
          <UploadModal
            folderId={currentFolder}
            refresh={() => fetchFiles(currentFolder)}
          />

          {/* Folders */}
          <div className="section">
            <h3>📁 Folders</h3>

            <div className="folder-row">
              {folders.map((f) => (
                <div
                  key={f._id}
                  className="folder-card"
                  onClick={() => fetchFiles(f._id)}
                >
                  <FaFolder />
                  <p>{f.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Files */}
          <div className="section">
            <h3>📄 Files</h3>

            <FileGrid files={files} onPreview={setPreview} />
          </div>
        </div>
      </div>

      {/* 🔥 FINAL PREVIEW MODAL */}
      {preview && (
        <div className="preview-modal">
          <div className="preview-header">
            <button onClick={() => setPreview(null)}>⬅ Back</button>

            <button onClick={() => window.open(preview.url, "_blank")}>
              Open Full
            </button>
          </div>

          <div className="preview-body">
            {/* ✅ PDF FIX */}
            {preview.type === "pdf" && (
              <iframe
                src={preview.url}
                width="100%"
                height="100%"
                title="pdf"
              />
            )}

            {/* IMAGE */}
            {preview.type === "image" && (
              <img src={preview.url} alt="preview" />
            )}

            {/* VIDEO */}
            {preview.type === "video" && (
              <video controls width="100%" height="100%">
                <source src={preview.url} />
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
