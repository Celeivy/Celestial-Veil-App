import { Outlet, NavLink } from "react-router";
import { Home, Wrench, Compass, Sparkles, BookOpen, User } from "lucide-react";
import { Starfield } from "./Starfield";

export function Layout() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/tools", icon: Wrench, label: "Tools" },
    { to: "/journeys", icon: Compass, label: "Journeys" },
    { to: "/oracle", icon: Sparkles, label: "Oracle" },
    { to: "/library", icon: BookOpen, label: "Library" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* Starfield background */}
      <Starfield />
      
      {/* Main content area with bottom padding for nav */}
      <main className="flex-1 overflow-y-auto pb-20 relative z-10">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#3C2245]/90 backdrop-blur-lg border-t border-[#B9A7FF]/20 z-20">
        <div className="flex justify-around items-center h-20 max-w-2xl mx-auto px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? "text-[#F5D38E]"
                    : "text-[#E8DFF5]/60 hover:text-[#E8DFF5]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    className={`w-6 h-6 transition-all ${
                      isActive ? "drop-shadow-[0_0_8px_rgba(245,211,142,0.5)]" : ""
                    }`} 
                  />
                  <span className="text-[10px]">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}