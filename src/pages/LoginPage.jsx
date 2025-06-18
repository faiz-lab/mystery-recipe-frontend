import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    navigate("/main");
    // 这里可以加上实际的登录逻辑
    setTimeout(() => {
      alert("ログイン成功！");
      setIsLoading(false);
    }, 1500);
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

        <div className="space-y-4">
          <Input
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full h-12 text-base"
          />
          <Input
            placeholder="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full h-12 text-base"
          />
          <Button
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
            className="rounded-full h-12 text-lg font-bold bg-gradient-to-r from-[#FF8855] to-[#FF7043] text-white shadow-lg hover:scale-105 transition w-full"
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
