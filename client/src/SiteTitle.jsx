// client/src/SiteTitle.jsx
import { Link } from "react-router-dom";

export default function SiteTitle() {
  return (
    <Link to="/login" className="mb-6 no-underline">
      <h1
        className="text-5xl font-bold tracking-wide text-center"
        style={{
          fontFamily: "Times New Roman, serif",
          background: "linear-gradient(90deg, #012A2D, #435355)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        SimpleShelf
      </h1>
    </Link>
  );
}
