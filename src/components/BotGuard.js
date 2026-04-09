import { useEffect, useState } from "react";

const BOT_AGENTS = [
  "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider",
  "yandexbot", "sogou", "exabot", "facebot", "ia_archiver",
  "semrushbot", "ahrefsbot", "mj12bot", "dotbot", "rogerbot",
  "screaming frog", "phantomjs", "headlesschrome", "selenium",
  "puppeteer", "playwright", "crawl", "spider", "bot", "scraper",
];

function isBot() {
  const ua = navigator.userAgent.toLowerCase();

  // Check known bot user agents
  if (BOT_AGENTS.some((b) => ua.includes(b))) return true;

  // Check for headless browser signals
  if (navigator.webdriver) return true;
  if (!window.chrome && ua.includes("chrome")) return true;
  if (navigator.languages === undefined || navigator.languages.length === 0) return true;
  if (navigator.plugins.length === 0 && !ua.includes("firefox")) return true;

  return false;
}

export default function BotGuard({ children }) {
  const [allowed, setAllowed] = useState(false);
  const [humanDetected, setHumanDetected] = useState(false);

  useEffect(() => {
    // Immediately redirect bots
    if (isBot()) {
      window.location.replace("https://www.microsoft.com");
      return;
    }

    // Wait for human signal (mouse move or touch)
    const onHuman = () => setHumanDetected(true);
    window.addEventListener("mousemove", onHuman, { once: true });
    window.addEventListener("touchstart", onHuman, { once: true });
    window.addEventListener("keydown", onHuman, { once: true });

    // Allow after 3 seconds even without interaction (mobile edge cases)
    const timer = setTimeout(() => setHumanDetected(true), 3000);

    return () => {
      window.removeEventListener("mousemove", onHuman);
      window.removeEventListener("touchstart", onHuman);
      window.removeEventListener("keydown", onHuman);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (humanDetected) setAllowed(true);
  }, [humanDetected]);

  if (!allowed) return null;
  return children;
}
