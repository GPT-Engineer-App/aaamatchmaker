import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:h-16">
          <div className="flex-shrink-0 mb-2 sm:mb-0">
            <span className="text-xl font-bold text-gray-800 font-quicksand">AI Automation Collaboration</span>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/" currentPath={location.pathname}>
              Meetings
            </NavLink>
            <NavLink to="/matches" currentPath={location.pathname}>
              Matches
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, currentPath, children }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
