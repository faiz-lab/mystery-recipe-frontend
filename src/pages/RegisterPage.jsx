// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { useSignUp } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const { signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signUp.create({
        emailAddress: email,
        password: password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/main";
      } else {
        console.log(result);
      }
    } catch (err) {
      alert("登録失敗: " + err.errors[0]?.longMessage);
    }
    setIsLoading(false);
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
        <p className="text-center text-gray-500">アカウント新規登録</p>

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
            {isLoading ? "登録中..." : "登録する"}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p>既にアカウントをお持ちですか？</p>
          <a href="/" className="text-[#FF7043] underline hover:text-[#FF8855]">
            ログインはこちら
          </a>
        </div>
      </motion.div>
    </div>
  );
}
