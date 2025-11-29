"use client";
import Link from "next/link";

import { useAuth } from "@/context/auth";
import useToast from "@/hooks/useToast";
import { Button } from "./ui/button";
import { User, LogOut, Home, LogIn, UserPlus } from "lucide-react";

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const { toastSucces } = useToast();

  const handleLogout = () => {
    toastSucces("ログアウトしました。");
    logout();
  };

  return (
    <nav className="bg-white/70 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <p className="text-xl font-bold text-blue-700 tracking-wide hover:opacity-80 transition">
          IMA-SNS
        </p>
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-lg hover:bg-blue-100/60 hover:text-blue-700 transition-all"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">ホーム</span>
                </Button>
              </Link>

              <Link href={`/profile/${currentUser.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-lg hover:bg-blue-100/60 hover:text-blue-700 transition-all"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    @{currentUser.username}
                  </span>
                </Button>
              </Link>

              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="gap-2 text-red-600 hover:bg-red-100"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">ログアウト</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  size="sm"
                  className="gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all mr-3"
                >
                  <LogIn className="h-4 w-4" />
                  ログイン
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-lg text-blue-700 border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <UserPlus className="h-4 w-4" />
                  新規登録
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
