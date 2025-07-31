import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #012A2D, #435355)" }}>
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-[#012A2D] text-white">
        <h1 className="text-2xl font-bold font-serif">SimpleShelf</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
          <Link to="/login" className="hover:text-yellow-300 transition-colors">Login</Link>
          <Link to="/signup" className="hover:text-yellow-300 transition-colors">Sign Up</Link>
          <Link to="/products" className="hover:text-yellow-300 transition-colors">Product Management</Link>
        </div>
      </nav>

      {/* Center Content */}
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Welcome to our <span style={{ color: "yellow" }}>SimpleShelf</span>
        </h2>
      </div>
    </div>
  );
}
