import React from "react";
import "./Sign.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PatternFormat } from "react-number-format";
import { enqueueSnackbar } from "notistack";
import { acAuth } from "../../Context/auth";
import { useDispatch } from "react-redux";

const api = "http://localhost:8080";
export const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData.entries());

    const config = {
      method: "post",
      url: `${api}/signin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(value),
    };

    axios(config)
      .then((res) => {
        const { message, variant } = res.data;
        enqueueSnackbar(message, { variant });
        dispatch(acAuth(res.data.user));
        localStorage.setItem("token", res.data.token);
        e.target.reset();
        navigate("/");
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
          <i>Sign In</i>
        </h1>
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
          <input type="submit" value="Sign In" />
        </label>

        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};
