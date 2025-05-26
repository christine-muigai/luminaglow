import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          LuminaGlow
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:bg-purple-600 px-3 py-2 rounded transition-colors">
            Products
          </Link>
          <Link to="/admin" className="hover:bg-purple-600 px-3 py-2 rounded transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}