// components/Sidebar.js
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { folders } = useSelector((state) => state.folder);

  return (
    <div className="sidebar">
      <h3>Folders</h3>
      {folders.map(f => (
        <div key={f._id}>📁 {f.name}</div>
      ))}
    </div>
  );
}