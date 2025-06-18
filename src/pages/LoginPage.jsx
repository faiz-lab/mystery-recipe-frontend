// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { useSignIn } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"; // Google图标
import { SiLine } from "react-icons/si"; // LINE图标

export default function LoginPage() {
  const { signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/main";
      } else {
        console.log(result);
      }
    } catch (err) {
      alert("ログイン失敗: " + err.errors[0]?.longMessage);
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/main",
    });
  };

  const handleLineLogin = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_line",
      redirectUrl: "/main",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#FAFAFA] to-[#F7F7F7] px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-12 shadow-[0_4px_12px_rgba(0,0,0,0.08)] w-full max-w-md space-y-8"
      >
        <h1 className="text-4xl font-extrabold text-[#FF8855] text-center">
          ミステリーレシピ 🍳
        </h1>
        <p className="text-center text-gray-500">ログインして始めましょう</p>

        {/* 美化版社交登录区 */}
        <div className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 rounded-full h-12 text-lg bg-gradient-to-r from-[#FFE2CC] to-[#FFDACC] text-[#FF7043] shadow-md hover:scale-105 transition w-full"
          >
            <FcGoogle size={24} /> Googleでログイン
          </Button>

          <Button
            onClick={handleLineLogin}
            className="flex items-center justify-center gap-3 rounded-full h-12 text-lg bg-gradient-to-r from-[#E0FFD9] to-[#C8F5C1] text-[#06C755] shadow-md hover:scale-105 transition w-full"
          >
            <SiLine size={22} /> LINEでログイン
          </Button>
        </div>

        {/* 保持你原有邮箱密码区 */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <Input
            placeholder="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full h-12 text-base"
            required
          />
          <Input
            placeholder="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full h-12 text-base"
            required
          />
          <Button
            type="submit"
            disabled={isLoading || !email || !password}
            className="rounded-full h-12 text-lg font-bold bg-gradient-to-r from-[#FF8855] to-[#FF7043] text-white shadow-lg hover:scale-105 transition w-full"
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
