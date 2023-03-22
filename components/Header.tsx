import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProfileLink = () => {
  const { data: session, status } = useSession();
  const userEmail = session.user.email;
  const { data, error } = useSWR(`/api/user/${userEmail}`, fetcher);
  if (data) {
    return (
      <Link legacyBehavior href={`/user/${data.id}`}>
        <a>
          {data.name} [{data.email}]
        </a>
      </Link>
    );
  } else {
    return (
      <Link legacyBehavior href={`/`}>
        <a>Loading... [Loading...]</a>
      </Link>
    );
  }
};

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/" legacyBehavior>
        <a className="bold" data-active={isActive("/")}>
          Books
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          display: inline-block;
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

  if (!session) {
    right = (
      <div className="right">
        <Link legacyBehavior href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    right = (
      <div className="right">
        <ProfileLink />
        <Link legacyBehavior href="/add_book">
          <button>
            <a>Add new book</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

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
