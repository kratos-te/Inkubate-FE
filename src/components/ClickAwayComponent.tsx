"use client";
import React, { ReactNode, useEffect, useRef } from "react";

interface ClickAwayProps {
  onClickAway: () => void;
  className?: string;
  children: ReactNode;
}

const ClickAwayComponent: React.FC<ClickAwayProps> = ({
  className = "",
  onClickAway,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Function to handle click events on the document
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the component, so call the onClickAway function
        onClickAway();
      }
    };

    // Add a click event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickAway]);

  return (
    <div ref={containerRef} className={className ? className : ""}>
      {children}
    </div>
  );
};

export default ClickAwayComponent;
