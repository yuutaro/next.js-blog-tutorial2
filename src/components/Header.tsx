import React, { useState } from "react";
import ThemeChanger from "./ThemeChanger";
import { useRouter } from "next/router";
import Link from "next/link";

type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps): React.ReactElement {
  const router = useRouter();
  const moveToHome = () => {
    router.push("/");
  }

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300 fixed z-40">
            <div className="flex-none">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <Link href="/"><div>Waxwork_ymのブログ</div></Link>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li><a>Navbar Item 1</a></li>
                <li><a>Navbar Item 2</a></li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          {children}
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <ThemeChanger />
            <li><Link href="/blogs"><div>Blogs</div></Link></li>
            <li><Link href="#"><div>About</div></Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}