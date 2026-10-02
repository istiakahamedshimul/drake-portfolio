import React from "react";
import { PersonalInfo, FactStat } from "@/types/portfolio";

interface HeroSectionProps {
  info: PersonalInfo;
  stats: FactStat[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ info, stats }) => {
  return (
    <section className="hero-section page-section scroll-to-page" id="home">
      <div className="custom-container">
        <div className="hero-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
            >
              <i className="las la-home"></i> Introduce
            </h4>
            <h1
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              Say Hi from <span>{info.name},</span> {info.heroRole}
            </h1>
          </div>
          <p
            className="scroll-animation"
            data-animation="fade_from_bottom"
          >
            {info.heroBio}
          </p>

          <a
            href="#portfolio"
            className="go-to-project-btn scroll-to scroll-animation"
            data-animation="rotate_up"
          >
            <img src="/assets/images/round-text.png" alt="Rounded Text" />
            <i className="las la-arrow-down"></i>
          </a>

          <div className="facts d-flex">
            {stats[0] && (
              <div
                className="left scroll-animation"
                data-animation="fade_from_left"
              >
                <h1>{stats[0].number}</h1>
                <p>
                  Years of <br />
                  Experience
                </p>
              </div>
            )}
            {stats[1] && (
              <div
                className="right scroll-animation"
                data-animation="fade_from_right"
              >
                <h1>{stats[1].number}</h1>
                <p>
                  projects completed on <br />
                  15 countries
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
