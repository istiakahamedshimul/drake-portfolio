"use client";

import React, { useState, useEffect } from "react";

const colors = [
  { id: "c1", hex: "#28e98c", name: "Emerald Green" },
  { id: "c2", hex: "#e4af12", name: "Amber Gold" },
  { id: "c3", hex: "#fe6f1d", name: "Vibrant Orange" },
  { id: "c4", hex: "#14c5fd", name: "Cyan Blue" },
  { id: "c5", hex: "#c0c0c0", name: "Platinum Silver" },
  { id: "c6", hex: "#1338f3", name: "Electric Indigo" },
  { id: "c7", hex: "#f31313", name: "Crimson Red" },
  { id: "c8", hex: "#ff99cc", name: "Pastel Pink" },
];

const shapes = [
  { id: "s1", name: "Earth Lines Sphere", video: "/assets/images/video1.mp4" },
  { id: "s2", name: "3D Abstract Ball", video: "/assets/images/video2.mp4" },
  { id: "s3", name: "Water Waves", video: "/assets/images/video3.mp4" },
  { id: "s4", name: "Liquids Wavy", video: "/assets/images/video4.mp4" },
  { id: "s5", name: "Simple Strings", video: "/assets/images/video5.mp4" },
  { id: "s6", name: "Solid Color", video: null },
];

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState("#28e98c");
  const [activeShape, setActiveShape] = useState("Earth Lines Sphere");

  const selectColor = (hex: string) => {
    setActiveColor(hex);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--primary_color", hex);
    }
  };

  const selectShape = (shape: (typeof shapes)[0]) => {
    setActiveShape(shape.name);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("drake:change_bg_video", { detail: shape.video })
      );
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--primary_color",
        activeColor
      );
    }
  }, [activeColor]);

  return (
    <div className={`global-color ${isOpen ? "active" : ""}`}>
      <span
        className="setting-toggle"
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Theme settings"
      >
        <i className="las la-cog"></i>
      </span>

      <div className="inner">
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
        <div className="global-color-option">
          <span
            className="close-settings"
            onClick={() => setIsOpen(false)}
            role="button"
            aria-label="Close settings"
          >
            <i className="las la-times"></i>
          </span>
          <h2>Configuration</h2>
          <div className="global-color-option-inner">
            <p>Colors</p>
            <div className="color-boxed">
              {colors.map((c) => (
                <a
                  key={c.id}
                  href="#"
                  className={activeColor === c.hex ? "clr-active" : ""}
                  style={{ backgroundColor: c.hex }}
                  onClick={(e) => {
                    e.preventDefault();
                    selectColor(c.hex);
                  }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>

            <p style={{ marginTop: "30px" }}>THREE DIMENSIONAL SHAPES</p>
            <ul className="themes">
              {shapes.map((s) => (
                <li key={s.id}>
                  <a
                    href="#"
                    style={{
                      color: activeShape === s.name ? "var(--primary_color)" : "#fff",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      selectShape(s);
                    }}
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
