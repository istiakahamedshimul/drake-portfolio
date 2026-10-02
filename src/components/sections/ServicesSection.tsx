import React from "react";
import { ServiceItem } from "@/types/portfolio";

interface ServicesSectionProps {
  services: ServiceItem[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
}) => {
  return (
    <section className="services-area page-section scroll-to-page" id="services">
      <div className="custom-container">
        <div className="services-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
            >
              <i className="las la-stream"></i> Services
            </h4>
            <h1
              className="scroll-animation"
              data-animation="fade_from_bottom"
            >
              My <span>Specializations</span>
            </h1>
          </div>

          <div className="services-items">
            {services.map((item) => (
              <div
                key={item.id}
                className="service-item scroll-animation"
                data-animation="fade_from_bottom"
              >
                <i className={item.icon}></i>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className="projects">{item.projectCount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
