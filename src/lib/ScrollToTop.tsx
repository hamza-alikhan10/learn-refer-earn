// ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Prevent browser from restoring scroll on back/forward
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // If there's a hash (anchor), try to scroll to that element
    if (hash) {
      // small delay to let the DOM render the target element
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // fallback: jump to top if element not found
    }

    // Default: scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}