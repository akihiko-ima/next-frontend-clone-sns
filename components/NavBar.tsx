"use client";
import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";

import { useAuth } from "@/context/auth";
import useToast from "@/hooks/useToast";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { toastSucces } = useToast();

  const handleLogout = () => {
    toastSucces("ログアウトしました。");
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center h-12">
        <h1 className="font-extrabold text-3xl tracking-tight text-white drop-shadow-lg">
          <Link href="/" className="ml-4">
            Clone-SNS
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 md:space-x-6 items-center">
            {user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-2 bg-amber-200 text-gray-900 py-2 px-4 rounded-lg font-medium shadow hover:scale-105 hover:bg-amber-400 transition-transform duration-200"
                >
                  <AiOutlineUser size={20} />
                  Profile
                </Link>
                <button
                  className="flex items-center gap-2 bg-amber-200 text-gray-900 py-2 px-4 rounded-lg font-medium shadow hover:scale-105 hover:bg-amber-400 transition-transform duration-200"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-amber-200 text-gray-900 py-2 px-4 rounded-lg font-medium shadow hover:scale-105 hover:bg-amber-400 transition-transform duration-200"
                >
                  <AiOutlineLogin size={20} />
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 bg-amber-200 text-gray-900 py-2 px-4 rounded-lg font-medium shadow hover:scale-105 hover:bg-amber-400 transition-transform duration-200"
                >
                  <AiOutlineUserAdd size={20} />
                  Sign up
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
