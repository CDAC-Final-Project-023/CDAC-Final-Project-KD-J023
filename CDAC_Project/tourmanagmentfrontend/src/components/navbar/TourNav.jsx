import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "@mantine/core";

const nav_links = [
  { path: "/tours/home", display: "Explore Sri Lanka" },
  { path: "/sunandbeach", display: "Sun and Beach" },
  { path: "/hikingandtrekking", display: "Hiking and Trekking" },
  { path: "/wildsafari", display: "Wild Safari" },
  { path: "/cultural", display: "Cultural" },
  { path: "/special", display: "Special Tours" },
  { path: "/festival", display: "Festivals" },
];

const TourNav = () => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-xl font-bold text-blue-600">Tour Navigator</div>

     
      <div className="hidden md:flex space-x-6">
        {nav_links.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="text-gray-600 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition duration-300"
          >
            {item.display}
          </Link>
        ))}
      </div>

    
      <div className="md:hidden">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <button className="text-gray-600 focus:outline-none">
            <button className="md:hidden">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path
      fillRule="evenodd"
      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
</button>

            </button>
          </Menu.Target>

          <Menu.Dropdown>
            {nav_links.map((item, index) => (
              <Menu.Item key={index}>
                <Link to={item.path} className="text-gray-700">
                  {item.display}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  );
};

export default TourNav;
