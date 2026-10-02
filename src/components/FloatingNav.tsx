"use client";

import React, { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "las la-home" },
  { id: "about", label: "About", icon: "lar la-user" },
  { id: "resume", label: "Resume", icon: "las la-briefcase" },
  { id: "services", label: "Services", icon: "las la-stream" },
  { id: "skills", label: "Skills", icon: "las la-shapes" },
  { id: "portfolio", label: "Portfolios", icon: "las la-grip-vertical" },
  { id: "testimonial", label: "Testimonial", icon: "lar la-comment" },
  { id: "contact", label: "Contact", icon: "las la-envelope" },
];

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ul className="menu scroll-nav">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <li key={item.id}>
            <a
              className={`scroll-to ${isActive ? "active" : ""}`}
              href={`#${item.id}`}
              onClick={(e) => scrollTo(item.id, e)}
            >
              <span>{item.label}</span>
              <i className={item.icon}></i>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
