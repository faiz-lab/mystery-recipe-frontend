import React, { useState, useRef, useEffect } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const colors = ["#FF7096"];

function hashColor(userId) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export default function Header() {
  const { user } = useUser();
  const initial = user?.firstName?.[0] || user?.username?.[0] || "?";
  const bgColor = hashColor(user?.id || "default");

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // 点击其他地方自动关闭菜单
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <div className="flex justify-between items-center px-6 py-2 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-extrabold text-[#FF8855] drop-shadow-sm">
            🧑‍🍳 Team-E
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <div
              className="cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
          >
            <Avatar className="w-10 h-10 shadow-md">
              <AvatarFallback
                  style={{ backgroundColor: bgColor }}
                  className="text-white text-lg font-bold"
              >
                {initial}
              </AvatarFallback>
            </Avatar>
          </div>

          {showMenu && (
              <div className="absolute right-0 top-12 w-44 bg-white rounded-2xl shadow-lg p-4 z-50 transition-all">
                <div className="text-sm text-gray-500 mb-3">
                  {user?.emailAddress?.[0]?.emailAddress}
                </div>
                <SignOutButton>
                  <button className="w-full py-2 rounded-full font-bold text-white bg-gradient-to-r from-[#FF8855] to-[#FF7043] hover:scale-105 transition">
                    Sign out
                  </button>
                </SignOutButton>
              </div>
          )}
        </div>
      </div>
  );
}
