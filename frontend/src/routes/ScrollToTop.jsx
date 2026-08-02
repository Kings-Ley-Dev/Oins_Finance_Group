import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll to top on route (pathname) change so each page opens at the top.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}
