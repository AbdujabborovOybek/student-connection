import React from "react";
import "./Profile.css";
import { PatternFormat } from "react-number-format";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const url = process.env.REACT_APP_BASE_URL;
export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  const deleteAccount = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirm) return;

    const option = {
      method: "DELETE",
      url: `${url}/delete/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(option)
      .then((res) => {
        const { message, variant } = res.data;
        enqueueSnackbar(message, { variant });
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => {
        const { message, variant } = err.response.data;
        enqueueSnackbar(message, { variant });
      });
  };
  return (
    <div className="profile">
      <form onSubmit={handleSubmit}>
        <h1>
          <span>Your Profile</span>
        </h1>

        <label>
          <span>Fullname</span>
          <input
            type="text"
            name="fullname"
            autoComplete="off"
            defaultValue={user?.fullname}
          />
        </label>

        <label>
          <span>Username</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            defaultValue={user?.username}
          />
        </label>

        <label>
          <span>Telephone Number</span>
          <PatternFormat
            name="phone"
            format="+998 ## ### ####"
            allowEmptyFormatting
            mask="_"
            autoComplete="off"
            defaultValue={user?.phone}
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="string"
            name="password"
            placeholder="Password"
            autoComplete="off"
          />
        </label>

        <label>
          <input type="submit" value="Update" />
        </label>
      </form>

      <button className="btn_deleteAccount" onClick={deleteAccount}>
        delete account
      </button>
    </div>
  );
};
