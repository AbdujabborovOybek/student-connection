import React from "react";
import "./Sign.css";
import { Link } from "react-router-dom";

export const Signin = () => {
  return (
    <div className="sign">
      <form>
        <h1>
          <span>ALGORITM CHAT</span>
          <i>Sign In</i>
        </h1>
        <label>
          <span>Telephone Number</span>
          <input type="tel" placeholder="Telephone Number" />
        </label>

        <label>
          <span>Password</span>
          <input type="password" placeholder="Password" />
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
