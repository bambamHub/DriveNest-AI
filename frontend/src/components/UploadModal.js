import { useDropzone } from "react-dropzone";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function UploadModal({ folderId, refresh }) {

  const onDrop = async (acceptedFiles) => {
    if (!folderId) {
      return toast.error("Select a folder first ❗");
    }

    try {
      const formData = new FormData();
      formData.append("image", acceptedFiles[0]);
      formData.append("folder", folderId);

      await API.post("/files/upload", formData); 

      toast.success("File uploaded ✅");
      refresh();

    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Upload failed ❌");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: !folderId,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""} ${!folderId ? "disabled" : ""}`}
    >
      <input {...getInputProps()} />

      {folderId ? (
        <p>📤 Drag & Drop or Click to Upload</p>
      ) : (
        <p>⚠️ Select a folder first</p>
      )}
    </div>
  );
}