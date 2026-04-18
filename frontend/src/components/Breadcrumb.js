export default function Breadcrumb({ path }) {
  return (
    <div className="breadcrumb">
      {path.map((p, i) => (
        <span key={i}> / Folder {i + 1}</span>
      ))}
    </div>
  );
}