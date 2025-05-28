import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Luminaglow
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="px-3 py-2 text-gray-700 hover:text-blue-600">
            Register
          </Link>
          <Link to="/cart" className="px-3 py-2 text-gray-700 hover:text-blue-600">
            Cart
          </Link>
          <Link to="/home" className="px-3 py-2 text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </div>
      </div>
    </nav>
  )
}
