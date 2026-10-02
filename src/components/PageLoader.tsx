"use client";

import React, { useEffect, useState } from "react";

export const PageLoader: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    const hideTimer = setTimeout(() => {
      setHidden(true);
    }, 1100);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`page-loader ${loaded ? "loaded" : ""}`}>
      <div className="bounceball"></div>
    </div>
  );
};
