import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/search", label: "Search" },
    { path: "/history", label: "History" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-zinc-900 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-950 dark:text-white">
          GitReFind
        </Link>

        <nav className="flex space-x-6 text-gray-500 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-gray-200 transition-colors duration-200 ${
                location.pathname === link.path ? "text- dark:text-white" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
