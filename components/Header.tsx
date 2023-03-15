import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <Link href="/add_book">
        <a className="bold" data-active={isActive("/add_book")}>
          Add Book
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
          font-family: "Source Code Pro";
          border: 1px solid black;
          padding: 1rem;
        }

        a:hover {
          background-color: gray;
          color: white;
        }

        .left a[data-active="true"] {
          background-color: lightgray;
          color: black;
        }

        .left a[data-active="true"]:hover {
          background-color: gray;
          color: white;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem 4rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
