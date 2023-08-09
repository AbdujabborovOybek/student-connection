import React, { memo } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { Menu } from "../Menu/Menu";

export const Layout = memo(() => {
  return (
    <main className="main">
      <aside>
        <Menu />
      </aside>
      <section>
        <Outlet />
      </section>
    </main>
  );
});
