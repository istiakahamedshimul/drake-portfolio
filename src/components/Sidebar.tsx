import React from "react";
import { PersonalInfo } from "@/types/portfolio";

interface SidebarProps {
  info: PersonalInfo;
}

export const Sidebar: React.FC<SidebarProps> = ({ info }) => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-header d-flex align-items-center justify-content-between">
        <img src={info.logoUrl} alt="Logo" />
        <span className="designation">{info.designation}</span>
      </div>
      <img className="me" src={info.avatarUrl} alt={info.name} />
      <h2 className="email">{info.email}</h2>
      <h2 className="address">{info.address}</h2>
      <p className="copyright">{info.copyright}</p>
      <ul className="social-profile d-flex align-items-center flex-wrap justify-content-center">
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
      <a href="#contact" className="theme-btn">
        <i className="las la-envelope"></i> Hire Me!
      </a>
    </div>
  );
};
