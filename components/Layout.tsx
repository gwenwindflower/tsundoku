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
      @import url("https://fonts.googleapis.com/css2?family=Fanwood+Text:ital@0;1&display=swap");
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
        font-size: 16px;
        font-family: "Fanwood Text";
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
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
