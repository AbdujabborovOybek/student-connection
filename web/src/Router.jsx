import { Routes, Route, Link } from "react-router-dom";
import { Auth } from "./Pages/Auth/Auth";
import { Layout } from "./Components/Layout/Layout";

import { Signin } from "./Pages/Auth/Signin";
import { Signup } from "./Pages/Auth/Signup";

import { Chat } from "./Pages/Chat/Chat";
import { Profile } from "./Pages/Profile/Profile";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Auth />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat/:id" element={<Chat />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Home = () => {
  return <div>Home</div>;
};

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};
