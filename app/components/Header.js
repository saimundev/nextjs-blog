"use client";

import React, { useEffect } from "react";
import Container from "./Container";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data } = useSession();
  const router = useRouter();
  const logOut = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className="bg-indigo-500">
      <Container>
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">BLOG</div>
          <div className="flex gap-4">
            <Link
              href="/"
              className="text-white px-2 py-4 inline-block font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="/createBlog"
              className="text-white px-2 py-4 inline-block font-medium text-sm"
            >
              Create Blog
            </Link>
            {data?.user && (
              <Link
                href="/deshbord"
                className="text-white px-2 py-4 inline-block font-medium text-sm"
              >
                Deshbord
              </Link>
            )}
            {data?.user ? (
              <button
                onClick={logOut}
                className="text-white px-2 py-4 inline-block font-medium text-sm"
              >
                LogOut
              </button>
            ) : (
              <Link
                href="/login"
                className="text-white px-2 py-4 inline-block font-medium text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
