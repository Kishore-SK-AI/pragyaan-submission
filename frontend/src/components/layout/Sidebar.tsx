import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  ArrowRightOnRectangleIcon,
  BeakerIcon,
  QueueListIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
    
  const links = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: HomeIcon,
      roles: ["Admin", "Doctor", "Nurse", "Pharmacist", "Receptionist"],
    },
    {
      name: "Patient Custom",
      to: "/dashboard/custom",
      icon: ClipboardDocumentCheckIcon,
      roles: ["Doctor", "Nurse"],
    },
    {
      name: "Triage Analysis",
      to: "/patient-analysis",
      icon: BeakerIcon,
      roles: ["Doctor", "Nurse", "Receptionist"],
    },
    {
      name: "EMR Upload",
      to: "/dashboard/emr-upload",
      icon: DocumentArrowUpIcon,
      roles: ["Nurse"],
    },
    {
      name: "Priority Queue",
      to: "/dashboard/queue",
      icon: QueueListIcon,
      roles: ["Doctor", "Nurse", "Receptionist"],
    },
    {
      name: "Inventory",
      to: "/dashboard/inventory",
      icon: ClipboardDocumentCheckIcon,
      roles: ["Pharmacist", "Admin"],
    },

  ];

  const filteredLinks = links.filter(
    (link) => user && link.roles.includes(user.role),
  );

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">V</span>
        </div>
        <span className="font-bold text-slate-800 text-lg">VitalIQ</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )
            }
          >
            <link.icon className="h-5 w-5" />
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : ""}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};
