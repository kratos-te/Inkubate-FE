"use client";
import { useState, useEffect } from "react";

export default function useScroll() {
  // Initialize state with undefined scrollY/innerHeight so server and client renders match

  const [scroll, setScroll] = useState({ top: 0, height: 0 });

  useEffect(() => {
    // Handler to call on window scroll
    function handleScroll() {
      // Set window scrollY/innerHeight to state
      setScroll({
        top: window.scrollY,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("scroll", handleScroll);
    // Call handler right away so state gets updated with initial window size
    handleScroll();
    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array ensures that effect is only run on mount

  return scroll;
}
