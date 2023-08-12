import React from "react";
import "./Sign.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PatternFormat } from "react-number-format";
import { enqueueSnackbar } from "notistack";

const api = "http://localhost:8080";
export const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData.entries());

    const config = {
      method: "post",
      url: `${api}/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(value),
    };

    axios(config)
      .then((res) => {
        const { message, variant } = res.data;
        enqueueSnackbar(message, { variant });
        e.target.reset();
        navigate("/signin");
      })
      .catch((err) => {
        const { message, variant } = err.response.data;
        enqueueSnackbar(message, { variant });
      });
  };

  return (
    <div className="sign">
      <form onSubmit={handleSubmit}>
        <h1>
          <span>ALGORITM CHAT</span>
          <i>Sign Up</i>
        </h1>

        <label>
          <span>Fullname</span>
          <input
            type="text"
            name="fullname"
            placeholder="Abdujabborov Oybek"
            autoComplete="off"
          />
        </label>

        <label>
          <span>Username</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
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
          />
        </label>

        <label>
          <span>Password</span>
          <input type="password" name="password" placeholder="Password" />
        </label>

        <label>
          <input type="submit" value="Sign Up" />
        </label>

        <div>
          <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  );
};
