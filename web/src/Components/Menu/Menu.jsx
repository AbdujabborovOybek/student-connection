import React, { memo, useState, useEffect } from "react";
import "./Menu.css";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const Menu = memo(() => {
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios(`${url}/get/user`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase()) ||
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
          const lastActive = new Date(user.lastActive).toLocaleTimeString();

          return (
            <li
              key={user._id}
              onClick={() => getUser(user._id)}
              style={user._id === id ? { background: "#cccccc3a" } : {}}
            >
              <h1>
                <span>{user.fullname}</span>
              </h1>

              <p>
                <span>@{user.username}</span>
                <i>{lastActive}</i>
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
