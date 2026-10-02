import React from "react";
import { PersonalInfo } from "@/types/portfolio";

interface AboutSectionProps {
  info: PersonalInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ info }) => {
  return (
    <section className="about-area page-section scroll-to-page" id="about">
      <div className="custom-container">
        <div className="about-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
            >
              <i className="lar la-user"></i> About
            </h4>
            <h1
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              Every great design begin with
              <br />
              an even <span>better story</span>
            </h1>
          </div>
          <p
            className="scroll-animation"
            data-animation="fade_from_bottom"
          >
            {info.aboutStory}
          </p>
        </div>
      </div>
    </section>
  );
};
