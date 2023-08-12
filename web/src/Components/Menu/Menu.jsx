import React, { memo, useState } from "react";
import "./Menu.css";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Menu = memo(() => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );

  const getUser = (id) => {
    navigate(`/chat/${id}`);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="menu">
      <form>
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <ol className="users_list">
        {filteredUsers?.map((user) => {
          return (
            <li
              key={user._id}
              onClick={() => getUser(user._id)}
              style={user._id === id ? { background: "#cccccc3a" } : {}}
            >
              <h1>
                <span>{user.name}</span>
              </h1>

              <p>
                <span>@{user.username}</span>
                <i>{user.lastActivete}</i>
              </p>
            </li>
          );
        })}
      </ol>

      <div className="menu_action">
        <button>
          <CgProfile />
        </button>

        <button onClick={logout}>
          <TbLogout />
        </button>
      </div>
    </div>
  );
});

const users = [
  {
    _id: "3wedsvg456bgf",
    name: "Oybek Abdujabborov",
    username: "oybek",
    phone: "+998 99 999 99 99",
    lastActivete: "09:12",
  },

  {
    _id: "3wedsvg456bgf5",
    name: "Maxliyo Karimova",
    username: "maxliyo_k",
    phone: "+998 99 999 99 99",
    lastActivete: "08:12",
  },
  {
    _id: "3wedsvg456bgf6",
    name: "Kurganov Shoxjaxon",
    username: "shox",
    phone: "+998 99 999 99 99",
    lastActivete: "07:12",
  },
  {
    _id: "3wedsvg456bgf7",
    name: "Otabek Muhammadov",
    username: "otabek",
    phone: "+998 99 999 99 99",
    lastActivete: "06:12",
  },
  {
    _id: "3wedsvg456bgf8",
    name: "Anasxon Turg'unpolatov",
    username: "anasxon",
    phone: "+998 99 999 99 99",
    lastActivete: "05:12",
  },
  {
    _id: "3wedsvg456bgf9",
    name: "Xurshidbek Axmedov",
    username: "xurshidbek",
    phone: "+998 99 999 99 99",
    lastActivete: "04:12",
  },
  {
    _id: "3wedsvg456bgf10",
    name: "Nodirbek Maxmudov",
    username: "nodirbek",
    phone: "+998 99 999 99 99",
    lastActivete: "03:12",
  },
  {
    _id: "3wedsvg456bgf11",
    name: "Abubakir Raxmatullayev",
    username: "abubakir",
    phone: "+998 99 999 99 99",
    lastActivete: "02:12",
  },
  {
    _id: "3wedsvg456bgf12",
    name: "Zakariyyo Narzullayev",
    username: "zakariyyo",
    phone: "+998 99 999 99 99",
    lastActivete: "01:12",
  },
];
