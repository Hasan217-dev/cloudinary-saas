"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/sign-in" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Top Navbar */}
      <header className="w-full bg-base-200 border-b border-base-300 sticky top-0 z-50 shadow-sm">
        <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1">
            <Link href="/" onClick={handleLogoClick}>
              <div className="btn btn-ghost normal-case text-xl font-bold tracking-tight cursor-pointer gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Cloudinary Showcase
              </div>
            </Link>
          </div>
          <div className="flex-none flex items-center gap-3">
            {user && (
              <>
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                    <img
                      src={user.imageUrl}
                      alt={user.username || user.emailAddresses[0].emailAddress}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium truncate max-w-[160px] hidden sm:block text-base-content/80">
                  {user.username || user.emailAddresses[0].emailAddress}
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost btn-circle btn-sm"
                  title="Sign out"
                >
                  <LogOutIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}