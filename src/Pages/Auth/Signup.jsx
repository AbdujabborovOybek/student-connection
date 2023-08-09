import React from "react";
import "./Sign.css";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="sign">
      <form>
        <h1>
          <span>ALGORITM CHAT</span>
          <i>Sign Up</i>
        </h1>

        <label>
          <span>Username</span>
          <input type="text" name="username" placeholder="Username" />
        </label>

        <label>
          <span>Telephone Number</span>
          <input type="tel" name="phone" placeholder="Telephone Number" />
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
