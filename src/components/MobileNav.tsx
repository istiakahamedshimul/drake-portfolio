"use client";

import React, { useState } from "react";
import { PersonalInfo } from "@/types/portfolio";

interface MobileNavProps {
  info: PersonalInfo;
}

const navItems = [
  { id: "home", label: "Home", icon: "las la-home" },
  { id: "about", label: "About", icon: "lar la-user" },
  { id: "resume", label: "Resume", icon: "las la-briefcase" },
  { id: "services", label: "Services", icon: "las la-stream" },
  { id: "skills", label: "Skills", icon: "las la-shapes" },
  { id: "portfolio", label: "Portfolios", icon: "las la-grip-vertical" },
  { id: "testimonial", label: "Testimonial", icon: "lar la-comment" },
  { id: "contact", label: "Contact", icon: "las la-envelope" },
];

export const MobileNav: React.FC<MobileNavProps> = ({ info }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <span
        className="icon-menu"
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle navigation menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
      </span>

      <div className={`responsive-sidebar-menu ${isOpen ? "active" : ""}`}>
        <div className="overlay" onClick={closeMenu}></div>
        <div className="sidebar-menu-inner">
          <div className="menu-wrap">
            <p>Menu</p>
            <ul className="menu scroll-nav-responsive d-flex">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    className="scroll-to"
                    href={`#${item.id}`}
                    onClick={(e) => scrollTo(item.id, e)}
                  >
                    <i className={item.icon}></i> <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-social">
            <p>Social</p>
            <ul className="social-profile d-flex align-items-center flex-wrap">
              {info.socials.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                  >
                    <i className={social.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
