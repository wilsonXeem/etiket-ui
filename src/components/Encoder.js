import React, { useState, useEffect } from "react";

const s = {
  page: { minHeight: "100vh", backgroundColor: "#ffffff", display: "flex", justifyContent: "center", padding: "3rem 1rem", fontFamily: "'Courier New', monospace" },
  card: { backgroundColor: "#ffffff", border: "1px solid #00000022", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "2.5rem", width: "100%", maxWidth: "580px", height: "fit-content" },
  header: { borderBottom: "1px solid #00000022", paddingBottom: "1rem", marginBottom: "2rem" },
  title: { margin: 0, fontSize: "20px", color: "#000000", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" },
  subtitle: { margin: "6px 0 0 0", fontSize: "12px", color: "#00000055", letterSpacing: "1px" },
  label: { display: "block", fontSize: "11px", fontWeight: "700", color: "#00000077", marginBottom: "6px", letterSpacing: "1.5px", textTransform: "uppercase" },
  input: { width: "100%", padding: "10px 14px", border: "1px solid #00000022", backgroundColor: "#f5f5f5", color: "#000000", fontSize: "13px", marginBottom: "1.5rem", outline: "none", boxSizing: "border-box", fontFamily: "'Courier New', monospace", caretColor: "#000000" },
  textarea: { width: "100%", padding: "10px 14px", border: "1px solid #00000022", backgroundColor: "#f5f5f5", color: "#000000", fontSize: "13px", height: "90px", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "'Courier New', monospace", caretColor: "#000000" },
  btn: { width: "100%", padding: "11px", backgroundColor: "#000000", color: "#ffffff", border: "1px solid #000000", fontSize: "13px", fontWeight: "700", cursor: "pointer", marginTop: "0.5rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Courier New', monospace" },
  resultsBox: { marginTop: "2rem", borderTop: "1px solid #00000022", paddingTop: "1.5rem" },
  resultsTitle: { fontSize: "11px", fontWeight: "700", color: "#00000055", marginBottom: "1rem", letterSpacing: "2px", textTransform: "uppercase" },
  row: { backgroundColor: "#f5f5f5", border: "1px solid #00000011", padding: "12px 14px", marginBottom: "8px" },
  rowEmail: { fontSize: "12px", fontWeight: "700", color: "#000000", marginBottom: "8px", letterSpacing: "0.5px" },
  rowLink: { display: "flex", gap: "8px", alignItems: "center" },
  linkInput: { flex: 1, padding: "8px 10px", border: "1px solid #00000022", backgroundColor: "#ffffff", color: "#00000077", fontSize: "11px", fontFamily: "'Courier New', monospace", outline: "none" },
  copyBtn: { padding: "8px 14px", backgroundColor: "#000000", color: "#ffffff", border: "1px solid #000000", cursor: "pointer", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap", fontFamily: "'Courier New', monospace", letterSpacing: "1px" },
};

function Encoder() {
  const [emails, setEmails] = useState("");
  const [baseUrl, setBaseUrl] = useState(window.location.origin);
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [copied, setCopied] = useState(null);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  const handleEncode = () => {
    const emailList = emails.split(",").map((e) => e.trim()).filter((e) => e);
    setGeneratedLinks(emailList.map((email) => ({ email, link: `${baseUrl}/${btoa(email)}` })));
  };

  const handleCopy = (link, index) => {
    navigator.clipboard.writeText(link);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.header}>
          <h2 style={s.title}><span>{"// LINK_GENERATOR "}</span><span style={{ opacity: blink ? 1 : 0, color: "#000000" }}>█</span></h2>
          <p style={s.subtitle}>&gt; encode targets and generate phishing links</p>
        </div>

        <label style={s.label}>&gt; base_url</label>
        <input style={s.input} type="url" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://yoursite.com" />

        <label style={s.label}>&gt; target_emails [ comma separated ]</label>
        <textarea style={s.textarea} value={emails} onChange={(e) => setEmails(e.target.value)} placeholder="victim@example.com, another@example.com" />

        <button style={s.btn} onClick={handleEncode}>&gt; execute</button>

        {generatedLinks.length > 0 && (
          <div style={s.resultsBox}>
            <p style={s.resultsTitle}>&gt; {generatedLinks.length} link{generatedLinks.length > 1 ? "s" : ""} generated</p>
            {generatedLinks.map((item, i) => (
              <div key={i} style={s.row}>
                <div style={s.rowEmail}>[{i}] {item.email}</div>
                <div style={s.rowLink}>
                  <input style={s.linkInput} type="text" value={item.link} readOnly />
                  <button style={s.copyBtn} onClick={() => handleCopy(item.link, i)}>
                    {copied === i ? "[OK]" : "[COPY]"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Encoder;
