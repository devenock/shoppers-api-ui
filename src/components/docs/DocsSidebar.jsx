import { Link } from "react-router-dom";

export default function DocsSidebar() {
  const links = [
    { path: "/docs/express", label: "Express.js" },
    { path: "/docs/nestjs", label: "NestJS" },
    { path: "/docs/golang", label: "Golang" },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-[#023047] text-white">
      {/*  sidebar items */}
      <nav className="flex-1 flex flex-col space-y-4 p-2">
        <ul>
          {links.map((link) => (
            <li key={link.path} className="mb-2">
              <Link
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
