import React from "react";
import { SkillItem } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: SkillItem[];
}

const animationPatterns = [
  "fade_from_left",
  "fade_from_bottom",
  "fade_from_top",
  "fade_from_right",
  "fade_from_left",
  "fade_from_bottom",
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section className="skills-area page-section scroll-to-page" id="skills">
      <div className="custom-container">
        <div className="skills-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
            >
              <i className="las la-shapes"></i> my skills
            </h4>
            <h1
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              My <span>Advantages</span>
            </h1>
          </div>

          <div className="row skills text-center">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="col-md-3 scroll-animation"
                data-animation={
                  animationPatterns[index % animationPatterns.length]
                }
              >
                <div className="skill">
                  <div
                    className="skill-inner"
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      style={{
                        margin: "0 auto 25px auto",
                        display: "block",
                        maxHeight: "48px",
                        width: "auto",
                      }}
                    />
                    <h1
                      className="percent"
                      style={{
                        textAlign: "center",
                        width: "100%",
                        margin: "0 auto",
                        display: "block",
                      }}
                    >
                      {skill.percent}%
                    </h1>
                  </div>
                  <p
                    className="name"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      margin: "0 auto",
                      display: "block",
                    }}
                  >
                    {skill.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
