import { Routes, Route } from "react-router-dom";
import { Auth } from "./Pages/Auth/Auth";
import { Layout } from "./Components/Layout/Layout";

import { Signin } from "./Pages/Auth/Signin";
import { Signup } from "./Pages/Auth/Signup";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Auth />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
};

const Home = () => {
  return <div>Home</div>;
};

const Profile = () => {
  return <div>Profile</div>;
};

const Chat = () => {
  return <div>Chat</div>;
};
