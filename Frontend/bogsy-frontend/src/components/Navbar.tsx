import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 p-4 px-10 z-50 flex justify-between items-center">
      <h1 className="text-2xl text-yellow-400 font-bold">Bogsy Video Store</h1>
      <nav className=" text-white flex gap-4 gap-x-10">
        <Link
          to="/customers"
          className={`hover:underline ${
            location.pathname === "/customers"
              ? "border-b-2 border-yellow-400"
              : ""
          }`}
        >
          Customers
        </Link>
        <Link
          to="/videos"
          className={`hover:underline ${
            location.pathname === "/videos"
              ? "border-b-2 border-yellow-400"
              : ""
          }`}
        >
          Videos
        </Link>
        <Link
          to="/rentals"
          className={`hover:underline ${
            location.pathname === "/rentals"
              ? "border-b-2 border-yellow-400"
              : ""
          }`}
        >
          Rentals
        </Link>
        <Link
          to="/returned"
          className={`hover:underline ${
            location.pathname === "/returned"
              ? "border-b-2 border-yellow-400"
              : ""
          }`}
        >
          History
        </Link>
        <Link
          to="/reports"
          className={`hover:underline ${
            location.pathname === "/reports"
              ? "border-b-2 border-yellow-400"
              : ""
          }`}
        >
          Reports
        </Link>
      </nav>
    </header>
  );
}
