import Link from "next/link";
import React from "react";

import { useAuth } from "@/context/auth";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-teal-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center h-9">
        <h1 className="font-semibold text-3xl">
          <Link href="/" className="ml-4">
            Clone-SNS
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="bg-amber-200 text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-amber-500"
                >
                  Profile
                </Link>
                <button
                  className="bg-amber-200 text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-amber-500"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-amber-200 text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-amber-500"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-amber-200 text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-amber-500"
                >
                  Sign up
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
