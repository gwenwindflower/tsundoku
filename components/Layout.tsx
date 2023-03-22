import { GetServerSideProps } from "next";
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Fanwood+Text:ital@0;1&family=Source+Code+Pro:wght@200&display=swap");

      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        font-family: "Source Code Pro";
        background: honeydew;
      }

      input,
      textarea,
      select {
        font-size: 1rem;
        padding: 1rem;
      }

      a {
        color: black;
      }

      button {
        padding: 1rem;
        font-family: inherit;
        background: lavenderblush;
        border: 1px solid black;
        cursor: pointer;
        box-shadow: 1px 1px black;
        transition: 0.1s;
      }

      button:hover {
        box-shadow: 0.25rem 0.25rem black;
        transform: translate(-0.25rem, -0.25rem);
        transition: 0.1s;
      }

      button:active {
        box-shadow: 1px 1px black;
        transform: translate(0rem, 0rem);
        transition: 0.1s;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 4rem;
      }
    `}</style>
  </div>
);

export default Layout;
