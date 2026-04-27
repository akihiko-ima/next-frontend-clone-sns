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
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/">
          <p className="text-xl font-bold text-primary tracking-wide hover:opacity-80 transition">
            IMA-SNS
          </p>
        </Link>
        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">ホーム</span>
                </Button>
              </Link>

              <Link href={`/profile/${currentUser.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
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
                className="gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
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
                  className="gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  ログイン
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-lg text-primary border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
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
