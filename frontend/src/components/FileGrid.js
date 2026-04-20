export default function FileGrid({ files, onPreview }) {
  return (
    <div className="file-grid">
      {files.map((file) => (
        <div key={file._id} className="file-card">
          <img
            src={file.path}
            alt=""
            onClick={() => onPreview(file.path)}
          />
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  );
}
