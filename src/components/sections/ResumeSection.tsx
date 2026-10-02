import React from "react";
import { ExperienceItem } from "@/types/portfolio";

interface ResumeSectionProps {
  experiences: ExperienceItem[];
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  experiences,
}) => {
  return (
    <section className="resume-area page-section scroll-to-page" id="resume">
      <div className="custom-container">
        <div className="resume-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
            >
              <i className="las la-briefcase"></i> Resume
            </h4>
            <h1
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              Education & <span>Experience</span>
            </h1>
          </div>

          <div className="resume-timeline">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="item scroll-animation"
                data-animation="fade_from_right"
              >
                <span className="date">{exp.period}</span>
                {exp.roles.map((role, idx) => (
                  <React.Fragment key={idx}>
                    <h2>{role.title}</h2>
                    <p>{role.company}</p>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
