import React from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar";

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

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      {/* 左侧LOGO */}
      <div className="flex items-center gap-3">
        <div className="text-3xl font-extrabold text-[#FF8855] drop-shadow-sm">
          🍳 Team-E
        </div>
      </div>

      {/* 右侧头像 + 下拉 */}
      <div className="flex items-center">
        <div className="relative group cursor-pointer">
          {/* 头像 */}
          <Avatar className="w-11 h-11 shadow-md">
            <AvatarFallback
              style={{ backgroundColor: bgColor }}
              className="text-white text-lg font-bold"
            >
              {initial}
            </AvatarFallback>
          </Avatar>
          {/* 简易 hover 菜单 */}
          <div className="absolute right-0 top-14 w-40 bg-white shadow-lg rounded-xl p-3 hidden group-hover:block transition">
            <div className="text-sm font-semibold text-gray-600 mb-2">
              {user?.emailAddress?.[0]?.emailAddress}
            </div>
            <SignOutButton>
              <button className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-[#FF8855] to-[#FF7043] hover:scale-105 transition">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
